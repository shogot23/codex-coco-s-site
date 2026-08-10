import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { auditReviewEditorialFields } from './audit-review-editorial-fields.mjs';

const requiredFields = `excerptKind: "site-takeaway"
readerWorry: "worry"
bookQuestion: "question"
perspectiveShift: "shift"
smallStep: "step"
cocoNote: "note"
lingeringQuestion: "question"
editorialStatus: "reviewed"`;

test('audits published reviews and ignores unpublished drafts', () => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'review-editorial-audit-'));
  try {
    mkdirSync(root, { recursive: true });
    writeFileSync(path.join(root, 'valid.md'), `---\ntitle: "Valid"\npublished: true\n${requiredFields}\n---\n`);
    writeFileSync(path.join(root, 'draft.md'), '---\ntitle: "Draft"\npublished: false\n---\n');
    const results = auditReviewEditorialFields(root);
    assert.deepEqual(results, [{ slug: 'valid', errors: [] }]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('rejects an unverified direct quote without a source', () => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'review-editorial-audit-'));
  try {
    writeFileSync(
      path.join(root, 'quote.md'),
      `---\ntitle: "Quote"\npublished: true\n${requiredFields.replace('excerptKind: "site-takeaway"', 'excerptKind: "direct-quote"')}\n---\n`
    );
    assert.deepEqual(auditReviewEditorialFields(root), [
      { slug: 'quote', errors: ['direct-quote requires excerptSource'] },
    ]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
