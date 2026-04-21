import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createGallerySlug } from './lib/slug.ts';
import type { GalleryManifestEntry } from './lib/ocr.ts';

const MANIFEST_PATH = path.resolve('data/gallery-manifest.json');
const GALLERY_DIR = path.resolve('src/content/gallery');
const TARGET_IMAGE_PREFIX = '/uploads/gallery/books/';
const TARGET_SOURCE_PREFIX = 'gallery/books/';
const PRESERVE_STRING_FIELDS = ['description', 'generated_at', 'note', 'relatedReview'] as const;
const MANIFEST_STRING_FIELDS = ['author', 'genre', 'image', 'source_file', 'title'] as const;
const MANAGED_BY_FIELD = 'managed_by';
export const GALLERY_GENERATE_MANAGED_BY = 'gallery:generate';

type GalleryMarkdownData = {
  title: string;
  image: string;
  genre?: string;
  author?: string;
  note?: string;
  relatedReview?: string;
  description?: string;
  needs_review?: boolean;
  generated_at: string;
  source_file: string;
  published: boolean;
  managed_by?: string;
  body: string;
};

type ExistingGalleryFile = {
  path: string;
  sourceFile?: string;
  data: Partial<GalleryMarkdownData>;
  body: string;
};

type GenerateGalleryMarkdownOptions = {
  manifestPath?: string;
  galleryDir?: string;
  force?: boolean;
  cwd?: string;
  logger?: Pick<typeof console, 'info' | 'warn'>;
};

function readManifest(manifestPath: string): GalleryManifestEntry[] {
  if (!existsSync(manifestPath)) {
    throw new Error('data/gallery-manifest.json が見つかりません。先に npm run gallery:ocr を実行してください。');
  }

  const raw = readFileSync(manifestPath, 'utf8');
  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    throw new Error('data/gallery-manifest.json の形式が不正です。');
  }

  return parsed as GalleryManifestEntry[];
}

function parseFrontmatter(content: string): { frontmatter: string; body: string } | null {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return null;
  }

  return {
    frontmatter: match[1],
    body: match[2],
  };
}

function readScalarField(frontmatter: string, field: string): string | boolean | undefined {
  const match = frontmatter.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'));
  if (!match) {
    return undefined;
  }

  const rawValue = match[1].trim();

  if (rawValue === 'true') {
    return true;
  }

  if (rawValue === 'false') {
    return false;
  }

  if (rawValue.startsWith('"') && rawValue.endsWith('"')) {
    return JSON.parse(rawValue);
  }

  if (rawValue.startsWith("'") && rawValue.endsWith("'")) {
    return rawValue.slice(1, -1).replace(/\\'/g, "'");
  }

  return rawValue;
}

function readExistingGalleryFile(fullPath: string): ExistingGalleryFile {
  const content = readFileSync(fullPath, 'utf8');
  const parsed = parseFrontmatter(content);

  if (!parsed) {
    return {
      path: fullPath,
      body: content,
      data: {},
    };
  }

  const data: Partial<GalleryMarkdownData> = {
    body: parsed.body,
  };

  for (const field of MANIFEST_STRING_FIELDS) {
    const value = readScalarField(parsed.frontmatter, field);
    if (typeof value === 'string') {
      data[field] = value;
    }
  }

  for (const field of PRESERVE_STRING_FIELDS) {
    const value = readScalarField(parsed.frontmatter, field);
    if (typeof value === 'string') {
      data[field] = value;
    }
  }

  const needsReview = readScalarField(parsed.frontmatter, 'needs_review');
  if (typeof needsReview === 'boolean') {
    data.needs_review = needsReview;
  }

  const published = readScalarField(parsed.frontmatter, 'published');
  if (typeof published === 'boolean') {
    data.published = published;
  }

  const managedBy = readScalarField(parsed.frontmatter, MANAGED_BY_FIELD);
  if (typeof managedBy === 'string') {
    data.managed_by = managedBy;
  }

  return {
    path: fullPath,
    sourceFile: data.source_file,
    data,
    body: parsed.body,
  };
}

function findExistingGalleryFiles(galleryDir: string): ExistingGalleryFile[] {
  return readdirSync(galleryDir)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => readExistingGalleryFile(path.join(galleryDir, fileName)));
}

function findExistingSourceFiles(galleryDir: string): Map<string, ExistingGalleryFile> {
  const entries = new Map<string, ExistingGalleryFile>();

  for (const file of findExistingGalleryFiles(galleryDir)) {
    if (!file.sourceFile) {
      continue;
    }

    entries.set(file.sourceFile, file);
  }

  return entries;
}

function quote(value: string): string {
  return JSON.stringify(value);
}

function mergeEntryData(entry: GalleryManifestEntry, existing?: ExistingGalleryFile): GalleryMarkdownData {
  const preserved = existing?.data ?? {};

  return {
    title: entry.title,
    image: entry.image,
    genre: entry.genre,
    author: entry.author,
    note: preserved.note,
    relatedReview: preserved.relatedReview,
    description: preserved.description,
    needs_review: entry.needs_review,
    generated_at: preserved.generated_at ?? entry.generated_at,
    source_file: entry.source_file,
    published: preserved.published ?? false,
    managed_by: GALLERY_GENERATE_MANAGED_BY,
    body: existing?.body ?? '',
  };
}

function renderMarkdown(entry: GalleryMarkdownData): string {
  const frontmatter = [
    '---',
    `title: ${quote(entry.title)}`,
    `image: ${quote(entry.image)}`,
  ];

  if (entry.genre) {
    frontmatter.push(`genre: ${quote(entry.genre)}`);
  }

  if (entry.author) {
    frontmatter.push(`author: ${quote(entry.author)}`);
  }

  if (entry.note) {
    frontmatter.push(`note: ${quote(entry.note)}`);
  }

  if (entry.relatedReview) {
    frontmatter.push(`relatedReview: ${quote(entry.relatedReview)}`);
  }

  if (entry.description) {
    frontmatter.push(`description: ${quote(entry.description)}`);
  }

  frontmatter.push(`needs_review: ${entry.needs_review ? 'true' : 'false'}`);
  frontmatter.push(`generated_at: ${quote(entry.generated_at)}`);
  frontmatter.push(`source_file: ${quote(entry.source_file)}`);
  frontmatter.push(`published: ${entry.published ? 'true' : 'false'}`);
  if (entry.managed_by) {
    frontmatter.push(`${MANAGED_BY_FIELD}: ${quote(entry.managed_by)}`);
  }
  frontmatter.push('---');

  return entry.body ? `${frontmatter.join('\n')}\n${entry.body}` : `${frontmatter.join('\n')}\n\n`;
}

function isTargetEntry(entry: GalleryManifestEntry): boolean {
  return entry.image.startsWith(TARGET_IMAGE_PREFIX) && entry.source_file.startsWith(TARGET_SOURCE_PREFIX);
}

function isTargetSourceFile(sourceFile: string | undefined): sourceFile is string {
  return Boolean(sourceFile?.startsWith(TARGET_SOURCE_PREFIX));
}

function destinationForEntry(
  entry: GalleryManifestEntry,
  existingBySourceFile: Map<string, ExistingGalleryFile>,
  galleryDir: string
): string {
  return existingBySourceFile.get(entry.source_file)?.path ?? path.join(galleryDir, `${createGallerySlug(entry.source_file, entry.genre)}.md`);
}

function hasSemanticChanges(existing: ExistingGalleryFile | undefined, nextData: GalleryMarkdownData): boolean {
  if (!existing) {
    return true;
  }

  const currentData = existing.data;

  return (
    currentData.title !== nextData.title ||
    currentData.image !== nextData.image ||
    currentData.genre !== nextData.genre ||
    currentData.author !== nextData.author ||
    currentData.note !== nextData.note ||
    currentData.relatedReview !== nextData.relatedReview ||
    currentData.description !== nextData.description ||
    currentData.needs_review !== nextData.needs_review ||
    currentData.generated_at !== nextData.generated_at ||
    currentData.source_file !== nextData.source_file ||
    currentData.published !== nextData.published ||
    currentData.managed_by !== nextData.managed_by ||
    existing.body !== nextData.body
  );
}

function isManagedByGenerate(existing: ExistingGalleryFile): boolean {
  return existing.data.managed_by === GALLERY_GENERATE_MANAGED_BY;
}

function deleteOrphanedGeneratedFiles(
  existingBySourceFile: Map<string, ExistingGalleryFile>,
  manifestSourceFiles: Set<string>,
  logger: Pick<typeof console, 'info' | 'warn'>,
  cwd: string
): void {
  for (const [sourceFile, existing] of existingBySourceFile.entries()) {
    if (!isTargetSourceFile(sourceFile) || manifestSourceFiles.has(sourceFile)) {
      continue;
    }

    if (!isManagedByGenerate(existing)) {
      logger.warn(
        `[gallery:generate] preserved unmanaged orphan: ${path.relative(cwd, existing.path)}`
      );
      continue;
    }

    rmSync(existing.path);
    logger.info(`[gallery:generate] deleted ${path.relative(cwd, existing.path)}`);
  }
}

export function generateGalleryMarkdown(options: GenerateGalleryMarkdownOptions = {}): void {
  const manifestPath = options.manifestPath ?? MANIFEST_PATH;
  const galleryDir = options.galleryDir ?? GALLERY_DIR;
  const cwd = options.cwd ?? process.cwd();
  const force = options.force ?? false;
  const logger = options.logger ?? console;

  mkdirSync(galleryDir, { recursive: true });
  const manifest = readManifest(manifestPath);
  const existingBySourceFile = findExistingSourceFiles(galleryDir);
  const manifestSourceFiles = new Set<string>();

  for (const entry of manifest) {
    if (!isTargetEntry(entry)) {
      logger.warn(`[gallery:generate] skip non-gallery source: ${entry.source_file}`);
      continue;
    }

    manifestSourceFiles.add(entry.source_file);
    const destinationPath = destinationForEntry(entry, existingBySourceFile, galleryDir);
    const existing = existingBySourceFile.get(entry.source_file);
    const nextData = mergeEntryData(entry, existing);
    const exists = existsSync(destinationPath);

    if (!force && !hasSemanticChanges(existing, nextData)) {
      logger.info(`[gallery:generate] skip existing file: ${path.relative(cwd, destinationPath)}`);
      continue;
    }

    writeFileSync(destinationPath, renderMarkdown(nextData));
    existingBySourceFile.set(entry.source_file, {
      path: destinationPath,
      sourceFile: entry.source_file,
      data: nextData,
      body: nextData.body,
    });
    logger.info(`[gallery:generate] ${exists ? 'updated' : 'created'} ${path.relative(cwd, destinationPath)}`);
  }

  deleteOrphanedGeneratedFiles(existingBySourceFile, manifestSourceFiles, logger, cwd);
}

function main(): void {
  generateGalleryMarkdown({ force: process.argv.includes('--force') });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
