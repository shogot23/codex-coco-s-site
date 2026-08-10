import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { buildUpdatedReviewContent, migrateReviewEditorialFields } from './migrate-review-editorial-fields.mjs';

const record = {
  excerptKind: 'site-takeaway',
  readerWorry: '急いで答えを出そうとして、考える余白を失いそうなとき。',
  bookQuestion: '説明できない出来事と、どう一緒に歩くか。',
  perspectiveShift: '答えを持つことより、わからなさを抱える力へ目を向け直す。',
  smallStep: '今日ひとつ、すぐに結論づけたことをメモする。',
  cocoNote: 'ココちゃんと立ち止まり、急がない時間も読書の一部として受け取る。',
  lingeringQuestion: 'いま、答えを急ぎすぎていることは何だろう。',
  editorialStatus: 'reviewed',
};

const source = `---\ntitle: "Sample"\nexcerpt: "A site takeaway"\npublished: true\n---\n\n本文はそのまま残す。\n`;

test('buildUpdatedReviewContent preserves body and writes deterministic editorial fields', () => {
  const next = buildUpdatedReviewContent(source, record);

  assert.match(next, /excerptKind: "site-takeaway"/);
  assert.match(next, /editorialStatus: "reviewed"/);
  assert.match(next, /本文はそのまま残す。/);
  assert.equal(next, buildUpdatedReviewContent(next, record));
});

test('migration dry-run does not write and apply updates only explicit records', () => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'review-editorial-migration-'));
  const reviewsDir = path.join(root, 'src', 'content', 'reviews');
  mkdirSync(reviewsDir, { recursive: true });
  const reviewPath = path.join(reviewsDir, 'sample.md');
  writeFileSync(reviewPath, source);

  try {
    const quietLogger = { info() {} };
    const preview = migrateReviewEditorialFields({
      reviewsDir,
      manifest: { sample: record },
      dryRun: true,
      logger: quietLogger,
    });
    assert.equal(preview[0].changed, true);
    assert.equal(readFileSync(reviewPath, 'utf8'), source);

    migrateReviewEditorialFields({
      reviewsDir,
      manifest: { sample: record },
      dryRun: false,
      logger: quietLogger,
    });
    assert.match(readFileSync(reviewPath, 'utf8'), /readerWorry:/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('direct quotes require a source and site takeaways reject one', () => {
  assert.throws(
    () => migrateReviewEditorialFields({ reviewsDir: '.', manifest: { sample: { ...record, excerptKind: 'direct-quote' } }, dryRun: true }),
    /direct-quote requires excerptSource/
  );
  assert.throws(
    () => migrateReviewEditorialFields({ reviewsDir: '.', manifest: { sample: { ...record, excerptSource: 'p. 10' } }, dryRun: true }),
    /excerptSource is only allowed/
  );
});
