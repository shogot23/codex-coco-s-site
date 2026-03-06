import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { extractGalleryMetadata, terminateOcrWorker, type GalleryManifestEntry } from './lib/ocr.ts';

const TARGET_DIR = path.resolve('public/uploads/gallery/books');
const UPLOADS_DIR = path.resolve('public/uploads');
const MANIFEST_PATH = path.resolve('data/gallery-manifest.json');
const SUPPORTED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

function toPosixPath(value: string): string {
  return value.split(path.sep).join(path.posix.sep);
}

function walkFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return walkFiles(fullPath);
    }

    return [fullPath];
  });
}

async function main(): Promise<void> {
  mkdirSync(TARGET_DIR, { recursive: true });
  mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });

  const files = walkFiles(TARGET_DIR).filter((file) => !path.basename(file).startsWith('.'));
  const imageFiles = files.filter((file) => SUPPORTED_EXTENSIONS.has(path.extname(file).toLowerCase()));
  const skippedFiles = files.filter((file) => !SUPPORTED_EXTENSIONS.has(path.extname(file).toLowerCase()));

  for (const skippedFile of skippedFiles) {
    console.info(`[gallery:ocr] skip unsupported file: ${path.relative(process.cwd(), skippedFile)}`);
  }

  const manifest: GalleryManifestEntry[] = [];

  for (const file of imageFiles) {
    const relativeToUploads = toPosixPath(path.relative(UPLOADS_DIR, file));
    const publicPath = `/uploads/${relativeToUploads}`;
    console.info(`[gallery:ocr] processing ${publicPath}`);
    manifest.push(await extractGalleryMetadata(file, publicPath, relativeToUploads));
  }

  manifest.sort((left, right) => left.image.localeCompare(right.image));
  writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);

  if (imageFiles.length === 0) {
    console.info('[gallery:ocr] no target images found in public/uploads/gallery/books');
  } else {
    console.info(`[gallery:ocr] wrote ${manifest.length} entries to ${path.relative(process.cwd(), MANIFEST_PATH)}`);
  }
}

try {
  await main();
} finally {
  await terminateOcrWorker();
}
