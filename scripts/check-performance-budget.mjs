#!/usr/bin/env node

import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const args = process.argv.slice(2);
const option = (flag, fallback) => {
  const index = args.indexOf(flag);
  return index === -1 ? fallback : args[index + 1] ?? fallback;
};

const rootDir = process.cwd();
const distDir = path.resolve(rootDir, option('--dist-dir', 'dist'));
const basePath = option('--base', '/codex-coco-s-site/').replace(/\/$/, '');
const basePathWithoutLeadingSlash = basePath.replace(/^\//, '');
const limits = {
  gallery: { htmlBytes: 70_000, imageCount: 15, imageBytes: 700_000 },
  reviews: { htmlBytes: 90_000, imageCount: 12, imageBytes: 600_000 },
};

const parsePage = async (route) => {
  const htmlPath = path.join(distDir, route, 'index.html');
  const html = await readFile(htmlPath, 'utf8');
  const documentMarkup = html.replace(/<script\b[\s\S]*?<\/script>/giu, '');
  const imageSources = [...documentMarkup.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/giu)].map((match) => match[1]);
  return { htmlPath, html, imageSources };
};

const localAssetBytes = async (source) => {
  if (/^(?:https?:)?\/\//iu.test(source) || source.startsWith('data:')) return 0;
  const normalized = source
    .replace(/^\/+/, '')
    .replace(new RegExp(`^${basePathWithoutLeadingSlash.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')}/?`, 'u'), '');
  try {
    return (await stat(path.join(distDir, normalized))).size;
  } catch {
    return 0;
  }
};

const main = async () => {
  const failures = [];
  const report = {};

  for (const [route, limit] of Object.entries(limits)) {
    const page = await parsePage(route);
    const htmlBytes = Buffer.byteLength(page.html);
    const imageCount = page.imageSources.length;
    const imageBytes = (await Promise.all(page.imageSources.map(localAssetBytes))).reduce((sum, bytes) => sum + bytes, 0);
    report[route] = { htmlBytes, imageCount, imageBytes };

    if (htmlBytes > limit.htmlBytes) failures.push(`${route}: HTML ${htmlBytes} exceeds ${limit.htmlBytes}`);
    if (imageCount > limit.imageCount) failures.push(`${route}: ${imageCount} images exceeds ${limit.imageCount}`);
    if (imageBytes > limit.imageBytes) failures.push(`${route}: image bytes ${imageBytes} exceeds ${limit.imageBytes}`);
  }

  if (failures.length > 0) throw new Error(`Performance budget failures\n${failures.join('\n')}`);
  process.stdout.write(`${JSON.stringify(report)}\n`);
};

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error}\n`);
  process.exitCode = 1;
});
