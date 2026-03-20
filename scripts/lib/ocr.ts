import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { basename, extname } from 'node:path';

const OCR_LANGS = 'jpn';
const CONFIDENCE_REVIEW_THRESHOLD = 0.8;
const GALLERY_GENRES = [
  '現代文学',
  '歴史小説',
  '漫画',
  'ノンフィクション',
  '歴史教養',
  '心理学',
  '健康',
  'ホビー',
  '新書',
  '自伝',
  'ビジネス',
  'エッセイ',
] as const;
const OCR_CACHE_PATH = path.resolve('.cache/tesseract');

type GalleryGenre = typeof GALLERY_GENRES[number];
type OcrLine = {
  text: string;
  confidence: number;
};

export type GalleryManifestEntry = {
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

let workerPromise: Promise<any> | undefined;

function roundConfidence(value: number): number {
  return Number((value / 100).toFixed(3));
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, ' ').replace(/[|]/g, ' ').trim();
}

function normalizePathSegment(value: string): string {
  return value.split(path.sep).join(path.posix.sep);
}

function isLikelyTextCandidate(value: string): boolean {
  const compact = value.replace(/\s+/g, '');
  const meaningfulChars = compact.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}A-Za-z0-9]/gu) ?? [];

  if (meaningfulChars.length < 3) {
    return false;
  }

  if (/^[ー一-]+$/u.test(compact)) {
    return false;
  }

  return true;
}

function fallbackTitleFromSource(sourceFile: string): string {
  const stem = basename(sourceFile, extname(sourceFile));
  return stem.replace(/[_-]+/g, ' ').trim() || stem;
}

function flattenLines(data: any): OcrLine[] {
  return (data.blocks ?? [])
    .flatMap((block: any) => block.paragraphs ?? [])
    .flatMap((paragraph: any) => paragraph.lines ?? [])
    .map((line: any) => ({
      text: normalizeText(line.text ?? ''),
      confidence: roundConfidence(line.confidence ?? 0),
    }))
    .filter((line: OcrLine) => line.text.length > 0);
}

function extractGenre(lines: OcrLine[]): GalleryGenre | undefined {
  for (const line of lines) {
    const genre = GALLERY_GENRES.find((candidate) => line.text.includes(candidate));
    if (genre) {
      return genre;
    }
  }

  return undefined;
}

function extractAuthor(lines: OcrLine[]): { value?: string; confidence?: number } {
  for (const line of lines) {
    const normalized = line.text;
    const headMatch = normalized.match(/^(著者|作者|著|作)[:：]?\s*(.+)$/);
    if (headMatch?.[2]) {
      return { value: normalizeText(headMatch[2]), confidence: line.confidence };
    }

    const tailMatch = normalized.match(/^(.+?)\s*(著者|作者|著|作)$/);
    if (tailMatch?.[1]) {
      return { value: normalizeText(tailMatch[1]), confidence: line.confidence };
    }
  }

  return {};
}

function extractTitle(lines: OcrLine[], author?: string, genre?: GalleryGenre): { value?: string; confidence?: number } {
  for (const line of lines) {
    if (line.confidence < CONFIDENCE_REVIEW_THRESHOLD) {
      continue;
    }

    if (!isLikelyTextCandidate(line.text)) {
      continue;
    }

    if (author && line.text === author) {
      continue;
    }

    if (genre && line.text === genre) {
      continue;
    }

    if (/^(著者|作者|著|作)[:：]?/.test(line.text)) {
      continue;
    }

    return { value: line.text, confidence: line.confidence };
  }

  return {};
}

function shouldMarkForReview(entry: {
  title?: string;
  genre?: GalleryGenre;
  ocr_confidence: number;
  title_confidence?: number;
  author_confidence?: number;
}): boolean {
  return (
    !entry.genre ||
    entry.ocr_confidence < CONFIDENCE_REVIEW_THRESHOLD ||
    !entry.title ||
    entry.title.length < 2 ||
    (entry.title_confidence ?? 0) < CONFIDENCE_REVIEW_THRESHOLD ||
    (entry.author_confidence !== undefined && entry.author_confidence < CONFIDENCE_REVIEW_THRESHOLD)
  );
}

async function getWorker(): Promise<any> {
  if (!workerPromise) {
    workerPromise = (async () => {
      const imported = await import('tesseract.js');
      const tesseract = 'default' in imported ? imported.default : imported;

      if ('setLogging' in tesseract && typeof tesseract.setLogging === 'function') {
        tesseract.setLogging(false);
      }

      mkdirSync(OCR_CACHE_PATH, { recursive: true });

      const worker = await tesseract.createWorker(OCR_LANGS, 1, {
        cachePath: OCR_CACHE_PATH,
      });

      if ('PSM' in tesseract && tesseract.PSM?.SPARSE_TEXT !== undefined) {
        await worker.setParameters({
          tessedit_pageseg_mode: tesseract.PSM.SPARSE_TEXT,
        });
      }

      return worker;
    })();
  }

  return workerPromise;
}

export async function terminateOcrWorker(): Promise<void> {
  if (!workerPromise) {
    return;
  }

  const worker = await workerPromise;
  await worker.terminate();
  workerPromise = undefined;
}

export async function extractGalleryMetadata(imagePath: string, imagePublicPath: string, sourceFile: string): Promise<GalleryManifestEntry> {
  const worker = await getWorker();
  const { data } = await worker.recognize(imagePath, {}, { text: true, blocks: true });
  const lines = flattenLines(data);
  const genre = extractGenre(lines);
  const author = extractAuthor(lines);
  const title = extractTitle(lines, author.value, genre);
  const resolvedTitle = title.value ?? fallbackTitleFromSource(sourceFile);
  const generatedAt = new Date().toISOString();
  const ocrConfidence = roundConfidence(data.confidence ?? 0);

  return {
    title: resolvedTitle,
    image: normalizePathSegment(imagePublicPath),
    genre,
    author: author.value,
    needs_review: shouldMarkForReview({
      title: title.value,
      genre,
      ocr_confidence: ocrConfidence,
      title_confidence: title.confidence,
      author_confidence: author.confidence,
    }),
    generated_at: generatedAt,
    source_file: normalizePathSegment(sourceFile),
    ocr_confidence: ocrConfidence,
    title_confidence: title.confidence,
    author_confidence: author.confidence,
    ocr_text: normalizeText(data.text ?? ''),
  };
}
