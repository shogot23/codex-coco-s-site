import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { GALLERY_GENRES, type GalleryGenre } from '../src/lib/gallery-taxonomy.ts';

type GalleryManifestEntry = {
  title: string;
  image: string;
  genre?: GalleryGenre;
  author?: string;
  needs_review: boolean;
  generated_at: string;
  source_file: string;
  ocr_confidence: number;
  title_confidence?: number;
  author_confidence?: number;
  ocr_text: string;
};

type CorrectionPatch = Partial<Pick<GalleryManifestEntry, 'title' | 'author' | 'genre'>>;

const MANIFEST_PATH = path.resolve('data/gallery-manifest.json');
const CORRECTIONS_PATH = path.resolve('data/gallery-corrections.json');
const ALLOWED_FIELDS = new Set<keyof CorrectionPatch>(['title', 'author', 'genre']);
const ALLOWED_GENRES = new Set<GalleryGenre>(GALLERY_GENRES);

function fail(message: string): never {
  throw new Error(`[gallery:apply-corrections] ${message}`);
}

function readJsonFile(filePath: string): unknown {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function validateCorrections(
  value: unknown,
  manifestBySourceFile: Map<string, GalleryManifestEntry>
): Record<string, CorrectionPatch> {
  if (!isPlainObject(value)) {
    fail('data/gallery-corrections.json は object である必要があります。');
  }

  const corrections: Record<string, CorrectionPatch> = {};

  for (const [sourceFile, patch] of Object.entries(value)) {
    if (!manifestBySourceFile.has(sourceFile)) {
      fail(`manifest に存在しない source_file が指定されています: ${sourceFile}`);
    }

    if (!isPlainObject(patch)) {
      fail(`補正値は object である必要があります: ${sourceFile}`);
    }

    const patchKeys = Object.keys(patch);
    if (patchKeys.length === 0) {
      fail(`補正値が空です: ${sourceFile}`);
    }

    for (const field of patchKeys) {
      if (!ALLOWED_FIELDS.has(field as keyof CorrectionPatch)) {
        fail(`未許可フィールド ${field} が指定されています: ${sourceFile}`);
      }

      const fieldValue = patch[field];
      if (typeof fieldValue !== 'string') {
        fail(`補正値は文字列である必要があります: ${sourceFile}#${field}`);
      }

      if (field === 'genre' && !ALLOWED_GENRES.has(fieldValue as GalleryGenre)) {
        fail(`genre は ${Array.from(ALLOWED_GENRES).join('/')} のいずれかである必要があります: ${sourceFile}`);
      }
    }

    corrections[sourceFile] = patch as CorrectionPatch;
  }

  return corrections;
}

function readManifest(): GalleryManifestEntry[] {
  const raw = readJsonFile(MANIFEST_PATH);
  if (!Array.isArray(raw)) {
    fail('data/gallery-manifest.json の形式が不正です。');
  }

  const manifest = raw as GalleryManifestEntry[];
  const sourceFiles = new Set<string>();

  for (const entry of manifest) {
    if (sourceFiles.has(entry.source_file)) {
      fail(`manifest 内で source_file が重複しています: ${entry.source_file}`);
    }

    sourceFiles.add(entry.source_file);
  }

  return manifest;
}

function main(): void {
  const manifest = readManifest();
  const manifestBySourceFile = new Map(manifest.map((entry) => [entry.source_file, entry]));
  const corrections = validateCorrections(readJsonFile(CORRECTIONS_PATH), manifestBySourceFile);

  let applied = 0;

  for (const entry of manifest) {
    const patch = corrections[entry.source_file];
    if (!patch) {
      continue;
    }

    if (patch.title !== undefined) {
      entry.title = patch.title;
    }

    if (patch.author !== undefined) {
      entry.author = patch.author;
    }

    if (patch.genre !== undefined) {
      entry.genre = patch.genre;
    }

    applied += 1;
  }

  const correctionCount = Object.keys(corrections).length;
  if (applied !== correctionCount) {
    fail(`補正適用数が一致しません。expected=${correctionCount} actual=${applied}`);
  }

  writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  console.info(`[gallery:apply-corrections] Applied ${applied} correction(s)`);
}

main();
