import assert from 'node:assert/strict';
import { copyFile, mkdtemp, mkdir, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import sharp from 'sharp';
import { importWork } from './work-import.mjs';
import { assertReaderFacingWorkCopy, findReaderFacingVoiceViolations, readerFacingFields } from './works-voice-copy.mjs';

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'coco-work-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, 'src/content/reviews'), { recursive: true });
  await mkdir(path.join(root, 'src/data'), { recursive: true });
  await copyFile(path.join(process.cwd(), 'src/data/work-taxonomy.json'), path.join(root, 'src/data/work-taxonomy.json'));
  const review = path.join(root, 'src/content/reviews/book.md');
  await writeFile(review, '---\ntitle: "本"\npublished: true\n---\n');
  const folder = path.join(root, 'package');
  await mkdir(folder);
  await sharp({ create: { width: 1080, height: 1350, channels: 3, background: '#faf6ef' } }).png().toFile(path.join(folder, 'image.png'));
  const input = { version: 1, slug: 'sample', title: 'ワーク', description: '説明', readerWorry: '場面', moods: ['tired'], concerns: ['rest'], durationMinutes: 3, imageFilename: 'image.png', imageAlt: '画像の説明', relatedReview: 'book', bookTitle: '本', bookConnection: '本との関係', completion: '終了目安', question: '問い', evidenceNote: '研究との違い', safetyNote: '範囲', sources: [{ label: '原典', url: 'https://example.org/paper' }], body: '## 用意するもの\n\nメモ\n\n## 手順\n\n1. 一行書く。', published: true };
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
  assert.match(before.toString(), /moods: \["tired"\]/);
  assert.match(before.toString(), /concerns: \["rest"\]/);
  assert.deepEqual(await readFile(result.imageFile), await readFile(path.join(f.folder, 'image.png')));
  await assert.rejects(importWork(f.file, { root: f.root }), /Already exists/);
  assert.deepEqual(await readFile(result.contentFile), before);
});

for (const [name, edit, pattern] of [
  ['missing required field', (f) => { delete f.input.question; }, /Missing question/],
  ['missing mood classification', (f) => { delete f.input.moods; }, /Invalid moods/],
  ['unknown concern classification', (f) => { f.input.concerns = ['unknown']; }, /Invalid concerns/],
  ['empty classification', (f) => { f.input.moods = []; }, /Invalid moods/],
  ['duplicate classification', (f) => { f.input.moods = ['tired', 'tired']; }, /duplicate values/],
  ['non-array classification', (f) => { f.input.concerns = 'rest'; }, /expected an array/],
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

for (const [name, edit] of [
  ['no book reference', (input) => { delete input.relatedReview; }],
  ['both book references', (input) => { input.relatedGallery = 'book'; }],
]) test(name, async (t) => {
  const f = await fixture(t); edit(f.input); await f.save();
  await assert.rejects(importWork(f.file, { root: f.root }), /exactly one/);
});

for (const [name, header, pattern] of [
  ['published gallery', 'published: true\nnote: "情景"', null],
  ['gallery description only', 'published: true\ndescription: "説明"', null],
  ['gallery default is draft', 'note: "情景"', /unpublished/],
  ['unpublished gallery', 'published: false\nnote: "情景"', /unpublished/],
  ['gallery without detail', 'published: true', /no detail/],
  ['gallery empty detail', 'published: true\nnote: ""\ndescription: ""', /no detail/],
]) test(name, async (t) => {
  const f = await fixture(t);
  await mkdir(path.join(f.root, 'src/content/gallery'), { recursive: true });
  await writeFile(path.join(f.root, 'src/content/gallery/book.md'), `---\ntitle: "本"\n${header}\n---\n`);
  delete f.input.relatedReview; f.input.relatedGallery = 'book'; await f.save();
  if (pattern) await assert.rejects(importWork(f.file, { root: f.root }), pattern);
  else {
    const result = await importWork(f.file, { root: f.root });
    const text = await readFile(result.contentFile, 'utf8');
    assert.match(text, /relatedGallery: "book"/); assert.match(text, /published: false/);
    assert.doesNotMatch(text, /relatedReview:/);
  }
});

test('missing gallery and mismatched gallery title are rejected', async (t) => {
  const f = await fixture(t); delete f.input.relatedReview; f.input.relatedGallery = 'book'; await f.save();
  await assert.rejects(importWork(f.file, { root: f.root }), /ENOENT/);
  await mkdir(path.join(f.root, 'src/content/gallery'), { recursive: true });
  await writeFile(path.join(f.root, 'src/content/gallery/book.md'), '---\ntitle: "別の本"\npublished: true\nnote: "情景"\n---\n');
  await assert.rejects(importWork(f.file, { root: f.root }), /Book title mismatch/);
});

test('gallery reference cannot escape its collection', async (t) => {
  const f = await fixture(t); delete f.input.relatedReview; f.input.relatedGallery = '../reviews/book'; await f.save();
  await assert.rejects(importWork(f.file, { root: f.root }), /Invalid book reference/);
});



test('reader-copy guard checks every explicit field and source label', () => {
  const knownPhrase = '公開レビューから受け取った問い';
  const base = Object.fromEntries(readerFacingFields.map((field) => [field, '読者に向けた文章。']));
  for (const field of readerFacingFields) {
    assert.throws(() => assertReaderFacingWorkCopy({ ...base, [field]: knownPhrase }), new RegExp(field));
  }
  const withSourceLabel = { ...base, sources: [{ label: knownPhrase }] };
  assert.throws(() => assertReaderFacingWorkCopy(withSourceLabel), /sources\[0\]\.label/);
  assert.deepEqual(findReaderFacingVoiceViolations({ bookConnection: 'レビュー筆者の経験を紹介します。' })[0], {
    field: 'bookConnection', phrase: 'レビュー筆者', rule: 'user described as a third-party review author',
  });
});

test('each historical relapse phrase is rejected independently while systematic-review language is allowed', () => {
  const cases = [
    ['bookConnection', '公開レビューから受け取った問い'],
    ['bookConnection', 'レビューにある見方'],
    ['bookConnection', '公開レビューが示す問い'],
    ['body', 'レビュー筆者が書いた言葉'],
    ['bookConnection', '公開レビューを確認しました'],
    ['bookConnection', '原著全文は未読'],
    ['bookConnection', '原著本文は未読'],
    ['sources', '出版社提供目次を確認しました'],
  ];
  for (const [field, phrase] of cases) {
    const copy = { bookConnection: '安全な文章。', body: '安全な本文。', sources: [{ label: '原典' }] };
    if (field === 'sources') copy.sources[0].label = phrase;
    else copy[field] = phrase;
    assert.throws(() => assertReaderFacingWorkCopy(copy), undefined, phrase);
  }
  assert.doesNotThrow(() => assertReaderFacingWorkCopy({
    evidenceNote: '系統的レビューが示す平均値には限界があり、この短縮ワーク自体は未検証です。',
    sources: [{ label: '著者所属機関の原著全文' }],
  }));
});

test('reader-copy guard allows research limits, source labels, work instructions, and adaptation', () => {
  const supportedCopy = {
    title: '3分のひと呼吸',
    description: 'いまの様子に目を向けます。',
    readerWorry: '休むきっかけを見つけにくいとき。',
    imageAlt: '本を読むココちゃん。',
    bookTitle: '読書の本',
    bookConnection: '本を読んで考えた問いを、日常向けの短い手順に翻案しました。',
    completion: '確認できたら、そこで終えてかまいません。',
    question: 'いま選べる一歩は何ですか？',
    evidenceNote: '系統的レビューでは一部の指標に有意差が確認されていません。この短縮版は未検証です。',
    safetyNote: '体調に合わせ、必要なら休んでください。',
    sources: [{ label: '著者所属機関の原著全文', url: 'https://example.org/paper' }],
    body: '## 手順\n\n1. まだ不明な点は不明のままにし、ここで終えてよい。',
  };
  assert.doesNotThrow(() => assertReaderFacingWorkCopy(supportedCopy));
});

test('all 19 current work Markdown files pass the narrow reader-copy guard', async () => {
  const names = (await readdir('src/content/works')).filter((name) => name.endsWith('.md'));
  assert.equal(names.length, 19);
  for (const name of names) {
    const text = await readFile(path.join('src/content/works', name), 'utf8');
    assert.doesNotThrow(() => assertReaderFacingWorkCopy(text, name), name);
  }
});

async function checkDistFixture(t, { published = true, leak = false, assets = true } = {}) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'coco-works-dist-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, 'src/content/works'), { recursive: true });
  await mkdir(path.join(root, 'dist'), { recursive: true });
  await writeFile(path.join(root, 'dist/index.html'), '<!doctype html><html></html>');
  const content = `---\ntitle: "ワーク"\ndescription: "説明"\nbookConnection: ${JSON.stringify(leak ? '公開レビューが示す問いです。' : '本の問いを日常向けに翻案しました。')}\npublished: ${published}\n---\n\n## 手順\n\n1. ここで終える。\n`;
  await writeFile(path.join(root, 'src/content/works/sample.md'), content);
  if (published && assets) {
    await mkdir(path.join(root, 'dist/works/sample'), { recursive: true });
    await mkdir(path.join(root, 'dist/works/media/sample'), { recursive: true });
    await writeFile(path.join(root, 'dist/works/sample/index.html'), '<!doctype html><html></html>');
    await writeFile(path.join(root, 'dist/works/media/sample/480.webp'), 'fixture');
    await writeFile(path.join(root, 'dist/works/media/sample/1080.webp'), 'fixture');
  }
  return spawnSync(process.execPath, [path.join(process.cwd(), 'scripts/check-works-dist.mjs')], { cwd: root, encoding: 'utf8' });
}

test('check-works-dist rejects direct Markdown edits before published or draft filtering', async (t) => {
  for (const published of [true, false]) {
    const result = await checkDistFixture(t, { published, leak: true, assets: true });
    assert.notEqual(result.status, 0);
    assert.match(`${result.stdout}\n${result.stderr}`, /Known reader-facing voice relapse.*bookConnection/);
  }
});

test('check-works-dist preserves the existing missing published-output failure for clean copy', async (t) => {
  const result = await checkDistFixture(t, { published: true, leak: false, assets: false });
  assert.notEqual(result.status, 0);
  assert.match(`${result.stdout}\n${result.stderr}`, /Published work output missing: dist\/works\/sample\/index\.html/);
});

test('import rejects each relapse phrase in dry-run and normal mode before writing files', async (t) => {
  const cases = [
    ['bookConnection', '公開レビューから受け取った問い'],
    ['bookConnection', 'レビューにある見方'],
    ['bookConnection', '公開レビューが示す問い'],
    ['body', 'レビュー筆者が書いた言葉'],
    ['bookConnection', '公開レビューを確認しました'],
    ['bookConnection', '原著全文は未読'],
    ['bookConnection', '原著本文は未読'],
    ['sources', '出版社提供目次を確認しました'],
  ];
  for (const [field, phrase] of cases) {
    for (const dryRun of [true, false]) {
      const f = await fixture(t);
      if (field === 'sources') f.input.sources[0].label = phrase;
      else if (field === 'body') f.input.body += `\n\n${phrase}`;
      else f.input[field] = phrase;
      await f.save();
      await assert.rejects(importWork(f.file, { root: f.root, dryRun }), /Known reader-facing voice relapse/);
      await assert.rejects(readFile(path.join(f.root, 'src/content/works/sample.md')), { code: 'ENOENT' });
      await assert.rejects(readFile(path.join(f.root, 'src/assets/works/sample.png')), { code: 'ENOENT' });
      await assert.rejects(readFile(path.join(f.root, '.works-import.lock')), { code: 'ENOENT' });
    }
  }
});
