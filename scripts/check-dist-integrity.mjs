#!/usr/bin/env node

import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { load as parseYaml } from 'js-yaml';

const args = process.argv.slice(2);
const option = (flag, fallback) => {
  const index = args.indexOf(flag);
  return index === -1 ? fallback : args[index + 1] ?? fallback;
};

const rootDir = process.cwd();
const distDir = path.resolve(rootDir, option('--dist-dir', 'dist'));
const cmsConfigPath = path.resolve(rootDir, option('--cms-config', 'cms/decap/config.yml'));
const requireCms = args.includes('--require-cms');
const toPosix = (value) => value.split(path.sep).join('/');

const exists = async (candidate) => {
  try {
    await stat(candidate);
    return true;
  } catch {
    return false;
  }
};

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  }));
  return nested.flat();
};

const jsonLdNodes = (value) => {
  if (!value || typeof value !== 'object') return [];
  if (Array.isArray(value)) return value.flatMap(jsonLdNodes);
  const record = value;
  const graph = Array.isArray(record['@graph']) ? record['@graph'] : [record];
  return graph.flatMap((node) => [node, ...jsonLdNodes(node.itemReviewed)]);
};

const hasSchemaType = (nodes, type) =>
  nodes.some((node) => node && typeof node === 'object' && node['@type'] === type);

const hasRetiredInternalVideoPath = (html) =>
  [...html.matchAll(/\b(?:href|src|poster)=["']([^"']+)["']/giu)].some(([, value]) => {
    if (/^(?:[a-z][a-z\d+.-]*:)?\/\//iu.test(value)) return false;
    return /(?:^|\/)videos\//u.test(value);
  });

const checkCmsConfig = async (failures) => {
  if (!(await exists(cmsConfigPath))) {
    if (requireCms) failures.push(`CMS config is required but missing: ${toPosix(path.relative(rootDir, cmsConfigPath))}`);
    return;
  }

  let config;
  try {
    config = parseYaml(await readFile(cmsConfigPath, 'utf8'));
  } catch (error) {
    failures.push(`Invalid CMS YAML: ${error.message}`);
    return;
  }

  if (!config || typeof config !== 'object') {
    failures.push('CMS YAML must decode to an object.');
    return;
  }
  if (!config.backend || typeof config.backend !== 'object') failures.push('CMS YAML requires a backend object.');
  if (typeof config.media_folder !== 'string' || !config.media_folder) failures.push('CMS YAML requires media_folder.');
  if (typeof config.public_folder !== 'string' || !config.public_folder.startsWith('/')) {
    failures.push('CMS YAML requires an absolute public_folder.');
  }
  if (!Array.isArray(config.collections) || config.collections.length === 0) {
    failures.push('CMS YAML requires at least one collection.');
    return;
  }
  if (config.collections.some((collection) => collection?.name === 'videos')) {
    failures.push('CMS config must not restore the retired videos collection.');
  }

  const reviewsCollection = config.collections.find((collection) => collection?.name === 'reviews');
  const reviewFieldNames = new Set(
    Array.isArray(reviewsCollection?.fields)
      ? reviewsCollection.fields.map((field) => field?.name).filter(Boolean)
      : []
  );
  const requiredEditorialFields = [
    'editorialStatus',
    'excerpt',
    'excerptKind',
    'excerptSource',
    'readerWorry',
    'bookQuestion',
    'perspectiveShift',
    'smallStep',
    'cocoNote',
    'lingeringQuestion',
    'readingCompass',
    'purchaseLinks',
  ];
  for (const fieldName of requiredEditorialFields) {
    if (!reviewFieldNames.has(fieldName)) {
      failures.push(`CMS reviews collection is missing editorial field: ${fieldName}`);
    }
  }
};

const main = async () => {
  const failures = [];
  const requiredAssets = ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png'];
  for (const asset of requiredAssets) {
    if (!(await exists(path.join(distDir, asset)))) failures.push(`Missing public icon: ${asset}`);
  }
  if (await exists(path.join(distDir, 'admin'))) {
    failures.push('dist/admin must not be deployed while the CMS authentication backend is unavailable on GitHub Pages.');
  }
  if (await exists(path.join(distDir, 'videos'))) {
    failures.push('dist/videos must not be generated after the videos feature is retired.');
  }

  const distFiles = await walk(distDir);
  const htmlFiles = distFiles.filter((file) => {
    const relative = toPosix(path.relative(distDir, file));
    return path.extname(file) === '.html' && !relative.startsWith('admin/');
  });
  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    const relative = toPosix(path.relative(distDir, file));
    if (hasRetiredInternalVideoPath(html)) failures.push(`${relative}: retired /videos/ reference found.`);
    const requiredMeta = ['og:image', 'og:image:alt', 'og:image:width', 'og:image:height', 'twitter:image:alt'];
    for (const property of requiredMeta) {
      const pattern = new RegExp(`<meta[^>]+(?:property|name)=["']${property}["']`, 'iu');
      if (!pattern.test(html)) failures.push(`${relative}: missing ${property}`);
    }

    const schemaBlocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/giu)];
    const nodes = [];
    for (const block of schemaBlocks) {
      try {
        nodes.push(...jsonLdNodes(JSON.parse(block[1])));
      } catch (error) {
        failures.push(`${relative}: invalid JSON-LD (${error.message})`);
      }
    }

    if (/^reviews\/[^/]+\/index\.html$/u.test(relative)) {
      if (!hasSchemaType(nodes, 'Review')) failures.push(`${relative}: review detail needs Review JSON-LD.`);
      if (!hasSchemaType(nodes, 'Book')) failures.push(`${relative}: review detail needs Book JSON-LD.`);
      if (!hasSchemaType(nodes, 'BreadcrumbList')) failures.push(`${relative}: review detail needs BreadcrumbList JSON-LD.`);
    }
    if (/^gallery\/(?!archive\/)[^/]+\/index\.html$/u.test(relative)) {
      if (!hasSchemaType(nodes, 'CreativeWork')) failures.push(`${relative}: gallery detail needs CreativeWork JSON-LD.`);
      if (!hasSchemaType(nodes, 'BreadcrumbList')) failures.push(`${relative}: gallery detail needs BreadcrumbList JSON-LD.`);
    }
    if (['reviews/index.html', 'gallery/index.html', '3books/index.html'].includes(relative) && !hasSchemaType(nodes, 'CollectionPage')) {
      failures.push(`${relative}: collection page needs CollectionPage JSON-LD.`);
    }
  }

  if (!(await exists(path.join(distDir, 'rss.xml')))) failures.push('Missing RSS output: rss.xml');
  if (!(await exists(path.join(distDir, 'sitemap-index.xml')))) failures.push('Missing sitemap output: sitemap-index.xml');
  const sitemapFiles = distFiles.filter((file) => /^sitemap.*\.xml$/u.test(path.basename(file)));
  for (const file of sitemapFiles) {
    const sitemap = await readFile(file, 'utf8');
    if (/\/videos\//u.test(sitemap)) {
      failures.push(`${toPosix(path.relative(distDir, file))}: retired /videos/ route found.`);
    }
  }
  await checkCmsConfig(failures);

  if (failures.length > 0) throw new Error(`Distribution integrity failures (${failures.length})\n${failures.join('\n')}`);
  process.stdout.write(`${JSON.stringify({ htmlFiles: htmlFiles.length, cmsConfig: toPosix(path.relative(rootDir, cmsConfigPath)) })}\n`);
};

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error}\n`);
  process.exitCode = 1;
});
