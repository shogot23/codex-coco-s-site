import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { EDITORIAL_FIELDS } from './migrate-review-editorial-fields.mjs';

const EXCERPT_KINDS = new Set(['direct-quote', 'paraphrase', 'site-takeaway']);
const EDITORIAL_STATUSES = new Set(['draft', 'needs-review', 'reviewed']);

function readScalar(frontmatter, field) {
  const matched = frontmatter.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'));
  if (!matched) return undefined;
  const value = matched[1].trim();
  if (value.startsWith('"') && value.endsWith('"')) return JSON.parse(value);
  return value;
}

function parseFrontmatter(content) {
  const matched = content.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!matched) throw new Error('Expected YAML frontmatter delimited by ---');
  return matched[1];
}

export function auditReviewEditorialFields(reviewsDir) {
  const results = [];

  for (const fileName of readdirSync(reviewsDir).filter((name) => name.endsWith('.md')).sort()) {
    const slug = path.basename(fileName, '.md');
    const frontmatter = parseFrontmatter(readFileSync(path.join(reviewsDir, fileName), 'utf8'));
    const published = readScalar(frontmatter, 'published') !== 'false';
    if (!published) continue;

    const data = Object.fromEntries(EDITORIAL_FIELDS.map((field) => [field, readScalar(frontmatter, field)]));
    const errors = [];
    for (const field of EDITORIAL_FIELDS) {
      if (field === 'excerptSource') continue;
      if (typeof data[field] !== 'string' || !data[field].trim()) errors.push(`${field} is required`);
    }
    if (data.excerptKind && !EXCERPT_KINDS.has(data.excerptKind)) errors.push('excerptKind is invalid');
    if (data.editorialStatus && !EDITORIAL_STATUSES.has(data.editorialStatus)) errors.push('editorialStatus is invalid');
    if (data.excerptKind === 'direct-quote' && !data.excerptSource) errors.push('direct-quote requires excerptSource');
    if (data.excerptKind !== 'direct-quote' && data.excerptSource) errors.push('excerptSource is only allowed for direct-quote');
    results.push({ slug, errors });
  }

  return results;
}

function main() {
  const reviewsDir = path.resolve(process.argv[2] ?? 'src/content/reviews');
  const results = auditReviewEditorialFields(reviewsDir);
  const invalid = results.filter((result) => result.errors.length > 0);

  console.log(`audited ${results.length} published reviews`);
  for (const result of invalid) console.error(`${result.slug}: ${result.errors.join('; ')}`);
  if (invalid.length > 0) process.exitCode = 1;
}

if (import.meta.url === new URL(process.argv[1], 'file:').href) main();
