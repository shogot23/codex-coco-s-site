import { spawnSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import path, { basename, extname } from 'node:path';
import { extractGalleryMetadata, terminateOcrWorker } from './lib/ocr.ts';
import { createGalleryAssetBasename, createGallerySlug } from './lib/slug.ts';
import { canUseVisionOcr, extractVisionOcrLines, type VisionOcrLine } from './lib/vision-ocr.ts';
import {
  runWebFactCheck,
  type WebFactCheckDuplicateCandidate,
  type WebFactCheckResult,
} from './lib/web-fact-check.ts';

const INBOX_DIR = path.resolve('inbox/gallery');
const TARGET_DIR = path.resolve('public/uploads/gallery/books');
const GALLERY_DIR = path.resolve('src/content/gallery');
const REVIEWS_DIR = path.resolve('src/content/reviews');
const REPORT_PATH = path.resolve('reports/gallery-import-report.md');
const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const GALLERY_GENRES = ['小説', 'ビジネス', '歴史'] as const;
const MATCH_RULES = {
  import: {
    title: 0.72,
    author: 0.66,
  },
  candidates: {
    titleLimit: 3,
    authorLimit: 3,
    similarLimit: 5,
    titleMinScore: 0.36,
    authorMinScore: 0.42,
    similarEntryMinScore: 0.45,
  },
  review: {
    strongSimilar: {
      score: 0.82,
      title: 0.78,
      author: 0.7,
    },
  },
  duplicate: {
    minOcrConfidence: 0.35,
    authorCandidateScore: 0.88, // 0.82 -> 0.88 に引き上げ
    authorLedTitleBigramRatio: 0.45, // 0.35 -> 0.45 に引き上げ
    titleCandidateScore: 0.86,
    titleLedSimilarityScore: 0.86,
    titleLedOverallConfidence: 0.3,
    authorLedMinTitleCandidateScore: 0.45, // 新規追加: author-led でも title 候補スコアの条件
  },
  webFactCheck: {
    minOcrConfidence: 0.35,
    minExactSimilarOcrConfidence: 0.3,
    minMetadataTitleConfidence: 0.56,
    minMetadataAuthorConfidence: 0.5,
    importConfidenceMargin: 0.02,
    exactSimilarTitleCandidateScore: 0.88,
    exactSimilarAuthorCandidateScore: 0.62,
  },
} as const;

// OCR ノイズ語パターン（帯や宣伝文などの減点用）
const OCR_NOISE_PATTERNS: Array<{ pattern: RegExp; penalty: number; reason: string }> = [
  { pattern: /^(配信|独占|先行|限定|特別)/, penalty: 0.5, reason: 'promo-prefix' },
  { pattern: /(ドラマ化|映像化|映画化|アニメ化)$/, penalty: 0.4, reason: 'adaptation-suffix' },
  { pattern: /(ノミネート|受賞|大賞|賞)\S*$/, penalty: 0.4, reason: 'award-suffix' },
  { pattern: /^(公開|発売|好評|絶賛)/, penalty: 0.5, reason: 'release-prefix' },
  { pattern: /シリーズ累計\d+万部/, penalty: 0.6, reason: 'sales-claim' },
  { pattern: /ベストセラー/, penalty: 0.5, reason: 'bestseller' },
  { pattern: /^(文庫|単行本|新書|選書)/, penalty: 0.3, reason: 'format-info' },
  { pattern: /^(著|作者|監修|イラスト|挿絵)[:：]/, penalty: 0.8, reason: 'author-label' },
];

const NOISE_EXCLUSION_THRESHOLD = 0.7; // penalty 合計がこの値以上なら除外

type GalleryGenre = (typeof GALLERY_GENRES)[number];
type OverrideField = 'title' | 'author' | 'genre';

type ExistingGalleryEntry = {
  path: string;
  slug: string;
  title: string;
  author?: string;
  genre?: GalleryGenre;
  description?: string;
};

type ReviewEntry = {
  path: string;
  slug: string;
  title: string;
  bookTitle?: string;
  author?: string;
  description?: string;
  excerpt?: string;
  published: boolean;
};

type RankedCandidate = {
  value: string;
  score: number;
  sources: string[];
};

type SimilarEntryCandidate = {
  kind: 'gallery' | 'review';
  path: string;
  slug: string;
  title: string;
  author?: string;
  score: number;
  titleScore: number;
  authorScore: number;
  published?: boolean;
  exact: boolean;
};

type DuplicateMatch = {
  entry: ExistingGalleryEntry;
  kind: 'exact' | 'author-led' | 'title-led' | 'fact-check';
  score: number;
  titleCandidateScore: number;
  authorCandidateScore: number;
  titleBigramRatio: number;
};

type CliOptions = {
  dryRun: boolean;
  reportJsonPath?: string;
  targetFile?: string;
  overrides: {
    title?: string;
    author?: string;
    genre?: GalleryGenre;
  };
  rawArgs: string[];
};

type MetadataCandidate = {
  title?: string;
  titleConfidence: number;
  author?: string;
  authorConfidence: number;
  genre?: GalleryGenre;
  genreConfidence: number;
  description?: string;
  descriptionConfidence: number;
  alt?: string;
  altConfidence: number;
  relatedReview?: string;
  relatedReviewTitle?: string;
  ocrConfidence: number;
  ocrText: string;
  overallConfidence: number;
  warnings: string[];
  existingTitlesByAuthor: string[];
  scannersUsed: string[];
  ocrCandidateStrings: string[];
  titleCandidates: RankedCandidate[];
  authorCandidates: RankedCandidate[];
  similarEntries: SimilarEntryCandidate[];
  overrideFields: OverrideField[];
  webFactCheck?: WebFactCheckResult;
  multiBookIndicators?: string[]; // 複数冊検出の指標
};

type ImportPlan = {
  assetFileName: string;
  destinationImagePath: string;
  destinationMarkdownPath: string;
  sourceFile: string;
  imagePublicPath: string;
};

type SourceHandling = 'retained' | 'moved';

type ProcessedImageResult = {
  sourcePath: string;
  sourceHandling: SourceHandling;
  status: 'imported' | 'duplicate' | 'manual-review' | 'error';
  destinationImagePath?: string;
  destinationMarkdownPath?: string;
  duplicatePath?: string;
  metadata: MetadataCandidate;
  errorMessage?: string;
  importPlan?: ImportPlan;
};

type ValidationResult = {
  command: string;
  success: boolean;
  exitCode: number | null;
  stdout: string;
  stderr: string;
};

type ReportContext = {
  startedAt: string;
  finishedAt?: string;
  visionAvailable: boolean;
  scannedFiles: string[];
  unsupportedFiles: string[];
  results: ProcessedImageResult[];
  validations: ValidationResult[];
  cliOptions: CliOptions;
  fatalError?: string;
};

function roundConfidence(value: number): number {
  return Number(Math.max(0, Math.min(1, value)).toFixed(3));
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function normalizeForComparison(value?: string): string {
  return (value ?? '')
    .normalize('NFKC')
    .replace(/\s+/g, '')
    .replace(/[「」『』"'`’‘“”.,，、。・･!！?？:：;；/／\\()（）［］\[\]【】〔〕〈〉《》＜＞\-ー_〜~＋+＝=]/g, '')
    .toLowerCase();
}

function toPosixPath(value: string): string {
  return value.split(path.sep).join(path.posix.sep);
}

function toRelativeReportPath(value: string): string {
  return toPosixPath(path.relative(process.cwd(), value));
}

let inboxRealPathCache: string | undefined;

function resolveExistingRealPath(filePath: string, label: string): string {
  try {
    return realpathSync(filePath);
  } catch (error) {
    const errorCode = typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code?: unknown }).code)
      : undefined;

    if (errorCode === 'ENOENT') {
      throw new Error(`${label} が見つかりません: ${filePath}`);
    }

    throw new Error(`${label} の realpath 解決に失敗しました: ${filePath}`);
  }
}

function getInboxRealPath(): string {
  if (!inboxRealPathCache) {
    inboxRealPathCache = resolveExistingRealPath(INBOX_DIR, 'inbox/gallery');
  }

  return inboxRealPathCache;
}

function isRealPathWithinDirectory(fileRealPath: string, directoryRealPath: string): boolean {
  const relativePath = path.relative(directoryRealPath, fileRealPath);
  return relativePath === '' || (!relativePath.startsWith('..') && !path.isAbsolute(relativePath));
}

function assertTargetFileIsInsideInbox(targetFile: string): void {
  const targetRealPath = resolveExistingRealPath(targetFile, '指定ファイル');
  if (isRealPathWithinDirectory(targetRealPath, getInboxRealPath())) {
    return;
  }

  const targetLabel = targetRealPath === targetFile
    ? targetFile
    : `${targetFile} (resolved: ${targetRealPath})`;
  throw new Error(`--file には inbox/gallery/ 配下の実ファイルだけを指定してください: ${targetLabel}`);
}

function isInboxManagedSourceFile(filePath: string): boolean {
  if (!existsSync(filePath)) {
    return false;
  }

  try {
    return isRealPathWithinDirectory(realpathSync(filePath), getInboxRealPath());
  } catch {
    return false;
  }
}

function walkFiles(directory: string): string[] {
  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return walkFiles(fullPath);
    }

    return [fullPath];
  });
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
    return JSON.parse(rawValue) as string;
  }

  if (rawValue.startsWith("'") && rawValue.endsWith("'")) {
    return rawValue.slice(1, -1).replace(/\\'/g, "'");
  }

  return rawValue;
}

function readExistingGalleryEntries(): ExistingGalleryEntry[] {
  if (!existsSync(GALLERY_DIR)) {
    return [];
  }

  return readdirSync(GALLERY_DIR)
    .filter((fileName) => fileName.endsWith('.md'))
    .flatMap((fileName) => {
      const fullPath = path.join(GALLERY_DIR, fileName);
      const content = readFileSync(fullPath, 'utf8');
      const parsed = parseFrontmatter(content);
      if (!parsed) {
        return [];
      }

      const titleValue = readScalarField(parsed.frontmatter, 'title');
      const authorValue = readScalarField(parsed.frontmatter, 'author');
      const genreValue = readScalarField(parsed.frontmatter, 'genre');
      const descriptionValue = readScalarField(parsed.frontmatter, 'description');

      if (typeof titleValue !== 'string' || titleValue.length === 0) {
        return [];
      }

      const genre = typeof genreValue === 'string' && GALLERY_GENRES.includes(genreValue as GalleryGenre)
        ? (genreValue as GalleryGenre)
        : undefined;

      return [
        {
          path: fullPath,
          slug: fileName.replace(/\.md$/, ''),
          title: titleValue,
          author: typeof authorValue === 'string' ? authorValue : undefined,
          genre,
          description: typeof descriptionValue === 'string' ? descriptionValue : undefined,
        },
      ];
    });
}

function readReviewEntries(): ReviewEntry[] {
  if (!existsSync(REVIEWS_DIR)) {
    return [];
  }

  return readdirSync(REVIEWS_DIR)
    .filter((fileName) => fileName.endsWith('.md'))
    .flatMap((fileName) => {
      const fullPath = path.join(REVIEWS_DIR, fileName);
      const content = readFileSync(fullPath, 'utf8');
      const parsed = parseFrontmatter(content);
      if (!parsed) {
        return [];
      }

      const titleValue = readScalarField(parsed.frontmatter, 'title');
      if (typeof titleValue !== 'string' || titleValue.length === 0) {
        return [];
      }

      const bookTitleValue = readScalarField(parsed.frontmatter, 'bookTitle');
      const authorValue = readScalarField(parsed.frontmatter, 'author');
      const descriptionValue = readScalarField(parsed.frontmatter, 'description');
      const excerptValue = readScalarField(parsed.frontmatter, 'excerpt');
      const publishedValue = readScalarField(parsed.frontmatter, 'published');

      return [
        {
          path: fullPath,
          slug: fileName.replace(/\.md$/, ''),
          title: titleValue,
          bookTitle: typeof bookTitleValue === 'string' ? bookTitleValue : undefined,
          author: typeof authorValue === 'string' ? authorValue : undefined,
          description: typeof descriptionValue === 'string' ? descriptionValue : undefined,
          excerpt: typeof excerptValue === 'string' ? excerptValue : undefined,
          published: typeof publishedValue === 'boolean' ? publishedValue : true,
        },
      ];
    });
}

function buildKnownAuthorSet(existingGalleryEntries: ExistingGalleryEntry[], reviewEntries: ReviewEntry[]): Set<string> {
  const authors = new Set<string>();

  for (const entry of existingGalleryEntries) {
    if (entry.author) {
      authors.add(entry.author);
    }
  }

  for (const review of reviewEntries) {
    if (review.author) {
      authors.add(review.author);
    }
  }

  return authors;
}

function buildAuthorGenreMap(existingGalleryEntries: ExistingGalleryEntry[]): Map<string, GalleryGenre> {
  const counts = new Map<string, Map<GalleryGenre, number>>();

  for (const entry of existingGalleryEntries) {
    if (!entry.author || !entry.genre) {
      continue;
    }

    const normalizedAuthor = normalizeForComparison(entry.author);
    const authorCounts = counts.get(normalizedAuthor) ?? new Map<GalleryGenre, number>();
    authorCounts.set(entry.genre, (authorCounts.get(entry.genre) ?? 0) + 1);
    counts.set(normalizedAuthor, authorCounts);
  }

  const authorGenres = new Map<string, GalleryGenre>();
  for (const [author, authorCounts] of counts.entries()) {
    const ranked = [...authorCounts.entries()].sort((left, right) => right[1] - left[1]);
    const [genre] = ranked[0] ?? [];
    if (genre) {
      authorGenres.set(author, genre);
    }
  }

  return authorGenres;
}

function findExactDuplicateEntry(
  title: string | undefined,
  author: string | undefined,
  existingGalleryEntries: ExistingGalleryEntry[]
): ExistingGalleryEntry | undefined {
  if (!title || !author) {
    return undefined;
  }

  const normalizedTitle = normalizeForComparison(title);
  const normalizedAuthor = normalizeForComparison(author);

  return existingGalleryEntries.find((entry) => {
    return (
      normalizeForComparison(entry.title) === normalizedTitle &&
      normalizeForComparison(entry.author) === normalizedAuthor
    );
  });
}

function calculateSharedBigramRatio(left?: string, right?: string): number {
  const normalizedLeft = normalizeForComparison(left);
  const normalizedRight = normalizeForComparison(right);

  if (normalizedLeft.length < 2 || !normalizedRight) {
    return 0;
  }

  const grams = [...buildBigrams(normalizedLeft).keys()];
  const uniqueGrams = new Set(grams);
  let matched = 0;

  for (const gram of uniqueGrams) {
    if (normalizedRight.includes(gram)) {
      matched += 1;
    }
  }

  return roundConfidence(matched / uniqueGrams.size);
}

function findRankedCandidateScore(value: string | undefined, candidates: RankedCandidate[]): number {
  if (!value) {
    return 0;
  }

  const normalized = normalizeForComparison(value);
  const match = candidates.find((candidate) => normalizeForComparison(candidate.value) === normalized);
  return match?.score ?? 0;
}

// Duplicate detection is intentionally more permissive than new-import gating,
// but only when OCR produced at least one usable candidate signal.
function findProbableDuplicateEntry(
  candidate: MetadataCandidate,
  existingGalleryEntries: ExistingGalleryEntry[]
): DuplicateMatch | undefined {
  if (candidate.ocrConfidence < MATCH_RULES.duplicate.minOcrConfidence) {
    return undefined;
  }

  if (candidate.titleCandidates.length === 0 && candidate.authorCandidates.length === 0) {
    return undefined;
  }

  const similarGalleryEntries = new Map(
    candidate.similarEntries
      .filter((entry) => entry.kind === 'gallery')
      .map((entry) => [entry.path, entry] as const)
  );

  let bestMatch: DuplicateMatch | undefined;

  for (const entry of existingGalleryEntries) {
    const titleCandidateScore = findRankedCandidateScore(entry.title, candidate.titleCandidates);
    const authorCandidateScore = findRankedCandidateScore(entry.author, candidate.authorCandidates);
    const titleBigramRatio = calculateSharedBigramRatio(entry.title, candidate.ocrText);
    const similarGalleryEntry = similarGalleryEntries.get(entry.path);

    const authorLed =
      authorCandidateScore >= MATCH_RULES.duplicate.authorCandidateScore &&
      titleBigramRatio >= MATCH_RULES.duplicate.authorLedTitleBigramRatio &&
      titleCandidateScore >= (MATCH_RULES.duplicate.authorLedMinTitleCandidateScore ?? 0.45);
    const titleLed =
      titleCandidateScore >= MATCH_RULES.duplicate.titleCandidateScore &&
      (similarGalleryEntry?.titleScore ?? 0) >= MATCH_RULES.duplicate.titleLedSimilarityScore &&
      candidate.overallConfidence >= MATCH_RULES.duplicate.titleLedOverallConfidence;

    if (!authorLed && !titleLed) {
      continue;
    }

    const nextMatch: DuplicateMatch = authorLed
      ? {
          entry,
          kind: 'author-led',
          score: roundConfidence(authorCandidateScore * 0.58 + titleBigramRatio * 0.42),
          titleCandidateScore,
          authorCandidateScore,
          titleBigramRatio,
        }
      : {
          entry,
          kind: 'title-led',
          score: roundConfidence(titleCandidateScore * 0.7 + (similarGalleryEntry?.titleScore ?? 0) * 0.3),
          titleCandidateScore,
          authorCandidateScore,
          titleBigramRatio,
        };

    if (!bestMatch || nextMatch.score > bestMatch.score) {
      bestMatch = nextMatch;
    }
  }

  return bestMatch;
}

function findMatchingReview(
  title: string | undefined,
  author: string | undefined,
  reviewEntries: ReviewEntry[]
): ReviewEntry | undefined {
  if (!title) {
    return undefined;
  }

  const normalizedTitle = normalizeForComparison(title);
  const normalizedAuthor = normalizeForComparison(author);

  return reviewEntries.find((entry) => {
    const reviewTitle = normalizeForComparison(entry.bookTitle ?? entry.title);
    if (reviewTitle !== normalizedTitle) {
      return false;
    }

    if (!author) {
      return true;
    }

    return normalizeForComparison(entry.author) === normalizedAuthor;
  });
}

function extractAuthorFromVisionLines(lines: VisionOcrLine[], knownAuthors: Set<string>): { value?: string; confidence: number } {
  for (const line of lines) {
    for (const author of knownAuthors) {
      if (normalizeForComparison(line.text).includes(normalizeForComparison(author))) {
        const confidence = Math.min(0.95, roundConfidence(0.55 + line.confidence * 0.45 + 0.1));
        return { value: author, confidence };
      }
    }
  }

  for (const line of lines) {
    const matched = line.text.match(/^(著者|作者|著|作)[:：]?\s*(.+)$/);
    if (matched?.[2]) {
      return {
        value: normalizeText(matched[2]),
        confidence: roundConfidence(0.55 + line.confidence * 0.45),
      };
    }
  }

  return { confidence: 0 };
}

function sanitizeAuthorValue(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const sanitized = normalizeText(value);
  if (!sanitized || sanitized === '=' || sanitized === '不明') {
    return undefined;
  }

  return sanitized;
}

function sanitizeTitleValue(value: string | undefined, fallbackStem: string): string | undefined {
  if (!value) {
    return undefined;
  }

  const sanitized = normalizeText(value);
  if (!sanitized || normalizeForComparison(sanitized) === normalizeForComparison(fallbackStem)) {
    return undefined;
  }

  return sanitized;
}

function sanitizeOverrideValue(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const sanitized = normalizeText(value);
  return sanitized || undefined;
}

function inferGenreCandidate(
  manifestGenre: GalleryGenre | undefined,
  author: string | undefined,
  authorGenreMap: Map<string, GalleryGenre>
): { genre?: GalleryGenre; confidence: number } {
  if (manifestGenre) {
    return { genre: manifestGenre, confidence: 0.82 };
  }

  if (!author) {
    return { confidence: 0 };
  }

  const inferredGenre = authorGenreMap.get(normalizeForComparison(author));
  if (!inferredGenre) {
    return { confidence: 0 };
  }

  return { genre: inferredGenre, confidence: 0.68 };
}

function buildDescription(title: string, author: string, genre?: GalleryGenre): { value: string; confidence: number } {
  const genreDescription =
    genre === 'ビジネス'
      ? '視点や行動を整えるヒントを受け取れそうな一冊'
      : genre === '歴史'
        ? '歴史の流れや人物像をたどる入口になりそうな一冊'
        : '物語の余韻をゆっくり味わえそうな一冊';

  return {
    value: `『${title}』は、${author}による${genreDescription}。`,
    confidence: genre ? 0.64 : 0.56,
  };
}

function buildAltText(title: string, author: string): { value: string; confidence: number } {
  return {
    value: `ココちゃんと『${title}』（${author}）が写るギャラリー画像`,
    confidence: 0.78,
  };
}

function computeOverallConfidence(candidate: {
  titleConfidence: number;
  authorConfidence: number;
  genreConfidence: number;
  descriptionConfidence: number;
  altConfidence: number;
}): number {
  const weighted =
    candidate.titleConfidence * 0.38 +
    candidate.authorConfidence * 0.24 +
    candidate.genreConfidence * 0.12 +
    candidate.descriptionConfidence * 0.16 +
    candidate.altConfidence * 0.1;

  return roundConfidence(weighted);
}

function isImportable(candidate: MetadataCandidate): boolean {
  // 複数冊の可能性がある場合は自動確定しない → manual-review へ
  if (candidate.multiBookIndicators && candidate.multiBookIndicators.length > 0) {
    return false;
  }

  return (
    Boolean(candidate.title) &&
    Boolean(candidate.author) &&
    candidate.titleConfidence >= MATCH_RULES.import.title &&
    candidate.authorConfidence >= MATCH_RULES.import.author
  );
}

function quote(value: string): string {
  return JSON.stringify(value);
}

function renderMarkdown(entry: {
  title: string;
  image: string;
  alt: string;
  genre?: GalleryGenre;
  author: string;
  description: string;
  needsReview: boolean;
  generatedAt: string;
  sourceFile: string;
  published: boolean;
  relatedReview?: string;
}): string {
  const frontmatter = [
    '---',
    `title: ${quote(entry.title)}`,
    `image: ${quote(entry.image)}`,
    `alt: ${quote(entry.alt)}`,
  ];

  if (entry.genre) {
    frontmatter.push(`genre: ${quote(entry.genre)}`);
  }

  frontmatter.push(`author: ${quote(entry.author)}`);
  frontmatter.push(`description: ${quote(entry.description)}`);
  frontmatter.push(`needs_review: ${entry.needsReview ? 'true' : 'false'}`);
  frontmatter.push(`generated_at: ${quote(entry.generatedAt)}`);
  frontmatter.push(`source_file: ${quote(entry.sourceFile)}`);
  if (entry.relatedReview) {
    frontmatter.push(`relatedReview: ${quote(entry.relatedReview)}`);
  }
  frontmatter.push(`published: ${entry.published ? 'true' : 'false'}`);
  frontmatter.push('---');

  return `${frontmatter.join('\n')}\n\n`;
}

function buildBigrams(value: string): Map<string, number> {
  const counts = new Map<string, number>();
  if (value.length < 2) {
    counts.set(value, 1);
    return counts;
  }

  for (let index = 0; index < value.length - 1; index += 1) {
    const gram = value.slice(index, index + 2);
    counts.set(gram, (counts.get(gram) ?? 0) + 1);
  }

  return counts;
}

function diceCoefficient(left: string, right: string): number {
  if (!left || !right) {
    return 0;
  }

  if (left === right) {
    return 1;
  }

  const leftBigrams = buildBigrams(left);
  const rightBigrams = buildBigrams(right);
  let overlap = 0;

  for (const [gram, leftCount] of leftBigrams.entries()) {
    const rightCount = rightBigrams.get(gram) ?? 0;
    overlap += Math.min(leftCount, rightCount);
  }

  const total = [...leftBigrams.values()].reduce((sum, count) => sum + count, 0) +
    [...rightBigrams.values()].reduce((sum, count) => sum + count, 0);

  return total === 0 ? 0 : (2 * overlap) / total;
}

function calculateSimilarity(left?: string, right?: string): number {
  const normalizedLeft = normalizeForComparison(left);
  const normalizedRight = normalizeForComparison(right);

  if (!normalizedLeft || !normalizedRight) {
    return 0;
  }

  if (normalizedLeft === normalizedRight) {
    return 1;
  }

  const shorter = Math.min(normalizedLeft.length, normalizedRight.length);
  const longer = Math.max(normalizedLeft.length, normalizedRight.length);
  const containment =
    normalizedLeft.includes(normalizedRight) || normalizedRight.includes(normalizedLeft)
      ? 0.82 + (shorter / longer) * 0.16
      : 0;

  return roundConfidence(Math.max(diceCoefficient(normalizedLeft, normalizedRight), containment));
}

function isLikelyCandidateText(value: string): boolean {
  const normalized = normalizeText(value);
  if (normalized.length < 2 || normalized.length > 120) {
    return false;
  }

  const compact = normalized.replace(/\s+/g, '');
  const meaningfulChars = compact.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}A-Za-z0-9]/gu) ?? [];
  if (meaningfulChars.length < 2) {
    return false;
  }

  if (/^[ー一-]+$/u.test(compact)) {
    return false;
  }

  return true;
}

// OCR ノイズ語の減点計算
function calculateNoisePenalty(text: string): { penalty: number; reasons: string[] } {
  const reasons: string[] = [];
  let totalPenalty = 0;

  for (const { pattern, penalty, reason } of OCR_NOISE_PATTERNS) {
    if (pattern.test(text)) {
      totalPenalty += penalty;
      reasons.push(reason);
    }
  }

  return { penalty: Math.min(totalPenalty, 1.0), reasons };
}

// 複数冊画像の検出
function detectMultipleBooksIndicators(visionLines: VisionOcrLine[]): {
  detected: boolean;
  indicators: string[];
} {
  const indicators: string[] = [];
  const combinedText = visionLines.map((line) => normalizeForComparison(line.text)).join(' ');

  const multiBookPatterns = [/上巻|下巻|中巻/, /全\d巻/, /\d冊セット/, /セット販売/, /合本|合本版/];

  for (const pattern of multiBookPatterns) {
    if (pattern.test(combinedText)) {
      indicators.push(`pattern: ${pattern.source}`);
    }
  }

  // タイトルらしきテキストが多数ある場合（normalized text でユニーク化してから判定）
  const titleLikeTexts = new Set(
    visionLines
      .filter(
        (line) =>
          line.confidence >= 0.65 && line.text.length >= 4 && !/^(著者|作者|著|作|監修)/.test(line.text)
      )
      .map((line) => normalizeForComparison(line.text))
  );

  if (titleLikeTexts.size >= 6) {
    indicators.push(`many unique title-like texts: ${titleLikeTexts.size}`);
  }

  return { detected: indicators.length > 0, indicators };
}

function addRankedCandidate(
  store: Map<string, RankedCandidate>,
  value: string | undefined,
  score: number,
  source: string
): void {
  if (!value) {
    return;
  }

  const normalized = normalizeForComparison(value);
  if (!normalized) {
    return;
  }

  const sanitizedValue = normalizeText(value);
  const nextScore = roundConfidence(score);
  const existing = store.get(normalized);

  if (!existing) {
    store.set(normalized, {
      value: sanitizedValue,
      score: nextScore,
      sources: [source],
    });
    return;
  }

  if (nextScore > existing.score || (nextScore === existing.score && sanitizedValue.length > existing.value.length)) {
    existing.value = sanitizedValue;
    existing.score = nextScore;
  }

  if (!existing.sources.includes(source)) {
    existing.sources.push(source);
  }
}

function sortRankedCandidates(candidates: Iterable<RankedCandidate>, limit: number): RankedCandidate[] {
  return [...candidates]
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return right.value.length - left.value.length;
    })
    .slice(0, limit);
}

function buildImportPlan(imagePath: string, title: string, author: string, genre?: GalleryGenre): ImportPlan {
  const originalExtension = extname(imagePath).toLowerCase();
  const sourceStem = basename(imagePath, extname(imagePath));
  const assetFileName = `${createGalleryAssetBasename(sourceStem, title, author)}${originalExtension}`;
  const sourceFile = toPosixPath(path.posix.join('gallery/books', assetFileName));
  const imagePublicPath = `/uploads/${sourceFile}`;

  return {
    assetFileName,
    destinationImagePath: path.join(TARGET_DIR, assetFileName),
    destinationMarkdownPath: path.join(GALLERY_DIR, `${createGallerySlug(sourceFile, genre)}.md`),
    sourceFile,
    imagePublicPath,
  };
}

function buildOcrCandidateStrings(
  ocrText: string,
  visionLines: VisionOcrLine[],
  resolvedTitle?: string,
  resolvedAuthor?: string
): string[] {
  const unique = new Map<string, string>();

  for (const line of [...visionLines].sort((left, right) => right.confidence - left.confidence)) {
    if (!isLikelyCandidateText(line.text)) {
      continue;
    }

    const key = normalizeForComparison(line.text);
    if (!unique.has(key)) {
      unique.set(key, normalizeText(line.text));
    }
  }

  for (const value of [resolvedTitle, resolvedAuthor]) {
    if (!value) {
      continue;
    }

    const key = normalizeForComparison(value);
    if (!unique.has(key)) {
      unique.set(key, value);
    }
  }

  const candidates = [...unique.values()].slice(0, 6);
  if (candidates.length === 0 && ocrText) {
    candidates.push(ocrText.slice(0, 160));
  }

  return candidates;
}

function scoreCandidateAgainstSignals(candidate: string, signals: string[]): number {
  let best = 0;
  for (const signal of signals) {
    best = Math.max(best, calculateSimilarity(candidate, signal));
  }

  return roundConfidence(best);
}

function buildTitleCandidates(params: {
  selectedTitle?: string;
  selectedTitleConfidence: number;
  overrideTitle?: string;
  ocrText: string;
  visionLines: VisionOcrLine[];
  selectedAuthor?: string;
  selectedGenre?: GalleryGenre;
  existingGalleryEntries: ExistingGalleryEntry[];
  reviewEntries: ReviewEntry[];
}): RankedCandidate[] {
  const store = new Map<string, RankedCandidate>();
  const signals = [
    params.selectedTitle,
    params.ocrText,
    ...params.visionLines.map((line) => line.text),
  ].filter((value): value is string => Boolean(value));

  if (params.selectedTitle) {
    addRankedCandidate(
      store,
      params.selectedTitle,
      params.overrideTitle ? 1 : params.selectedTitleConfidence,
      params.overrideTitle ? 'override' : 'tesseract'
    );
  }

  for (const line of params.visionLines) {
    if (!isLikelyCandidateText(line.text)) {
      continue;
    }

    if (params.selectedAuthor && normalizeForComparison(line.text) === normalizeForComparison(params.selectedAuthor)) {
      continue;
    }

    if (params.selectedGenre && normalizeForComparison(line.text) === normalizeForComparison(params.selectedGenre)) {
      continue;
    }

    if (/^(著者|作者|著|作)[:：]?/u.test(line.text)) {
      continue;
    }

    // ノイズ減点を適用
    const { penalty } = calculateNoisePenalty(line.text);

    // penalty 合計が閾値以上なら除外
    if (penalty >= NOISE_EXCLUSION_THRESHOLD) {
      continue;
    }

    const adjustedScore = line.confidence * 0.74 * (1 - penalty);
    addRankedCandidate(store, line.text, adjustedScore, 'vision');
  }

  for (const entry of params.existingGalleryEntries) {
    const score = scoreCandidateAgainstSignals(entry.title, signals);
    if (score >= MATCH_RULES.candidates.titleMinScore) {
      addRankedCandidate(store, entry.title, score, 'gallery');
    }
  }

  for (const entry of params.reviewEntries) {
    const score = scoreCandidateAgainstSignals(entry.bookTitle ?? entry.title, signals);
    if (score >= MATCH_RULES.candidates.titleMinScore) {
      addRankedCandidate(store, entry.bookTitle ?? entry.title, score, 'review');
    }
  }

  return sortRankedCandidates(store.values(), MATCH_RULES.candidates.titleLimit);
}

function buildAuthorCandidates(params: {
  selectedAuthor?: string;
  selectedAuthorConfidence: number;
  overrideAuthor?: string;
  tesseractAuthor?: string;
  visionAuthor?: string;
  ocrText: string;
  visionLines: VisionOcrLine[];
  knownAuthors: Set<string>;
}): RankedCandidate[] {
  const store = new Map<string, RankedCandidate>();
  const signals = [
    params.selectedAuthor,
    params.tesseractAuthor,
    params.visionAuthor,
    params.ocrText,
    ...params.visionLines.map((line) => line.text),
  ].filter((value): value is string => Boolean(value));

  if (params.selectedAuthor) {
    addRankedCandidate(
      store,
      params.selectedAuthor,
      params.overrideAuthor ? 1 : params.selectedAuthorConfidence,
      params.overrideAuthor ? 'override' : 'ocr'
    );
  }

  for (const author of params.knownAuthors) {
    const score = scoreCandidateAgainstSignals(author, signals);
    if (score >= MATCH_RULES.candidates.authorMinScore) {
      addRankedCandidate(store, author, score, 'known-author');
    }
  }

  return sortRankedCandidates(store.values(), MATCH_RULES.candidates.authorLimit);
}

function buildSimilarEntryCandidates(
  title: string | undefined,
  author: string | undefined,
  existingGalleryEntries: ExistingGalleryEntry[],
  reviewEntries: ReviewEntry[]
): SimilarEntryCandidate[] {
  if (!title) {
    return [];
  }

  const matches: SimilarEntryCandidate[] = [];

  for (const entry of existingGalleryEntries) {
    const titleScore = calculateSimilarity(title, entry.title);
    const authorScore = author && entry.author ? calculateSimilarity(author, entry.author) : 0;
    const exact = normalizeForComparison(title) === normalizeForComparison(entry.title) &&
      (!author || normalizeForComparison(author) === normalizeForComparison(entry.author));
    const score = author
      ? roundConfidence(titleScore * 0.72 + authorScore * 0.28)
      : titleScore;

    if (!exact && score < MATCH_RULES.candidates.similarEntryMinScore) {
      continue;
    }

    matches.push({
      kind: 'gallery',
      path: entry.path,
      slug: entry.slug,
      title: entry.title,
      author: entry.author,
      score: exact ? 1 : score,
      titleScore,
      authorScore,
      exact,
    });
  }

  for (const entry of reviewEntries) {
    const reviewTitle = entry.bookTitle ?? entry.title;
    const titleScore = calculateSimilarity(title, reviewTitle);
    const authorScore = author && entry.author ? calculateSimilarity(author, entry.author) : 0;
    const exact = normalizeForComparison(title) === normalizeForComparison(reviewTitle) &&
      (!author || normalizeForComparison(author) === normalizeForComparison(entry.author));
    const score = author
      ? roundConfidence(titleScore * 0.72 + authorScore * 0.28)
      : titleScore;

    if (!exact && score < MATCH_RULES.candidates.similarEntryMinScore) {
      continue;
    }

    matches.push({
      kind: 'review',
      path: entry.path,
      slug: entry.slug,
      title: reviewTitle,
      author: entry.author,
      score: exact ? 1 : score,
      titleScore,
      authorScore,
      published: entry.published,
      exact,
    });
  }

  return matches
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      if (right.titleScore !== left.titleScore) {
        return right.titleScore - left.titleScore;
      }

      return left.kind.localeCompare(right.kind);
    })
    .slice(0, MATCH_RULES.candidates.similarLimit);
}

function findStrongSimilarGalleryEntry(similarEntries: SimilarEntryCandidate[]): SimilarEntryCandidate | undefined {
  return similarEntries.find((entry) => {
    return entry.kind === 'gallery' &&
      !entry.exact &&
      entry.score >= MATCH_RULES.review.strongSimilar.score &&
      entry.titleScore >= MATCH_RULES.review.strongSimilar.title &&
      entry.authorScore >= MATCH_RULES.review.strongSimilar.author;
  });
}

function findExactSimilarGalleryEntry(similarEntries: SimilarEntryCandidate[]): SimilarEntryCandidate | undefined {
  return similarEntries.find((entry) => entry.kind === 'gallery' && entry.exact && Boolean(entry.author));
}

function buildWebFactCheckDuplicateCandidate(
  probableDuplicate: DuplicateMatch | undefined,
  strongSimilarGalleryEntry: SimilarEntryCandidate | undefined,
  exactSimilarGalleryEntry: SimilarEntryCandidate | undefined,
  metadata: MetadataCandidate
): WebFactCheckDuplicateCandidate | undefined {
  if (probableDuplicate?.entry.author) {
    return {
      path: probableDuplicate.entry.path,
      title: probableDuplicate.entry.title,
      author: probableDuplicate.entry.author,
      score: probableDuplicate.score,
      reason: 'probable-duplicate',
    };
  }

  if (
    exactSimilarGalleryEntry?.kind === 'gallery' &&
    exactSimilarGalleryEntry.author &&
    findRankedCandidateScore(exactSimilarGalleryEntry.title, metadata.titleCandidates) >=
      MATCH_RULES.webFactCheck.exactSimilarTitleCandidateScore &&
    findRankedCandidateScore(exactSimilarGalleryEntry.author, metadata.authorCandidates) >=
      MATCH_RULES.webFactCheck.exactSimilarAuthorCandidateScore
  ) {
    return {
      path: exactSimilarGalleryEntry.path,
      title: exactSimilarGalleryEntry.title,
      author: exactSimilarGalleryEntry.author,
      score: exactSimilarGalleryEntry.score,
      reason: 'exact-similar',
    };
  }

  if (strongSimilarGalleryEntry?.kind === 'gallery' && strongSimilarGalleryEntry.author) {
    return {
      path: strongSimilarGalleryEntry.path,
      title: strongSimilarGalleryEntry.title,
      author: strongSimilarGalleryEntry.author,
      score: strongSimilarGalleryEntry.score,
      reason: 'strong-similar',
    };
  }

  return undefined;
}

function shouldRunWebFactCheck(
  metadata: MetadataCandidate,
  duplicateCandidate: WebFactCheckDuplicateCandidate | undefined
): boolean {
  const hasCandidateSignals =
    metadata.titleCandidates.length > 0 ||
    metadata.authorCandidates.length > 0 ||
    metadata.similarEntries.length > 0;
  const minimumOcrConfidence =
    duplicateCandidate?.reason === 'exact-similar'
      ? MATCH_RULES.webFactCheck.minExactSimilarOcrConfidence
      : MATCH_RULES.webFactCheck.minOcrConfidence;

  if (!hasCandidateSignals || metadata.ocrConfidence < minimumOcrConfidence) {
    return false;
  }

  if (duplicateCandidate?.author) {
    return true;
  }

  return Boolean(
    metadata.title &&
      metadata.author &&
      metadata.titleConfidence >= MATCH_RULES.webFactCheck.minMetadataTitleConfidence &&
      metadata.authorConfidence >= MATCH_RULES.webFactCheck.minMetadataAuthorConfidence
  );
}

function applyWebFactCheckMetadataBoost(metadata: MetadataCandidate): void {
  const metadataMatch = metadata.webFactCheck?.metadata;
  if (!metadataMatch?.confirmed) {
    return;
  }

  metadata.warnings.push(
    `web fact-check が ${metadataMatch.sourceCount} ソース (${metadataMatch.trustedSourceCount} trusted) で title/author を裏取りしました。`
  );

  if (
    metadata.titleConfidence < MATCH_RULES.webFactCheck.minMetadataTitleConfidence ||
    metadata.authorConfidence < MATCH_RULES.webFactCheck.minMetadataAuthorConfidence
  ) {
    metadata.warnings.push('web fact-check は一致しましたが、OCR の基礎信号が弱いため自動加点は行いませんでした。');
    return;
  }

  const nextTitleConfidence = roundConfidence(
    Math.max(metadata.titleConfidence, MATCH_RULES.import.title + MATCH_RULES.webFactCheck.importConfidenceMargin)
  );
  const nextAuthorConfidence = roundConfidence(
    Math.max(metadata.authorConfidence, MATCH_RULES.import.author + MATCH_RULES.webFactCheck.importConfidenceMargin)
  );

  if (nextTitleConfidence === metadata.titleConfidence && nextAuthorConfidence === metadata.authorConfidence) {
    return;
  }

  metadata.titleConfidence = nextTitleConfidence;
  metadata.authorConfidence = nextAuthorConfidence;
  metadata.overallConfidence = computeOverallConfidence({
    titleConfidence: metadata.titleConfidence,
    authorConfidence: metadata.authorConfidence,
    genreConfidence: metadata.genreConfidence,
    descriptionConfidence: metadata.descriptionConfidence,
    altConfidence: metadata.altConfidence,
  });
  metadata.warnings.push('web fact-check により import 閾値直下の title/author confidence を限定的に補強しました。');
}

function resolveWebFactCheckedDuplicate(
  metadata: MetadataCandidate,
  probableDuplicate: DuplicateMatch | undefined,
  strongSimilarGalleryEntry: SimilarEntryCandidate | undefined,
  exactSimilarGalleryEntry: SimilarEntryCandidate | undefined,
  existingGalleryEntries: ExistingGalleryEntry[]
): DuplicateMatch | undefined {
  const confirmedDuplicate = metadata.webFactCheck?.duplicate;
  if (!confirmedDuplicate?.confirmed) {
    return undefined;
  }

  if (probableDuplicate && probableDuplicate.entry.path === confirmedDuplicate.path) {
    return probableDuplicate;
  }

  if (
    strongSimilarGalleryEntry?.kind === 'gallery' &&
    strongSimilarGalleryEntry.path === confirmedDuplicate.path
  ) {
    const entry = existingGalleryEntries.find((candidate) => candidate.path === strongSimilarGalleryEntry.path);
    if (!entry) {
      return undefined;
    }

    return {
      entry,
      kind: 'fact-check',
      score: roundConfidence(strongSimilarGalleryEntry.score),
      titleCandidateScore: findRankedCandidateScore(entry.title, metadata.titleCandidates),
      authorCandidateScore: findRankedCandidateScore(entry.author, metadata.authorCandidates),
      titleBigramRatio: calculateSharedBigramRatio(entry.title, metadata.ocrText),
    };
  }

  if (exactSimilarGalleryEntry?.kind === 'gallery' && exactSimilarGalleryEntry.path === confirmedDuplicate.path) {
    const entry = existingGalleryEntries.find((candidate) => candidate.path === exactSimilarGalleryEntry.path);
    if (!entry) {
      return undefined;
    }

    return {
      entry,
      kind: 'fact-check',
      score: 1,
      titleCandidateScore: findRankedCandidateScore(entry.title, metadata.titleCandidates),
      authorCandidateScore: findRankedCandidateScore(entry.author, metadata.authorCandidates),
      titleBigramRatio: calculateSharedBigramRatio(entry.title, metadata.ocrText),
    };
  }

  return undefined;
}

function formatStatus(status: ProcessedImageResult['status']): 'created' | 'duplicate' | 'manual-review' | 'error' {
  return status === 'imported' ? 'created' : status;
}

function formatOverrideSummary(cliOptions: CliOptions): string {
  const fields = Object.entries(cliOptions.overrides)
    .filter(([, value]) => value !== undefined)
    .map(([field]) => field);

  if (fields.length === 0) {
    return 'no';
  }

  return `yes (${fields.join(', ')})`;
}

function buildValidationCommand(command: string, args: string[]): ValidationResult {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    encoding: 'utf8',
    stdio: 'pipe',
  });

  return {
    command: [command, ...args].join(' '),
    success: result.status === 0,
    exitCode: result.status,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
  };
}

function formatCommandOutput(output: string): string {
  const trimmed = output.replace(/\u001b\[[0-9;]*m/g, '').trim();
  if (!trimmed) {
    return '_no output_';
  }

  return ['```text', trimmed, '```'].join('\n');
}

function formatConfidenceRow(label: string, value: number): string {
  return `| ${label} | ${value.toFixed(3)} |`;
}

function buildCliOptions(args: string[]): CliOptions {
  const cliOptions: CliOptions = {
    dryRun: false,
    overrides: {},
    rawArgs: [...args],
  };

  for (let index = 0; index < args.length; index += 1) {
    const current = args[index];

    const readValue = (flag: string): string => {
      if (current.startsWith(`${flag}=`)) {
        const inlineValue = current.slice(flag.length + 1);
        if (!inlineValue) {
          throw new Error(`${flag} には値が必要です。`);
        }
        return inlineValue;
      }

      const next = args[index + 1];
      if (!next || next.startsWith('--')) {
        throw new Error(`${flag} には値が必要です。`);
      }

      index += 1;
      return next;
    };

    if (current === '--help') {
      throw new Error(
        'Usage: npm run gallery:import -- [--dry-run] [--report-json <path>] [--file <path>] [--title <title>] [--author <author>] [--genre <小説|ビジネス|歴史>]'
      );
    }

    if (current === '--dry-run') {
      cliOptions.dryRun = true;
      continue;
    }

    if (current === '--report-json' || current.startsWith('--report-json=')) {
      cliOptions.reportJsonPath = path.resolve(readValue('--report-json'));
      continue;
    }

    if (current === '--file' || current.startsWith('--file=')) {
      cliOptions.targetFile = path.resolve(readValue('--file'));
      continue;
    }

    if (current === '--title' || current.startsWith('--title=')) {
      cliOptions.overrides.title = sanitizeOverrideValue(readValue('--title'));
      continue;
    }

    if (current === '--author' || current.startsWith('--author=')) {
      cliOptions.overrides.author = sanitizeOverrideValue(readValue('--author'));
      continue;
    }

    if (current === '--genre' || current.startsWith('--genre=')) {
      const rawGenre = sanitizeOverrideValue(readValue('--genre'));
      if (!rawGenre) {
        throw new Error('--genre には値が必要です。');
      }

      if (!GALLERY_GENRES.includes(rawGenre as GalleryGenre)) {
        throw new Error(`--genre は ${GALLERY_GENRES.join(' / ')} のいずれかを指定してください。`);
      }

      cliOptions.overrides.genre = rawGenre as GalleryGenre;
      continue;
    }

    throw new Error(`未対応の引数です: ${current}`);
  }

  const overrideFields = Object.values(cliOptions.overrides).filter((value) => value !== undefined);
  if (!cliOptions.targetFile && overrideFields.length > 0) {
    throw new Error('title / author / genre の override は --file と一緒に指定してください。');
  }

  return cliOptions;
}

function formatRankedCandidates(candidates: RankedCandidate[]): string[] {
  if (candidates.length === 0) {
    return ['- なし'];
  }

  return candidates.map((candidate, index) => {
    return `- ${index + 1}. ${candidate.value} (score: ${candidate.score.toFixed(3)}, source: ${candidate.sources.join(', ')})`;
  });
}

function formatSimilarEntries(similarEntries: SimilarEntryCandidate[]): string[] {
  if (similarEntries.length === 0) {
    return ['- なし'];
  }

  return similarEntries.map((candidate) => {
    const typeLabel = candidate.kind === 'gallery' ? 'gallery' : `review${candidate.published === false ? ' (draft)' : ''}`;
    const authorLabel = candidate.author ? ` / ${candidate.author}` : '';
    const exactLabel = candidate.exact ? ' / exact' : '';
    return `- [${typeLabel}] ${candidate.title}${authorLabel} (score: ${candidate.score.toFixed(3)}, title: ${candidate.titleScore.toFixed(3)}, author: ${candidate.authorScore.toFixed(3)}${exactLabel}) -> ${toRelativeReportPath(candidate.path)}`;
  });
}

function formatWebFactCheck(webFactCheck: WebFactCheckResult | undefined): string[] {
  if (!webFactCheck) {
    return ['- 未実行'];
  }

  const lines = [
    `- Attempted: ${webFactCheck.attempted ? 'yes' : 'no'}${webFactCheck.skippedReason ? ` (${webFactCheck.skippedReason})` : ''}`,
  ];

  if (webFactCheck.duplicate?.confirmed) {
    lines.push(
      `- Duplicate corroborated: ${webFactCheck.duplicate.sourceCount} sources (${webFactCheck.duplicate.trustedSourceCount} trusted) -> ${toRelativeReportPath(webFactCheck.duplicate.path)}`
    );
  }

  if (webFactCheck.metadata?.confirmed) {
    lines.push(
      `- Metadata corroborated: ${webFactCheck.metadata.title} / ${webFactCheck.metadata.author} (${webFactCheck.metadata.sourceCount} sources, ${webFactCheck.metadata.trustedSourceCount} trusted)`
    );
  }

  if (webFactCheck.queries.length > 0) {
    lines.push(`- Queries: ${webFactCheck.queries.join(' | ')}`);
  }

  if (webFactCheck.sources.length > 0) {
    for (const source of webFactCheck.sources) {
      lines.push(
        `- Source: [${source.sourceType}] ${source.domain} / ${source.title} (title: ${source.titleMatchScore.toFixed(3)}, author: ${source.authorMatchScore.toFixed(3)})`
      );
    }
  }

  if (webFactCheck.warnings.length > 0) {
    for (const warning of webFactCheck.warnings) {
      lines.push(`- Warning: ${warning}`);
    }
  }

  return lines;
}

function buildNextAction(result: ProcessedImageResult): string {
  switch (result.status) {
    case 'imported':
      return '生成された draft markdown を確認し、genre・description・alt・needs_review をレビューしてから公開判定に進んでください。';
    case 'duplicate':
      return '既存 entry を確認してください。同一書籍なら inbox 画像は不要です。別書籍なら title/author を補正して --file 指定で再実行してください。';
    case 'manual-review':
      return '候補と frontmatter template を見て補正してください。必要なら --file と override を付けて単体再実行すると復旧が速いです。';
    case 'error':
      return 'エラー原因を修正し、同じ --file 指定で再実行してください。';
    default:
      return 'レポート内容を確認してください。';
  }
}

function buildSuggestedOverrideCommand(result: ProcessedImageResult): string {
  const filePath = toRelativeReportPath(result.sourcePath);
  const title = result.metadata.title ?? '<TITLE>';
  const author = result.metadata.author ?? '<AUTHOR>';
  const parts = [
    'npm run gallery:import --',
    `--file ${quote(filePath)}`,
    `--title ${quote(title)}`,
    `--author ${quote(author)}`,
  ];

  if (result.metadata.genre) {
    parts.push(`--genre ${quote(result.metadata.genre)}`);
  }

  return parts.join(' ');
}

function buildFrontmatterTemplate(result: ProcessedImageResult): string {
  const fallbackAssetName = basename(result.sourcePath);
  const sourceFile = result.importPlan?.sourceFile ?? `gallery/books/${fallbackAssetName}`;
  const imagePublicPath = result.importPlan?.imagePublicPath ?? `/uploads/gallery/books/${fallbackAssetName}`;
  const lines = [
    '---',
    `title: ${result.metadata.title ? quote(result.metadata.title) : '"<タイトルを入力>"'}`,
    `image: ${quote(imagePublicPath)}`,
    `alt: ${result.metadata.alt ? quote(result.metadata.alt) : '"<alt を入力>"'}`,
    `genre: ${result.metadata.genre ? quote(result.metadata.genre) : '"<小説 | ビジネス | 歴史>"'}`,
    `author: ${result.metadata.author ? quote(result.metadata.author) : '"<著者を入力>"'}`,
    `description: ${result.metadata.description ? quote(result.metadata.description) : '"<紹介文を入力>"'}`,
    'needs_review: true',
    `generated_at: ${quote(new Date().toISOString())}`,
    `source_file: ${quote(sourceFile)}`,
  ];

  if (result.metadata.relatedReview) {
    lines.push(`relatedReview: ${quote(result.metadata.relatedReview)}`);
  }

  lines.push('published: false', '---');

  return ['```yaml', ...lines, '```'].join('\n');
}

async function analyzeImage(
  imagePath: string,
  existingGalleryEntries: ExistingGalleryEntry[],
  reviewEntries: ReviewEntry[],
  knownAuthors: Set<string>,
  authorGenreMap: Map<string, GalleryGenre>,
  visionAvailable: boolean,
  cliOptions: CliOptions
): Promise<MetadataCandidate> {
  const sourceStem = basename(imagePath, extname(imagePath));
  const sourceFileHint = `gallery/books/${basename(imagePath)}`;
  const manifest = await extractGalleryMetadata(
    imagePath,
    `/uploads/${sourceFileHint}`,
    sourceFileHint
  );

  const warnings: string[] = [];
  const scannersUsed = ['tesseract'];
  const visionLines = visionAvailable ? await extractVisionOcrLines(imagePath) : [];

  if (visionLines.length > 0) {
    scannersUsed.push('vision');
  } else if (visionAvailable) {
    warnings.push('Vision OCR は利用可能でしたが、この画像では有効なテキストを取得できませんでした。');
  }

  const overrideFields = (['title', 'author', 'genre'] as OverrideField[]).filter((field) => {
    return cliOptions.overrides[field] !== undefined;
  });
  const tesseractTitle = sanitizeTitleValue(manifest.title, sourceStem);
  const tesseractAuthor = sanitizeAuthorValue(manifest.author);
  const visionAuthor = extractAuthorFromVisionLines(visionLines, knownAuthors);
  const overrideTitle = sanitizeOverrideValue(cliOptions.overrides.title);
  const overrideAuthor = sanitizeAuthorValue(cliOptions.overrides.author);
  const overrideGenre = cliOptions.overrides.genre;
  const selectedAuthor =
    overrideAuthor ??
    (visionAuthor.value && visionAuthor.confidence >= (manifest.author_confidence ?? 0)
      ? visionAuthor.value
      : tesseractAuthor);
  const authorConfidence = overrideAuthor
    ? 1
    : selectedAuthor === visionAuthor.value
      ? visionAuthor.confidence
      : roundConfidence(manifest.author_confidence ?? 0);
  const selectedTitle = overrideTitle ?? tesseractTitle;
  const titleConfidence = overrideTitle ? 1 : selectedTitle ? roundConfidence(manifest.title_confidence ?? 0.62) : 0;
  const genreCandidate = overrideGenre
    ? { genre: overrideGenre, confidence: 1 }
    : inferGenreCandidate(manifest.genre, selectedAuthor, authorGenreMap);
  const reviewMatch = findMatchingReview(selectedTitle, selectedAuthor, reviewEntries);
  const descriptionSeed = selectedTitle && selectedAuthor
    ? reviewMatch?.description ??
      reviewMatch?.excerpt ??
      buildDescription(selectedTitle, selectedAuthor, genreCandidate.genre).value
    : undefined;
  const descriptionConfidence = !descriptionSeed
    ? 0
    : reviewMatch?.description || reviewMatch?.excerpt
      ? 0.92
      : buildDescription(selectedTitle!, selectedAuthor!, genreCandidate.genre).confidence;
  const altSeed = selectedTitle && selectedAuthor ? buildAltText(selectedTitle, selectedAuthor).value : undefined;
  const altConfidence = altSeed ? buildAltText(selectedTitle!, selectedAuthor!).confidence : 0;
  const existingTitlesByAuthor = selectedAuthor
    ? existingGalleryEntries
        .filter((entry) => normalizeForComparison(entry.author) === normalizeForComparison(selectedAuthor))
        .map((entry) => entry.title)
    : [];
  const ocrCandidateStrings = buildOcrCandidateStrings(manifest.ocr_text, visionLines, selectedTitle, selectedAuthor);
  const titleCandidates = buildTitleCandidates({
    selectedTitle,
    selectedTitleConfidence: titleConfidence,
    overrideTitle,
    ocrText: manifest.ocr_text,
    visionLines,
    selectedAuthor,
    selectedGenre: genreCandidate.genre,
    existingGalleryEntries,
    reviewEntries,
  });
  const authorCandidates = buildAuthorCandidates({
    selectedAuthor,
    selectedAuthorConfidence: authorConfidence,
    overrideAuthor,
    tesseractAuthor,
    visionAuthor: visionAuthor.value,
    ocrText: manifest.ocr_text,
    visionLines,
    knownAuthors,
  });
  const similarEntries = buildSimilarEntryCandidates(
    selectedTitle ?? titleCandidates[0]?.value,
    selectedAuthor ?? authorCandidates[0]?.value,
    existingGalleryEntries,
    reviewEntries
  );
  const strongSimilarGalleryEntry = findStrongSimilarGalleryEntry(similarEntries);

  if (overrideFields.length > 0) {
    warnings.push(`CLI override を使用しました: ${overrideFields.join(', ')}`);
  }

  if (!selectedTitle) {
    warnings.push('タイトル候補の確信が足りないため、自動取り込みは保留候補です。');
  } else if (overrideTitle && !tesseractTitle) {
    warnings.push('OCR で title を確定できなかったため、CLI override の title を採用しました。');
  }

  if (!selectedAuthor) {
    warnings.push('著者名を十分な確信で抽出できませんでした。');
  } else if (overrideAuthor && !tesseractAuthor && !visionAuthor.value) {
    warnings.push('OCR で author を確定できなかったため、CLI override の author を採用しました。');
  }

  if (!genreCandidate.genre) {
    warnings.push('genre 候補を自動確定できませんでした。');
  } else if (overrideGenre) {
    warnings.push(`CLI override の genre を採用しました: ${overrideGenre}`);
  }

  if (strongSimilarGalleryEntry) {
    warnings.push(
      `既存 gallery に表記揺れを含む類似候補があります: ${strongSimilarGalleryEntry.title}${strongSimilarGalleryEntry.author ? ` / ${strongSimilarGalleryEntry.author}` : ''}`
    );
  }

  // 複数冊検出
  const multiBookDetection = detectMultipleBooksIndicators(visionLines);
  if (multiBookDetection.detected) {
    warnings.push(`複数冊の可能性: ${multiBookDetection.indicators.join(', ')}`);
  }

  return {
    title: selectedTitle,
    titleConfidence,
    author: selectedAuthor,
    authorConfidence,
    genre: genreCandidate.genre,
    genreConfidence: genreCandidate.confidence,
    description: descriptionSeed,
    descriptionConfidence: roundConfidence(descriptionConfidence),
    alt: altSeed,
    altConfidence: roundConfidence(altConfidence),
    relatedReview: reviewMatch?.published ? reviewMatch.slug : undefined,
    relatedReviewTitle: reviewMatch?.published ? reviewMatch.title : undefined,
    ocrConfidence: roundConfidence(manifest.ocr_confidence),
    ocrText: manifest.ocr_text,
    overallConfidence: computeOverallConfidence({
      titleConfidence,
      authorConfidence,
      genreConfidence: genreCandidate.confidence,
      descriptionConfidence: roundConfidence(descriptionConfidence),
      altConfidence: roundConfidence(altConfidence),
    }),
    warnings,
    existingTitlesByAuthor,
    scannersUsed,
    ocrCandidateStrings,
    titleCandidates,
    authorCandidates,
    similarEntries,
    overrideFields,
    multiBookIndicators: multiBookDetection.detected ? multiBookDetection.indicators : undefined,
  };
}

function buildReport(context: ReportContext): string {
  const importedCount = context.results.filter((result) => result.status === 'imported').length;
  const duplicateCount = context.results.filter((result) => result.status === 'duplicate').length;
  const manualReviewCount = context.results.filter((result) => result.status === 'manual-review').length;
  const errorCount = context.results.filter((result) => result.status === 'error').length;
  const finishedAt = context.finishedAt ?? new Date().toISOString();
  const lines: string[] = [
    '# Gallery Import Report',
    '',
    `- Started: ${context.startedAt}`,
    `- Finished: ${finishedAt}`,
    `- Vision OCR available: ${context.visionAvailable ? 'yes' : 'no'}`,
    `- Mode: ${context.cliOptions.targetFile ? 'single-file' : 'batch'}`,
    `- Dry run: ${context.cliOptions.dryRun ? 'yes' : 'no'}`,
    `- Override mode: ${formatOverrideSummary(context.cliOptions)}`,
    `- Supported images scanned: ${context.scannedFiles.length}`,
    `- Unsupported files skipped: ${context.unsupportedFiles.length}`,
    `- Created: ${importedCount}`,
    `- Duplicates: ${duplicateCount}`,
    `- Manual review: ${manualReviewCount}`,
    `- Errors: ${errorCount}`,
    '',
    '## Immediate Actions',
    '',
  ];

  if (context.results.length === 0) {
    lines.push('- 対象結果はありません。', '');
  } else {
    for (const result of context.results) {
      lines.push(`- ${toRelativeReportPath(result.sourcePath)} -> ${formatStatus(result.status)}: ${buildNextAction(result)}`);
    }
    lines.push('');
  }

  lines.push('## Files', '');

  if (context.scannedFiles.length === 0 && context.unsupportedFiles.length === 0) {
    lines.push('対象ファイルは見つかりませんでした。', '');
  } else {
    for (const filePath of context.scannedFiles) {
      lines.push(`- ${toRelativeReportPath(filePath)}`);
    }

    for (const filePath of context.unsupportedFiles) {
      lines.push(`- ${toRelativeReportPath(filePath)} (unsupported)`);
    }

    lines.push('');
  }

  lines.push('## Results', '');

  if (context.results.length === 0) {
    lines.push('処理結果はありません。', '');
  } else {
    for (const result of context.results) {
      lines.push(`### ${toRelativeReportPath(result.sourcePath)}`, '');
      lines.push(`- Result: ${formatStatus(result.status)}`);
      lines.push(`- Relative path: ${toRelativeReportPath(result.sourcePath)}`);
      lines.push(`- Source handling: ${result.sourceHandling}`);
      lines.push(`- Override mode: ${result.metadata.overrideFields.length > 0 ? `yes (${result.metadata.overrideFields.join(', ')})` : 'no'}`);
      lines.push(`- Next action: ${buildNextAction(result)}`);

      if (result.destinationImagePath) {
        lines.push(`- Image: ${toRelativeReportPath(result.destinationImagePath)}`);
      } else if (result.importPlan) {
        lines.push(`- Proposed image path: ${toRelativeReportPath(result.importPlan.destinationImagePath)}`);
      }

      if (result.destinationMarkdownPath) {
        lines.push(`- Entry: ${toRelativeReportPath(result.destinationMarkdownPath)}`);
      } else if (result.importPlan) {
        lines.push(`- Proposed entry path: ${toRelativeReportPath(result.importPlan.destinationMarkdownPath)}`);
      }

      if (result.duplicatePath) {
        lines.push(`- Duplicate entry: ${toRelativeReportPath(result.duplicatePath)}`);
      }

      if (result.errorMessage) {
        lines.push(`- Error: ${result.errorMessage}`);
      }

      if (result.metadata.relatedReview && result.metadata.relatedReviewTitle) {
        lines.push(`- Related review: ${result.metadata.relatedReview} (${result.metadata.relatedReviewTitle})`);
      }

      if (result.metadata.scannersUsed.length > 0) {
        lines.push(`- OCR engines: ${result.metadata.scannersUsed.join(', ')}`);
      }

      if (result.metadata.existingTitlesByAuthor.length > 0) {
        lines.push(`- Existing titles by author: ${result.metadata.existingTitlesByAuthor.join(' / ')}`);
      }

      lines.push(
        '',
        '#### Ranked Candidates',
        '',
        'Title candidates:',
        ...formatRankedCandidates(result.metadata.titleCandidates),
        '',
        'Author candidates:',
        ...formatRankedCandidates(result.metadata.authorCandidates),
        ''
      );

      lines.push('#### Similar Existing Entries', '', ...formatSimilarEntries(result.metadata.similarEntries), '');
      lines.push('#### Web Fact Check', '', ...formatWebFactCheck(result.metadata.webFactCheck), '');

      lines.push(
        '#### Confidence',
        '',
        '| Metric | Confidence |',
        '| --- | ---: |',
        formatConfidenceRow('overall', result.metadata.overallConfidence),
        formatConfidenceRow('title', result.metadata.titleConfidence),
        formatConfidenceRow('author', result.metadata.authorConfidence),
        formatConfidenceRow('genre', result.metadata.genreConfidence),
        formatConfidenceRow('description', result.metadata.descriptionConfidence),
        formatConfidenceRow('alt', result.metadata.altConfidence),
        formatConfidenceRow('ocr', result.metadata.ocrConfidence),
        ''
      );

      lines.push('#### OCR Candidate Strings', '');
      if (result.metadata.ocrCandidateStrings.length === 0) {
        lines.push('- なし', '');
      } else {
        for (const candidate of result.metadata.ocrCandidateStrings) {
          lines.push(`- ${candidate}`);
        }
        lines.push('');
      }

      // 複数冊検出情報
      if (result.metadata.multiBookIndicators && result.metadata.multiBookIndicators.length > 0) {
        lines.push('#### Multiple Books Detection', '');
        lines.push('この画像は複数冊の書籍が含まれている可能性があります。', '');
        for (const indicator of result.metadata.multiBookIndicators) {
          lines.push(`- ${indicator}`);
        }
        lines.push('', '**推奨アクション**: 各書籍を個別に切り抜いてインポートしてください。', '');
      }

      // duplicate 判定の詳細
      if (result.status === 'duplicate' && result.duplicatePath) {
        lines.push('#### Duplicate Detection Details', '');
        const duplicateMatch = result.metadata.similarEntries.find((e) => e.path === result.duplicatePath);
        if (duplicateMatch) {
          lines.push(`- Match type: ${duplicateMatch.exact ? 'exact' : 'fuzzy'}`);
          lines.push(`- Title score: ${duplicateMatch.titleScore.toFixed(3)}`);
          lines.push(`- Author score: ${duplicateMatch.authorScore.toFixed(3)}`);
          lines.push(`- Overall score: ${duplicateMatch.score.toFixed(3)}`);
        }
        lines.push('');
      }

      // 判定理由の要約
      lines.push('#### Decision Summary', '');
      if (result.status === 'manual-review') {
        const reasons: string[] = [];
        if (!result.metadata.title) reasons.push('タイトル未確定');
        if (!result.metadata.author) reasons.push('著者未確定');
        if (result.metadata.titleConfidence < MATCH_RULES.import.title)
          reasons.push(`タイトル信頼度不足 (${result.metadata.titleConfidence.toFixed(3)} < ${MATCH_RULES.import.title})`);
        if (result.metadata.authorConfidence < MATCH_RULES.import.author)
          reasons.push(`著者信頼度不足 (${result.metadata.authorConfidence.toFixed(3)} < ${MATCH_RULES.import.author})`);
        if (result.metadata.multiBookIndicators?.length) reasons.push('複数冊の可能性');
        lines.push(`手動レビュー理由: ${reasons.length > 0 ? reasons.join(', ') : '不明'}`, '');
      } else if (result.status === 'duplicate') {
        lines.push(`既存エントリとの重複として処理されました。`, '');
      } else if (result.status === 'imported') {
        lines.push(`自動インポートされました。`, '');
      }

      lines.push('#### Suggested Override Command', '', '```sh', buildSuggestedOverrideCommand(result), '```', '');
      lines.push('#### Frontmatter Template', '', buildFrontmatterTemplate(result), '');

      if (result.metadata.warnings.length > 0) {
        lines.push('#### Warnings', '');
        for (const warning of result.metadata.warnings) {
          lines.push(`- ${warning}`);
        }
        lines.push('');
      }

      if (result.metadata.ocrText) {
        lines.push('#### OCR Text Excerpt', '', '```text', result.metadata.ocrText.slice(0, 600), '```', '');
      }
    }
  }

  lines.push('## Validation', '');

  if (context.validations.length === 0) {
    lines.push('検証コマンドは未実行です。', '');
  } else {
    for (const validation of context.validations) {
      lines.push(`### ${validation.command}`, '');
      lines.push(`- Success: ${validation.success ? 'yes' : 'no'}`);
      lines.push(`- Exit code: ${validation.exitCode ?? 'null'}`, '');
      lines.push('#### stdout', '', formatCommandOutput(validation.stdout), '', '#### stderr', '', formatCommandOutput(validation.stderr), '');
    }
  }

  if (context.fatalError) {
    lines.push('## Fatal Error', '', context.fatalError, '');
  }

  return `${lines.join('\n')}\n`;
}

function writeReportOutputs(context: ReportContext): void {
  writeFileSync(REPORT_PATH, buildReport(context));

  if (!context.cliOptions.reportJsonPath) {
    return;
  }

  mkdirSync(path.dirname(context.cliOptions.reportJsonPath), { recursive: true });
  writeFileSync(context.cliOptions.reportJsonPath, `${JSON.stringify(context, null, 2)}\n`);
}

async function main(): Promise<number> {
  mkdirSync(TARGET_DIR, { recursive: true });
  mkdirSync(GALLERY_DIR, { recursive: true });
  mkdirSync(path.dirname(REPORT_PATH), { recursive: true });

  const reportContext: ReportContext = {
    startedAt: new Date().toISOString(),
    visionAvailable: canUseVisionOcr(),
    scannedFiles: [],
    unsupportedFiles: [],
    results: [],
    validations: [],
    cliOptions: {
      dryRun: false,
      overrides: {},
      rawArgs: process.argv.slice(2),
    },
  };

  try {
    const cliOptions = buildCliOptions(process.argv.slice(2));
    reportContext.cliOptions = cliOptions;
    if (cliOptions.targetFile) {
      assertTargetFileIsInsideInbox(cliOptions.targetFile);
    }

    const existingGalleryEntries = readExistingGalleryEntries();
    const reviewEntries = readReviewEntries();
    const knownAuthors = buildKnownAuthorSet(existingGalleryEntries, reviewEntries);
    const authorGenreMap = buildAuthorGenreMap(existingGalleryEntries);
    const allFiles = cliOptions.targetFile
      ? [cliOptions.targetFile]
      : walkFiles(INBOX_DIR).filter((filePath) => !basename(filePath).startsWith('.'));

    const scannedFiles = allFiles.filter((filePath) => SUPPORTED_EXTENSIONS.has(extname(filePath).toLowerCase()));
    const unsupportedFiles = allFiles.filter((filePath) => !SUPPORTED_EXTENSIONS.has(extname(filePath).toLowerCase()));
    reportContext.scannedFiles = scannedFiles;
    reportContext.unsupportedFiles = unsupportedFiles;

    for (const imagePath of scannedFiles) {
      const sourceCanBeMoved = isInboxManagedSourceFile(imagePath);
      const metadata = await analyzeImage(
        imagePath,
        existingGalleryEntries,
        reviewEntries,
        knownAuthors,
        authorGenreMap,
        reportContext.visionAvailable,
        cliOptions
      );
      const importPlan = metadata.title && metadata.author
        ? buildImportPlan(imagePath, metadata.title, metadata.author, metadata.genre)
        : undefined;

      try {
        const exactDuplicate = findExactDuplicateEntry(metadata.title, metadata.author, existingGalleryEntries);
        const probableDuplicate = exactDuplicate
          ? undefined
          : findProbableDuplicateEntry(metadata, existingGalleryEntries);
        const strongSimilarGalleryEntry = findStrongSimilarGalleryEntry(metadata.similarEntries);
        const exactSimilarGalleryEntry = findExactSimilarGalleryEntry(metadata.similarEntries);
        const webFactCheckDuplicateCandidate = buildWebFactCheckDuplicateCandidate(
          probableDuplicate,
          strongSimilarGalleryEntry,
          exactSimilarGalleryEntry,
          metadata
        );

        if (!exactDuplicate && shouldRunWebFactCheck(metadata, webFactCheckDuplicateCandidate)) {
          try {
            metadata.webFactCheck = await runWebFactCheck({
              title: metadata.title,
              author: metadata.author,
              titleConfidence: metadata.titleConfidence,
              authorConfidence: metadata.authorConfidence,
              ocrConfidence: metadata.ocrConfidence,
              titleCandidates: metadata.titleCandidates,
              authorCandidates: metadata.authorCandidates,
              similarEntries: metadata.similarEntries,
              duplicateCandidate: webFactCheckDuplicateCandidate,
            });
            applyWebFactCheckMetadataBoost(metadata);
          } catch (error) {
            metadata.webFactCheck = {
              attempted: false,
              skippedReason: 'runtime-error',
              warnings: [error instanceof Error ? error.message : String(error)],
              queries: [],
              sources: [],
            };
          }
        }

        const factCheckedDuplicate = exactDuplicate
          ? undefined
          : resolveWebFactCheckedDuplicate(
              metadata,
              probableDuplicate,
              strongSimilarGalleryEntry,
              exactSimilarGalleryEntry,
              existingGalleryEntries
            );
        const duplicate = exactDuplicate ?? probableDuplicate?.entry ?? factCheckedDuplicate?.entry;
        if (duplicate) {
          if (probableDuplicate) {
            if (probableDuplicate.kind === 'author-led') {
              metadata.warnings.push(
                `著者候補 (${probableDuplicate.authorCandidateScore.toFixed(3)}) と title の OCR 断片 (${probableDuplicate.titleBigramRatio.toFixed(3)}) から既存 gallery entry に重複寄せしました。`
              );
            } else {
              metadata.warnings.push(
                `title 候補 (${probableDuplicate.titleCandidateScore.toFixed(3)}) と類似既存 entry から既存 gallery entry に重複寄せしました。`
              );
            }
            metadata.warnings.push('duplicate 判定用の緩和閾値で既存 gallery entry に寄せたため、新規作成をスキップしました。');
            if (metadata.webFactCheck?.duplicate?.confirmed && metadata.webFactCheck.duplicate.path === probableDuplicate.entry.path) {
              metadata.warnings.push(
                `web fact-check が ${metadata.webFactCheck.duplicate.sourceCount} ソース (${metadata.webFactCheck.duplicate.trustedSourceCount} trusted) で duplicate 候補を裏取りしました。`
              );
            }
          } else if (factCheckedDuplicate) {
            metadata.warnings.push(
              `類似既存 entry を manual-review に残す代わりに、web fact-check が ${metadata.webFactCheck?.duplicate?.sourceCount ?? 0} ソースで重複を裏取りしたため duplicate として扱いました。`
            );
          } else {
            metadata.warnings.push('同一タイトル・著者の既存 gallery entry があるため、新規作成をスキップしました。');
          }
          reportContext.results.push({
            sourcePath: imagePath,
            sourceHandling: 'retained',
            status: 'duplicate',
            duplicatePath: duplicate.path,
            metadata,
            importPlan,
          });
          continue;
        }

        if (strongSimilarGalleryEntry) {
          reportContext.results.push({
            sourcePath: imagePath,
            sourceHandling: 'retained',
            status: 'manual-review',
            metadata,
            importPlan,
          });
          continue;
        }

        if (!isImportable(metadata) || !metadata.description || !metadata.alt || !importPlan) {
          reportContext.results.push({
            sourcePath: imagePath,
            sourceHandling: 'retained',
            status: 'manual-review',
            metadata,
            importPlan,
          });
          continue;
        }

        const title = metadata.title;
        const author = metadata.author;
        const description = metadata.description;
        const alt = metadata.alt;
        if (!title || !author || !description || !alt) {
          throw new Error('importable metadata lost required fields during narrowing');
        }

        const generatedAt = new Date().toISOString();
        const markdown = renderMarkdown({
          title,
          image: importPlan.imagePublicPath,
          alt,
          genre: metadata.genre,
          author,
          description,
          needsReview: true,
          generatedAt,
          sourceFile: importPlan.sourceFile,
          published: false,
          relatedReview: metadata.relatedReview,
        });

        if (cliOptions.dryRun) {
          reportContext.results.push({
            sourcePath: imagePath,
            sourceHandling: 'retained',
            status: 'imported',
            destinationImagePath: importPlan.destinationImagePath,
            destinationMarkdownPath: importPlan.destinationMarkdownPath,
            metadata,
            importPlan,
          });
          continue;
        }

        if (existsSync(importPlan.destinationImagePath)) {
          throw new Error(`destination image already exists: ${toRelativeReportPath(importPlan.destinationImagePath)}`);
        }

        if (existsSync(importPlan.destinationMarkdownPath)) {
          throw new Error(`destination markdown already exists: ${toRelativeReportPath(importPlan.destinationMarkdownPath)}`);
        }

        copyFileSync(imagePath, importPlan.destinationImagePath);

        try {
          writeFileSync(importPlan.destinationMarkdownPath, markdown);
        } catch (error) {
          unlinkSync(importPlan.destinationImagePath);
          throw error;
        }

        let sourceHandling: SourceHandling = 'retained';
        if (sourceCanBeMoved) {
          unlinkSync(imagePath);
          sourceHandling = 'moved';
        } else {
          metadata.warnings.push('source の realpath が inbox/gallery/ 配下ではないため、元ファイルは保持しました。');
        }

        existingGalleryEntries.push({
          path: importPlan.destinationMarkdownPath,
          slug: basename(importPlan.destinationMarkdownPath, '.md'),
          title,
          author,
          genre: metadata.genre,
          description,
        });
        reportContext.results.push({
          sourcePath: imagePath,
          sourceHandling,
          status: 'imported',
          destinationImagePath: importPlan.destinationImagePath,
          destinationMarkdownPath: importPlan.destinationMarkdownPath,
          metadata,
          importPlan,
        });
      } catch (error) {
        reportContext.results.push({
          sourcePath: imagePath,
          sourceHandling: 'retained',
          status: 'error',
          metadata,
          errorMessage: error instanceof Error ? error.message : String(error),
          importPlan,
        });
      }
    }

    if (!cliOptions.dryRun) {
      reportContext.validations.push(buildValidationCommand('npm', ['run', 'typecheck']));
      reportContext.validations.push(buildValidationCommand('npm', ['run', 'build']));
    }
    reportContext.finishedAt = new Date().toISOString();
    writeReportOutputs(reportContext);

    return reportContext.validations.every((validation) => validation.success) &&
      reportContext.results.every((result) => result.status !== 'error')
      ? 0
      : 1;
  } catch (error) {
    reportContext.fatalError = error instanceof Error ? error.stack ?? error.message : String(error);
    reportContext.finishedAt = new Date().toISOString();
    writeReportOutputs(reportContext);
    return 1;
  }
}

try {
  const exitCode = await main();
  process.exitCode = exitCode;
} finally {
  await terminateOcrWorker();
}
