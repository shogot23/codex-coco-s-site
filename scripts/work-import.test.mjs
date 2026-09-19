import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import sharp from 'sharp';
import { importWork } from './work-import.mjs';

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'coco-work-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, 'src/content/reviews'), { recursive: true });
  const review = path.join(root, 'src/content/reviews/book.md');
  await writeFile(review, '---\ntitle: "本"\npublished: true\n---\n');
  const folder = path.join(root, 'package');
  await mkdir(folder);
  await sharp({ create: { width: 1080, height: 1350, channels: 3, background: '#faf6ef' } }).png().toFile(path.join(folder, 'image.png'));
  const input = { version: 1, slug: 'sample', title: 'ワーク', description: '説明', readerWorry: '場面', durationMinutes: 3, imageFilename: 'image.png', imageAlt: '画像の説明', relatedReview: 'book', bookTitle: '本', bookConnection: '本との関係', completion: '終了目安', question: '問い', evidenceNote: '研究との違い', safetyNote: '範囲', sources: [{ label: '原典', url: 'https://example.org/paper' }], body: '## 用意するもの\n\nメモ\n\n## 手順\n\n1. 一行書く。', published: true };
  const file = path.join(folder, 'site-work.json');
  const save = () => writeFile(file, JSON.stringify(input));
  await save();
  return { root, review, folder, input, file, save };
}

test('dry run does not write; import forces draft; repeated import preserves bytes', async (t) => {
  const f = await fixture(t);
  const planned = await importWork(f.file, { root: f.root, dryRun: true });
  await assert.rejects(readFile(planned.contentFile), { code: 'ENOENT' });
  const result = await importWork(f.file, { root: f.root });
  const before = await readFile(result.contentFile);
  assert.match(before.toString(), /published: false/);
  assert.deepEqual(await readFile(result.imageFile), await readFile(path.join(f.folder, 'image.png')));
  await assert.rejects(importWork(f.file, { root: f.root }), /Already exists/);
  assert.deepEqual(await readFile(result.contentFile), before);
});

for (const [name, edit, pattern] of [
  ['missing required field', (f) => { delete f.input.question; }, /Missing question/],
  ['title mismatch', (f) => { f.input.bookTitle = '別の本'; }, /Book title mismatch/],
  ['invalid slug', (f) => { f.input.slug = '../outside'; }, /Invalid version or slug/],
  ['missing book', (f) => { f.input.relatedReview = 'missing'; }, /ENOENT/],
  ['path traversal', (f) => { f.input.imageFilename = '../image.png'; }, /Invalid imageFilename/],
  ['missing image', (f) => { f.input.imageFilename = 'missing.png'; }, /ENOENT/],
  ['unsafe URL', (f) => { f.input.sources[0].url = 'javascript:alert(1)'; }, /Invalid sources/],
  ['missing steps', (f) => { f.input.body = '本文だけ'; }, /Missing preparation or steps/],
]) test(name, async (t) => {
  const f = await fixture(t); edit(f); await f.save();
  await assert.rejects(importWork(f.file, { root: f.root }), pattern);
});

test('unpublished review is rejected', async (t) => {
  const f = await fixture(t);
  await writeFile(f.review, '---\ntitle: "本"\npublished: false\n---\n');
  await assert.rejects(importWork(f.file, { root: f.root }), /unpublished/);
});

test('symlink outside package is rejected', async (t) => {
  const f = await fixture(t);
  await symlink(path.join(f.root, 'src/content/reviews/book.md'), path.join(f.folder, 'external.png'));
  f.input.imageFilename = 'external.png'; await f.save();
  await assert.rejects(importWork(f.file, { root: f.root }), /escapes/);
});

test('same book can receive several different works', async (t) => {
  const f = await fixture(t); await importWork(f.file, { root: f.root });
  f.input.slug = 'another'; await f.save();
  await importWork(f.file, { root: f.root });
});

test('image-only collision preserves existing file and creates no article', async (t) => {
  const f = await fixture(t);
  const directory = path.join(f.root, 'src/assets/works'); await mkdir(directory, { recursive: true });
  const existing = path.join(directory, 'sample.png'); await writeFile(existing, 'keep');
  await assert.rejects(importWork(f.file, { root: f.root }), /Already exists/);
  assert.equal(await readFile(existing, 'utf8'), 'keep');
  await assert.rejects(readFile(path.join(f.root, 'src/content/works/sample.md')), { code: 'ENOENT' });
});
