import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

export const EDITORIAL_FIELDS = [
  'excerptKind',
  'excerptSource',
  'readerWorry',
  'bookQuestion',
  'perspectiveShift',
  'smallStep',
  'cocoNote',
  'lingeringQuestion',
  'editorialStatus',
];

const EXCERPT_KINDS = new Set(['direct-quote', 'paraphrase', 'site-takeaway']);
const EDITORIAL_STATUSES = new Set(['draft', 'needs-review', 'reviewed']);

function parseArgs(args) {
  const options = { dryRun: true, reviewsDir: path.resolve('src/content/reviews') };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === '--input') options.inputPath = path.resolve(args[++index] ?? '');
    if (argument === '--reviews-dir') options.reviewsDir = path.resolve(args[++index] ?? '');
    if (argument === '--apply') options.dryRun = false;
    if (argument === '--dry-run') options.dryRun = true;
  }

  if (!options.inputPath) {
    throw new Error('An explicit --input JSON file is required. The script never invents editorial copy.');
  }

  return options;
}

function parseFrontmatter(content) {
  const matched = content.match(/^(---\n)([\s\S]*?)(\n---\n?)([\s\S]*)$/);
  if (!matched) throw new Error('Expected YAML frontmatter delimited by ---');

  return { opening: matched[1], frontmatter: matched[2], divider: matched[3], body: matched[4] };
}

function removeField(frontmatter, field) {
  return frontmatter
    .split('\n')
    .filter((line) => !new RegExp(`^${field}:`).test(line))
    .join('\n');
}

function validateEditorialRecord(slug, record) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) {
    throw new Error(`${slug}: editorial record must be an object`);
  }

  for (const field of EDITORIAL_FIELDS) {
    if (field === 'excerptSource') continue;
    if (typeof record[field] !== 'string' || !record[field].trim()) {
      throw new Error(`${slug}: ${field} must be a non-empty string`);
    }
  }

  if (!EXCERPT_KINDS.has(record.excerptKind)) {
    throw new Error(`${slug}: excerptKind is invalid`);
  }
  if (!EDITORIAL_STATUSES.has(record.editorialStatus)) {
    throw new Error(`${slug}: editorialStatus is invalid`);
  }
  if (record.excerptKind === 'direct-quote' && (typeof record.excerptSource !== 'string' || !record.excerptSource.trim())) {
    throw new Error(`${slug}: direct-quote requires excerptSource`);
  }
  if (record.excerptKind !== 'direct-quote' && record.excerptSource) {
    throw new Error(`${slug}: excerptSource is only allowed for direct-quote`);
  }
}

export function buildUpdatedReviewContent(content, record) {
  const parsed = parseFrontmatter(content);
  let nextFrontmatter = parsed.frontmatter;

  for (const field of EDITORIAL_FIELDS) {
    nextFrontmatter = removeField(nextFrontmatter, field);
  }
  nextFrontmatter = nextFrontmatter.replace(/\n+$/, '');

  const editorialLines = EDITORIAL_FIELDS
    .filter((field) => record[field])
    .map((field) => `${field}: ${JSON.stringify(record[field])}`);

  const editorialBlock = editorialLines.join('\n');
  const publishedLine = nextFrontmatter.match(/^published:.*$/m)?.[0];
  const nextWithEditorialFields = publishedLine
    ? nextFrontmatter.replace(publishedLine, `${editorialBlock}\n${publishedLine}`)
    : `${nextFrontmatter}\n${editorialBlock}`;

  return `${parsed.opening}${nextWithEditorialFields}${parsed.divider}${parsed.body}`;
}

function loadManifest(inputPath) {
  const parsed = JSON.parse(readFileSync(inputPath, 'utf8'));
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('The input JSON must be an object keyed by review slug.');
  }
  return parsed;
}

export function migrateReviewEditorialFields({ reviewsDir, manifest, dryRun, logger = console }) {
  const reviewFiles = new Map(
    readdirSync(reviewsDir)
      .filter((name) => name.endsWith('.md'))
      .map((name) => [path.basename(name, '.md'), path.join(reviewsDir, name)])
  );
  const results = [];

  for (const [slug, record] of Object.entries(manifest)) {
    validateEditorialRecord(slug, record);
    const reviewPath = reviewFiles.get(slug);
    if (!reviewPath) throw new Error(`${slug}: review markdown file was not found`);

    const current = readFileSync(reviewPath, 'utf8');
    const next = buildUpdatedReviewContent(current, record);
    const changed = current !== next;
    results.push({ slug, reviewPath, changed });

    if (changed && !dryRun) writeFileSync(reviewPath, next);
  }

  const mode = dryRun ? 'dry-run' : 'apply';
  logger.info(`${mode}: ${results.filter((result) => result.changed).length}/${results.length} review files would change.`);
  for (const result of results.filter((entry) => entry.changed)) logger.info(`${mode}: ${result.slug}`);
  return results;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const manifest = loadManifest(options.inputPath);
  migrateReviewEditorialFields({
    reviewsDir: options.reviewsDir,
    manifest,
    dryRun: options.dryRun,
  });
}

if (import.meta.url === new URL(process.argv[1], 'file:').href) main();
