#!/usr/bin/env node

import { readFile, readdir, stat } from 'node:fs/promises';
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
const siteOrigin = option('--site', 'https://shogot23.github.io');
const toPosix = (value) => value.split(path.sep).join('/');

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  }));
  return nested.flat();
};

const exists = async (candidate) => {
  try {
    return (await stat(candidate)).isFile();
  } catch {
    return false;
  }
};

const extractUrls = (html) => {
  const urls = [];
  const documentMarkup = html.replace(/<script\b[\s\S]*?<\/script>/giu, '');
  const anchorPattern = /<a\b[^>]+\bhref=["']([^"']+)["'][^>]*>/giu;
  for (const match of documentMarkup.matchAll(anchorPattern)) urls.push(match[1]);
  const assetPattern = /<(?:img|source|video|track|iframe)\b[^>]+\b(?:src|poster)=["']([^"']+)["'][^>]*>/giu;
  for (const match of documentMarkup.matchAll(assetPattern)) urls.push(match[1]);
  const discoverabilityLinkPattern = /<link\b[^>]+\brel=["'](?:alternate|sitemap|icon|apple-touch-icon)["'][^>]+\bhref=["']([^"']+)["'][^>]*>/giu;
  for (const match of documentMarkup.matchAll(discoverabilityLinkPattern)) urls.push(match[1]);
  const ogMetaPattern = /<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]+content=["']([^"']+)["'][^>]*>/giu;
  for (const match of documentMarkup.matchAll(ogMetaPattern)) urls.push(match[1]);
  const srcsetPattern = /\bsrcset=["']([^"']+)["']/giu;
  for (const match of documentMarkup.matchAll(srcsetPattern)) {
    for (const candidate of match[1].split(',')) urls.push(candidate.trim().split(/\s+/)[0]);
  }
  return urls;
};

const pageTarget = async (pathname) => {
  const cleanPath = pathname.replace(/^\/+/, '');
  const direct = path.join(distDir, cleanPath);
  if (await exists(direct)) return direct;
  if (await exists(path.join(direct, 'index.html'))) return path.join(direct, 'index.html');
  if (!path.extname(cleanPath) && await exists(`${direct}.html`)) return `${direct}.html`;
  return null;
};

const main = async () => {
  const files = (await walk(distDir)).filter((file) => path.extname(file) === '.html');
  const failures = [];
  let checked = 0;

  for (const file of files) {
    const html = await readFile(file, 'utf8');
    const relativeFile = toPosix(path.relative(distDir, file));
    const ids = new Set([...html.matchAll(/\sid=["']([^"']+)["']/giu)].map((match) => match[1]));

    for (const rawUrl of extractUrls(html)) {
      if (!rawUrl || rawUrl.startsWith('data:') || rawUrl.startsWith('mailto:') || rawUrl.startsWith('tel:') || rawUrl.startsWith('javascript:')) continue;
      let url;
      try {
        url = new URL(rawUrl, `${siteOrigin}${basePath}/${relativeFile}`);
      } catch {
        failures.push(`${relativeFile}: invalid URL ${rawUrl}`);
        continue;
      }

      if (url.origin !== siteOrigin) continue;
      const pathname = decodeURIComponent(url.pathname);
      const internalPath = pathname.startsWith(`${basePath}/`) ? pathname.slice(basePath.length + 1) : pathname.replace(/^\/+/, '');
      const target = await pageTarget(internalPath);
      checked += 1;
      if (!target) {
        failures.push(`${relativeFile}: missing ${rawUrl}`);
        continue;
      }
      if (url.hash && target === file && !ids.has(decodeURIComponent(url.hash.slice(1)))) {
        failures.push(`${relativeFile}: missing anchor ${url.hash}`);
      }
    }
  }

  if (failures.length > 0) throw new Error(`Broken internal links (${failures.length})\n${failures.join('\n')}`);
  process.stdout.write(`${JSON.stringify({ htmlFiles: files.length, checked })}\n`);
};

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error}\n`);
  process.exitCode = 1;
});
