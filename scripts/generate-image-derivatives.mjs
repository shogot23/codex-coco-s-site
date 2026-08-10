#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const RASTER_EXTENSIONS = new Set(['.avif', '.jpeg', '.jpg', '.png', '.webp']);

const VARIANT_GROUPS = {
  card: [320, 640],
  detail: [768, 1200],
  hero: [960, 1440],
};

const args = process.argv.slice(2);
const valueAfter = (flag, fallback) => {
  const index = args.indexOf(flag);
  return index === -1 ? fallback : args[index + 1] ?? fallback;
};

const rootDir = process.cwd();
const sourceDir = path.resolve(rootDir, valueAfter('--source-dir', 'public/uploads'));
const outputDir = path.resolve(rootDir, valueAfter('--out-dir', 'public/media'));
const manifestPath = path.resolve(rootDir, valueAfter('--manifest', path.join(outputDir, 'manifest.json')));
const limit = Number.parseInt(valueAfter('--limit', '0'), 10) || 0;
const concurrency = Math.max(1, Number.parseInt(valueAfter('--concurrency', '3'), 10) || 3);

const toPosix = (value) => value.split(path.sep).join('/');

const collectFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return collectFiles(entryPath);
      if (entry.isFile() && RASTER_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) return [entryPath];
      return [];
    })
  );

  return files.flat().sort((left, right) => left.localeCompare(right));
};

const ensureDerivative = async (inputPath, outputPath, width, format) => {
  const existing = await stat(outputPath).catch(() => null);
  if (existing) {
    const metadata = await sharp(outputPath).metadata();
    return { path: toPosix(path.relative(path.dirname(manifestPath), outputPath)), width: metadata.width ?? width, height: metadata.height };
  }

  const transformer = sharp(inputPath, { animated: false })
    .rotate()
    .resize({ width, withoutEnlargement: true, fit: 'inside' });

  if (format === 'avif') {
    await transformer.avif({ quality: 58, effort: 5 }).toFile(outputPath);
  } else {
    await transformer.webp({ quality: 78, effort: 5 }).toFile(outputPath);
  }

  const metadata = await sharp(outputPath).metadata();
  return { path: toPosix(path.relative(path.dirname(manifestPath), outputPath)), width: metadata.width ?? width, height: metadata.height };
};

const ensureSocialImage = async (inputPath, outputPath) => {
  const existing = await stat(outputPath).catch(() => null);
  if (existing) {
    return { path: toPosix(path.relative(path.dirname(manifestPath), outputPath)), width: 1200, height: 630 };
  }

  await sharp(inputPath, { animated: false })
    .rotate()
    .resize({ width: 1200, height: 630, fit: 'contain', background: '#f6f2eb', withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(outputPath);

  return { path: toPosix(path.relative(path.dirname(manifestPath), outputPath)), width: 1200, height: 630 };
};

const mapWithConcurrency = async (items, worker) => {
  const results = new Array(items.length);
  let nextIndex = 0;
  const runWorker = async () => {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await worker(items[index]);
    }
  };

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, runWorker));
  return results;
};

const main = async () => {
  const sourceFiles = await collectFiles(sourceDir);
  const selectedFiles = limit > 0 ? sourceFiles.slice(0, limit) : sourceFiles;
  await mkdir(outputDir, { recursive: true });

  const processedEntries = await mapWithConcurrency(selectedFiles, async (sourcePath) => {
    const sourceBuffer = await readFile(sourcePath);
    const hash = createHash('sha256').update(sourceBuffer).digest('hex').slice(0, 16);
    const sourceRelativeToPublic = toPosix(path.relative(path.resolve(rootDir, 'public'), sourcePath));
    const derivativeDir = path.join(outputDir, hash);
    const metadata = await sharp(sourcePath).metadata();

    await mkdir(derivativeDir, { recursive: true });

    const variants = {};
    for (const [role, widths] of Object.entries(VARIANT_GROUPS)) {
      variants[role] = {};
      for (const width of widths) {
        const avifPath = path.join(derivativeDir, `${role}-${width}.avif`);
        const webpPath = path.join(derivativeDir, `${role}-${width}.webp`);
        variants[role][width] = {
          avif: await ensureDerivative(sourcePath, avifPath, width, 'avif'),
          webp: await ensureDerivative(sourcePath, webpPath, width, 'webp'),
        };
      }
    }

    const socialPath = path.join(derivativeDir, 'social-1200x630.jpg');
    return [`/${sourceRelativeToPublic}`, {
      hash,
      width: metadata.width,
      height: metadata.height,
      variants,
      social: await ensureSocialImage(sourcePath, socialPath),
    }];
  });
  const entries = Object.fromEntries(processedEntries);

  const manifest = {
    version: 1,
    sourceDirectory: '/uploads',
    entries,
  };

  await mkdir(path.dirname(manifestPath), { recursive: true });
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  const totalBytes = await Promise.all(
    Object.values(entries).flatMap((entry) => [
      entry.social,
      ...Object.values(entry.variants).flatMap((variant) => Object.values(variant).flatMap(Object.values)),
    ]).map(async (variant) => (await stat(path.resolve(path.dirname(manifestPath), variant.path))).size)
  );

  process.stdout.write(
    `${JSON.stringify({ sourceFiles: selectedFiles.length, concurrency, generatedBytes: totalBytes.reduce((sum, size) => sum + size, 0), manifest: toPosix(path.relative(rootDir, manifestPath)) })}\n`
  );
};

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error}\n`);
  process.exitCode = 1;
});
