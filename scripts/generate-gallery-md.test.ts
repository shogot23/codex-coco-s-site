import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { createGallerySlug } from './lib/slug.ts';
import { GALLERY_GENERATE_MANAGED_BY, generateGalleryMarkdown } from './generate-gallery-md.ts';

function writeManifest(rootDir: string, entries: object[]): string {
  const manifestPath = path.join(rootDir, 'data', 'gallery-manifest.json');
  mkdirSync(path.dirname(manifestPath), { recursive: true });
  writeFileSync(manifestPath, JSON.stringify(entries, null, 2));
  return manifestPath;
}

function writeGalleryFile(rootDir: string, fileName: string, content: string): string {
  const galleryDir = path.join(rootDir, 'src', 'content', 'gallery');
  mkdirSync(galleryDir, { recursive: true });
  const fullPath = path.join(galleryDir, fileName);
  writeFileSync(fullPath, content);
  return fullPath;
}

function createTempRoot(): string {
  return mkdtempSync(path.join(os.tmpdir(), 'gallery-generate-test-'));
}

test('preserves unmanaged orphan markdown files', () => {
  const rootDir = createTempRoot();

  try {
    const manifestPath = writeManifest(rootDir, []);
    const galleryPath = writeGalleryFile(
      rootDir,
      'manual-entry.md',
      `---
title: "Manual Entry"
image: "/uploads/gallery/books/manual.png"
genre: "ノンフィクション"
source_file: "gallery/books/manual.png"
published: true
---
`
    );

    generateGalleryMarkdown({
      manifestPath,
      galleryDir: path.dirname(galleryPath),
      cwd: rootDir,
    });

    const content = readFileSync(galleryPath, 'utf8');
    assert.match(content, /title: "Manual Entry"/);
  } finally {
    rmSync(rootDir, { recursive: true, force: true });
  }
});

test('deletes orphan markdown files managed by gallery:generate', () => {
  const rootDir = createTempRoot();

  try {
    const manifestPath = writeManifest(rootDir, []);
    const galleryPath = writeGalleryFile(
      rootDir,
      'generated-entry.md',
      `---
title: "Generated Entry"
image: "/uploads/gallery/books/generated.png"
genre: "ノンフィクション"
source_file: "gallery/books/generated.png"
published: false
managed_by: "${GALLERY_GENERATE_MANAGED_BY}"
---
`
    );

    generateGalleryMarkdown({
      manifestPath,
      galleryDir: path.dirname(galleryPath),
      cwd: rootDir,
    });

    assert.equal(existsSync(galleryPath), false);
  } finally {
    rmSync(rootDir, { recursive: true, force: true });
  }
});

test('writes managed_by marker for generated entries', () => {
  const rootDir = createTempRoot();

  try {
    const manifestPath = writeManifest(rootDir, [
      {
        title: 'Managed Entry',
        image: '/uploads/gallery/books/managed.png',
        genre: 'ノンフィクション',
        author: 'Author',
        needs_review: false,
        generated_at: '2026-04-21T00:00:00.000Z',
        source_file: 'gallery/books/managed.png',
      },
    ]);
    const galleryDir = path.join(rootDir, 'src', 'content', 'gallery');

    generateGalleryMarkdown({
      manifestPath,
      galleryDir,
      cwd: rootDir,
    });

    const generatedPath = path.join(galleryDir, `${createGallerySlug('gallery/books/managed.png', 'ノンフィクション')}.md`);
    const content = readFileSync(generatedPath, 'utf8');
    assert.match(content, new RegExp(`managed_by: "${GALLERY_GENERATE_MANAGED_BY}"`));
  } finally {
    rmSync(rootDir, { recursive: true, force: true });
  }
});
