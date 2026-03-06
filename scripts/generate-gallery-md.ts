import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createGallerySlug } from './lib/slug.ts';
import type { GalleryManifestEntry } from './lib/ocr.ts';

const MANIFEST_PATH = path.resolve('data/gallery-manifest.json');
const GALLERY_DIR = path.resolve('src/content/gallery');
const TARGET_IMAGE_PREFIX = '/uploads/gallery/books/';
const TARGET_SOURCE_PREFIX = 'gallery/books/';
const force = process.argv.includes('--force');

function readManifest(): GalleryManifestEntry[] {
  if (!existsSync(MANIFEST_PATH)) {
    throw new Error('data/gallery-manifest.json が見つかりません。先に npm run gallery:ocr を実行してください。');
  }

  const raw = readFileSync(MANIFEST_PATH, 'utf8');
  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    throw new Error('data/gallery-manifest.json の形式が不正です。');
  }

  return parsed as GalleryManifestEntry[];
}

function findExistingSourceFiles(): Map<string, string> {
  const entries = new Map<string, string>();

  for (const fileName of readdirSync(GALLERY_DIR)) {
    if (!fileName.endsWith('.md')) {
      continue;
    }

    const fullPath = path.join(GALLERY_DIR, fileName);
    const content = readFileSync(fullPath, 'utf8');
    const match = content.match(/^source_file:\s*["']?([^"\n']+)["']?/m);

    if (match?.[1]) {
      entries.set(match[1], fullPath);
    }
  }

  return entries;
}

function quote(value: string): string {
  return JSON.stringify(value);
}

function renderMarkdown(entry: GalleryManifestEntry): string {
  const frontmatter = [
    '---',
    `title: ${quote(entry.title)}`,
    `image: ${quote(entry.image)}`,
  ];

  if (entry.genre) {
    frontmatter.push(`genre: ${quote(entry.genre)}`);
  }

  if (entry.author) {
    frontmatter.push(`author: ${quote(entry.author)}`);
  }

  if (entry.needs_review) {
    frontmatter.push('needs_review: true');
  }

  frontmatter.push(`generated_at: ${quote(entry.generated_at)}`);
  frontmatter.push(`source_file: ${quote(entry.source_file)}`);
  frontmatter.push('---', '');

  return `${frontmatter.join('\n')}\n`;
}

function isTargetEntry(entry: GalleryManifestEntry): boolean {
  return entry.image.startsWith(TARGET_IMAGE_PREFIX) && entry.source_file.startsWith(TARGET_SOURCE_PREFIX);
}

function destinationForEntry(entry: GalleryManifestEntry, existingBySourceFile: Map<string, string>): string {
  return existingBySourceFile.get(entry.source_file) ?? path.join(GALLERY_DIR, `${createGallerySlug(entry.source_file, entry.genre)}.md`);
}

function main(): void {
  mkdirSync(GALLERY_DIR, { recursive: true });
  const manifest = readManifest();
  const existingBySourceFile = findExistingSourceFiles();

  for (const entry of manifest) {
    if (!isTargetEntry(entry)) {
      console.warn(`[gallery:generate] skip non-gallery source: ${entry.source_file}`);
      continue;
    }

    const destinationPath = destinationForEntry(entry, existingBySourceFile);
    const exists = existsSync(destinationPath);

    if (exists && !force) {
      console.info(`[gallery:generate] skip existing file: ${path.relative(process.cwd(), destinationPath)}`);
      continue;
    }

    writeFileSync(destinationPath, renderMarkdown(entry));
    existingBySourceFile.set(entry.source_file, destinationPath);
    console.info(`[gallery:generate] ${exists ? 'updated' : 'created'} ${path.relative(process.cwd(), destinationPath)}`);
  }
}

main();
