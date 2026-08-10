#!/usr/bin/env node

import { readFile, readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const TEXT_EXTENSIONS = new Set(['.css', '.html', '.json', '.rss', '.txt', '.xml']);
const args = process.argv.slice(2);
const option = (flag, fallback) => {
  const index = args.indexOf(flag);
  return index === -1 ? fallback : args[index + 1] ?? fallback;
};

const rootDir = process.cwd();
const distDir = path.resolve(rootDir, option('--dist-dir', 'dist'));
const manifestPath = path.resolve(rootDir, option('--manifest', 'public/media/manifest.json'));
const dryRun = args.includes('--dry-run');
const toPosix = (value) => value.split(path.sep).join('/');

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return walk(entryPath);
      return [entryPath];
    })
  );
  return nested.flat();
};

const occurrenceCount = (text, needle) => {
  let count = 0;
  let start = 0;
  while (true) {
    const index = text.indexOf(needle, start);
    if (index === -1) return count;
    count += 1;
    start = index + needle.length;
  }
};

const main = async () => {
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  if (!manifest.entries || typeof manifest.entries !== 'object') {
    throw new Error(`Invalid derivative manifest: ${manifestPath}`);
  }

  const allFiles = await walk(distDir);
  const scanFiles = allFiles.filter((file) => {
    const extension = path.extname(file).toLowerCase();
    const relative = toPosix(path.relative(distDir, file));
    return TEXT_EXTENSIONS.has(extension) && relative !== 'media/manifest.json';
  });
  const references = new Map();

  for (const file of scanFiles) {
    const contents = await readFile(file, 'utf8');
    for (const sourcePath of Object.keys(manifest.entries)) {
      const withoutLeadingSlash = sourcePath.slice(1);
      const referencesInFile = occurrenceCount(contents, sourcePath) + occurrenceCount(contents, withoutLeadingSlash);
      if (referencesInFile > 0) {
        const ref = toPosix(path.relative(distDir, file));
        const values = references.get(sourcePath) ?? [];
        values.push({ file: ref, count: referencesInFile });
        references.set(sourcePath, values);
      }
    }
  }

  if (references.size > 0) {
    const details = [...references.entries()]
      .map(([source, locations]) => `${source}: ${locations.map((location) => `${location.file} (${location.count})`).join(', ')}`)
      .join('\n');
    throw new Error(`Raw upload references remain in distributable text files. Refusing to prune originals.\n${details}`);
  }

  const missingDerivatives = [];
  for (const entry of Object.values(manifest.entries)) {
    const variants = [
      entry.social,
      ...Object.values(entry.variants ?? {}).flatMap((group) =>
        Object.values(group).flatMap((width) => [width.avif, width.webp])
      ),
    ];
    for (const variant of variants) {
      if (!variant?.path || !(await stat(path.join(distDir, 'media', variant.path)).catch(() => null))) {
        missingDerivatives.push(variant?.path ?? '(missing manifest path)');
      }
    }
  }
  if (missingDerivatives.length > 0) {
    throw new Error(`Derivative assets are missing from dist. Refusing to prune originals.\n${missingDerivatives.join('\n')}`);
  }

  const deleted = [];
  const missing = [];
  for (const sourcePath of Object.keys(manifest.entries)) {
    const distOriginal = path.join(distDir, sourcePath.slice(1));
    try {
      await stat(distOriginal);
    } catch {
      missing.push(sourcePath);
      continue;
    }

    if (!dryRun) await rm(distOriginal);
    deleted.push(sourcePath);
  }

  if (missing.length > 0) {
    throw new Error(`Manifest originals are missing from dist. Refusing to report a successful prune.\n${missing.join('\n')}`);
  }

  process.stdout.write(`${JSON.stringify({ dryRun, deleted, missing, scannedFiles: scanFiles.length })}\n`);
};

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error}\n`);
  process.exitCode = 1;
});
