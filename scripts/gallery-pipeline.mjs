import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  renameSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const DOCS_PATH = path.resolve('docs/gallery-generation.md');
const INBOX_DIR = path.resolve('inbox/gallery');
const GALLERY_DIR = path.resolve('src/content/gallery');
const REVIEWS_DIR = path.resolve('src/content/reviews');
const DATA_DIR = path.resolve('data');
const UPLOADS_DIR = path.resolve('public/uploads/gallery/books');
const MANIFEST_PATH = path.resolve('data/gallery-manifest.json');
const CORRECTIONS_PATH = path.resolve('data/gallery-corrections.json');
const TARGET_IMAGE_PREFIX = '/uploads/gallery/books/';
const TARGET_SOURCE_PREFIX = 'gallery/books/';
const MAX_RENAME_REVIEW_COUNT = 0;
const FRONTMATTER_PATTERN = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/;

function fail(message) {
  throw new Error(`[gallery:pipeline] ${message}`);
}

function parseArgs(args) {
  const options = {
    apply: false,
    dryRun: false,
    pr: false,
    docs: false,
  };

  for (const arg of args) {
    if (arg === '--apply') {
      options.apply = true;
      continue;
    }

    if (arg === '--dry-run') {
      options.dryRun = true;
      continue;
    }

    if (arg === '--pr') {
      options.pr = true;
      continue;
    }

    if (arg === '--docs') {
      options.docs = true;
      continue;
    }

    if (arg === '--help') {
      throw new Error('Usage: npm run gallery:pipeline -- [--dry-run] [--apply] [--pr] [--docs]');
    }

    throw new Error(`未対応の引数です: ${arg}`);
  }

  if (options.apply && options.dryRun) {
    throw new Error('--apply と --dry-run は同時に指定できません。');
  }

  if (!options.apply) {
    options.dryRun = true;
  }

  if (options.pr && !options.apply) {
    throw new Error('--pr は --apply と一緒に指定してください。');
  }

  return options;
}

function runCommand(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? process.cwd(),
    encoding: 'utf8',
    stdio: 'pipe',
  });

  return {
    command: [command, ...args].join(' '),
    ok: result.status === 0,
    status: result.status,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
  };
}

function toRelativePath(filePath) {
  return path.relative(process.cwd(), filePath).split(path.sep).join('/');
}

function parseFrontmatter(content) {
  const match = content.match(FRONTMATTER_PATTERN);
  if (!match) {
    return null;
  }

  return {
    frontmatter: match[1],
    body: match[2],
  };
}

function readScalarField(frontmatter, field) {
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

function serializeScalar(value) {
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  return JSON.stringify(value);
}

function replaceFrontmatterScalar(content, field, value) {
  const parsed = parseFrontmatter(content);
  if (!parsed) {
    fail(`frontmatter が見つかりません: ${content.slice(0, 40)}`);
  }

  const nextLine = `${field}: ${serializeScalar(value)}`;
  const pattern = new RegExp(`^${field}:\\s*.+$`, 'm');
  const nextFrontmatter = pattern.test(parsed.frontmatter)
    ? parsed.frontmatter.replace(pattern, nextLine)
    : `${parsed.frontmatter}\n${nextLine}`;

  return `---\n${nextFrontmatter}\n---\n${parsed.body}`;
}

function readMarkdownFile(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const parsed = parseFrontmatter(content);
  if (!parsed) {
    fail(`frontmatter が見つかりません: ${toRelativePath(filePath)}`);
  }

  return {
    path: filePath,
    content,
    frontmatter: parsed.frontmatter,
    body: parsed.body,
    title: readScalarField(parsed.frontmatter, 'title'),
    author: readScalarField(parsed.frontmatter, 'author'),
    image: readScalarField(parsed.frontmatter, 'image'),
    sourceFile: readScalarField(parsed.frontmatter, 'source_file'),
    published: readScalarField(parsed.frontmatter, 'published'),
  };
}

function slugifyAscii(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .replace(/_+/g, '_');
}

function hasNonAscii(value) {
  return /[^\x20-\x7E]/.test(value);
}

function isPlaceholderValue(value) {
  if (typeof value !== 'string') {
    return false;
  }

  const normalized = value.trim();
  if (!normalized) {
    return true;
  }

  return (
    /^<.+>$/.test(normalized) ||
    /placeholder/i.test(normalized) ||
    /(^|[\s_-])(todo|tbd|sample)([\s_-]|$)/i.test(normalized) ||
    /^(unknown|undecided|unconfirmed)$/i.test(normalized) ||
    /^(不明|未定|仮|サンプル)$/.test(normalized)
  );
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function listMarkdownFiles(directory) {
  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory)
    .filter((entry) => entry.endsWith('.md'))
    .map((entry) => path.join(directory, entry));
}

function listFilesRecursive(directory) {
  if (!existsSync(directory)) {
    return [];
  }

  const entries = readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFilesRecursive(fullPath));
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

function parseGitStatusOutput(raw) {
  return raw
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const status = line.slice(0, 2);
      const rawPath = line.slice(3);
      const nextPath = rawPath.includes(' -> ') ? rawPath.split(' -> ').at(-1) : rawPath;

      return {
        status,
        path: path.resolve(nextPath),
        staged: status[0] !== ' ' && status[0] !== '?',
        dirty: status !== '  ',
      };
    });
}

function getGitStatusInfo() {
  const result = runCommand('git', ['status', '--short'], { cwd: process.cwd() });
  if (!result.ok) {
    return {
      available: false,
      entries: [],
      stagedPaths: new Set(),
      dirtyPaths: new Set(),
    };
  }

  const entries = parseGitStatusOutput(result.stdout);
  return {
    available: true,
    entries,
    stagedPaths: new Set(entries.filter((entry) => entry.staged).map((entry) => entry.path)),
    dirtyPaths: new Set(entries.filter((entry) => entry.dirty).map((entry) => entry.path)),
  };
}

function deriveValidationSummary(report, command) {
  const match = (report.validations ?? []).find((item) => item.command === command);
  if (!match) {
    return 'skipped';
  }

  return match.success ? 'passed' : 'failed';
}

function runImportStep(options) {
  const tempDir = mkdtempSync(path.join(tmpdir(), 'gallery-pipeline-'));
  const reportJsonPath = path.join(tempDir, 'gallery-import-report.json');
  const args = ['scripts/gallery-import.ts', '--report-json', reportJsonPath];

  if (options.dryRun) {
    args.push('--dry-run');
  }

  const commandResult = runCommand('node', args, { cwd: process.cwd() });
  const report = existsSync(reportJsonPath) ? readJson(reportJsonPath) : null;

  if (!report) {
    fail(`gallery:import の report JSON を取得できませんでした: ${reportJsonPath}`);
  }

  return {
    commandResult,
    report,
  };
}

function buildVirtualEntryFromImport(result) {
  if (!result.importPlan) {
    return null;
  }

  return {
    markdownPath: result.importPlan.destinationMarkdownPath,
    title: result.metadata?.title,
    author: result.metadata?.author,
    image: result.importPlan.imagePublicPath,
    sourceFile: result.importPlan.sourceFile,
    published: false,
    virtual: true,
    origin: 'import',
  };
}

function buildActualEntryFromMarkdown(filePath, origin) {
  const entry = readMarkdownFile(filePath);

  return {
    markdownPath: filePath,
    title: typeof entry.title === 'string' ? entry.title : undefined,
    author: typeof entry.author === 'string' ? entry.author : undefined,
    image: typeof entry.image === 'string' ? entry.image : undefined,
    sourceFile: typeof entry.sourceFile === 'string' ? entry.sourceFile : undefined,
    published: entry.published === true,
    virtual: false,
    origin,
  };
}

function collectTargetEntries(importReport, options, gitStatusAfter) {
  const targets = new Map();

  for (const result of importReport.results ?? []) {
    if (result.status !== 'imported') {
      continue;
    }

    if (options.dryRun) {
      const virtualEntry = buildVirtualEntryFromImport(result);
      if (virtualEntry) {
        targets.set(virtualEntry.markdownPath, virtualEntry);
      }
      continue;
    }

    if (result.destinationMarkdownPath && existsSync(result.destinationMarkdownPath)) {
      targets.set(
        result.destinationMarkdownPath,
        buildActualEntryFromMarkdown(result.destinationMarkdownPath, 'import')
      );
    }
  }

  if (gitStatusAfter.available) {
    for (const entry of gitStatusAfter.entries) {
      if (!entry.path.startsWith(GALLERY_DIR) || !entry.path.endsWith('.md') || !existsSync(entry.path)) {
        continue;
      }

      const galleryEntry = buildActualEntryFromMarkdown(entry.path, 'workspace');
      if (galleryEntry.published) {
        continue;
      }

      if (targets.has(galleryEntry.markdownPath)) {
        continue;
      }

      targets.set(galleryEntry.markdownPath, galleryEntry);
    }
  }

  return [...targets.values()].sort((left, right) => left.markdownPath.localeCompare(right.markdownPath));
}

function validateFrontmatter(entries) {
  const blockers = [];

  for (const entry of entries) {
    if (!entry.title) {
      blockers.push(`${toRelativePath(entry.markdownPath)}: title が未設定です。`);
    } else if (isPlaceholderValue(entry.title)) {
      blockers.push(`${toRelativePath(entry.markdownPath)}: title が placeholder のままです。`);
    }

    if (!entry.author) {
      blockers.push(`${toRelativePath(entry.markdownPath)}: author が未設定です。`);
    } else if (isPlaceholderValue(entry.author)) {
      blockers.push(`${toRelativePath(entry.markdownPath)}: author が未確定です。`);
    }

    if (!entry.image) {
      blockers.push(`${toRelativePath(entry.markdownPath)}: image が未設定です。`);
    } else if (isPlaceholderValue(entry.image) || entry.image.includes('/placeholder-')) {
      blockers.push(`${toRelativePath(entry.markdownPath)}: image に placeholder が混入しています。`);
    }

    if (!entry.sourceFile) {
      blockers.push(`${toRelativePath(entry.markdownPath)}: source_file が未設定です。`);
    } else if (isPlaceholderValue(entry.sourceFile) || entry.sourceFile.includes('placeholder')) {
      blockers.push(`${toRelativePath(entry.markdownPath)}: source_file に placeholder が混入しています。`);
    }

    if (entry.image && !entry.image.startsWith(TARGET_IMAGE_PREFIX)) {
      blockers.push(`${toRelativePath(entry.markdownPath)}: image が gallery/books 配下を指していません。`);
    }

    if (entry.sourceFile && !entry.sourceFile.startsWith(TARGET_SOURCE_PREFIX)) {
      blockers.push(`${toRelativePath(entry.markdownPath)}: source_file が gallery/books 配下を指していません。`);
    }

    if (entry.image && entry.sourceFile) {
      const expectedImage = `/uploads/${entry.sourceFile}`;
      if (entry.image !== expectedImage) {
        blockers.push(
          `${toRelativePath(entry.markdownPath)}: image と source_file が一致していません (${entry.image} vs ${expectedImage})。`
        );
      }
    }
  }

  return blockers;
}

function buildRenamePlans(entries) {
  const reviews = [];
  const plans = [];
  const currentImagePaths = new Set();

  for (const entry of entries) {
    if (entry.sourceFile) {
      currentImagePaths.add(path.resolve('public/uploads', entry.sourceFile));
    }
  }

  const reservedPaths = new Set(
    listFilesRecursive(UPLOADS_DIR).filter((filePath) => !currentImagePaths.has(filePath))
  );

  for (const entry of entries) {
    const issues = [];

    if (!entry.title || !entry.author || !entry.image || !entry.sourceFile) {
      issues.push('frontmatter 必須項目が不足しています。');
    }

    if (entry.title && hasNonAscii(entry.title)) {
      issues.push('title は rename 前に英字表記へ確定してください。');
    }

    if (entry.author && hasNonAscii(entry.author)) {
      issues.push('author は rename 前に英字表記へ確定してください。');
    }

    const titleSegment = entry.title ? slugifyAscii(entry.title) : '';
    const authorSegment = entry.author ? slugifyAscii(entry.author) : '';
    if (!titleSegment || !authorSegment) {
      issues.push('title/author から安全な ASCII ファイル名を作れません。');
    }

    if (issues.length > 0) {
      reviews.push({
        markdownPath: entry.markdownPath,
        reasons: issues,
      });
      continue;
    }

    const currentSourceFile = entry.sourceFile;
    const currentImagePath = entry.image;
    const currentAbsolutePath = path.resolve('public/uploads', currentSourceFile);
    if (!entry.virtual && !existsSync(currentAbsolutePath)) {
      reviews.push({
        markdownPath: entry.markdownPath,
        reasons: [`現在の画像ファイルが見つかりません: ${toRelativePath(currentAbsolutePath)}`],
      });
      continue;
    }

    const extension = path.extname(currentSourceFile);
    const desiredBase = `${titleSegment}_${authorSegment}`;
    let nextSourceFile = `${TARGET_SOURCE_PREFIX}${desiredBase}${extension}`;
    let nextAbsolutePath = path.resolve('public/uploads', nextSourceFile);
    let suffix = 2;

    while (reservedPaths.has(nextAbsolutePath)) {
      nextSourceFile = `${TARGET_SOURCE_PREFIX}${desiredBase}_${suffix}${extension}`;
      nextAbsolutePath = path.resolve('public/uploads', nextSourceFile);
      suffix += 1;
    }

    reservedPaths.add(nextAbsolutePath);
    plans.push({
      markdownPath: entry.markdownPath,
      virtual: entry.virtual,
      currentImagePath,
      currentSourceFile,
      currentAbsolutePath,
      nextImagePath: `/uploads/${nextSourceFile}`,
      nextSourceFile,
      nextAbsolutePath,
      needsRename: currentSourceFile !== nextSourceFile,
    });
  }

  return { plans, reviews };
}

function scanReviewCoverUpdates(imageMappings) {
  const updates = [];

  for (const filePath of listMarkdownFiles(REVIEWS_DIR)) {
    const markdown = readMarkdownFile(filePath);
    const currentCover = readScalarField(markdown.frontmatter, 'cover');
    if (typeof currentCover !== 'string') {
      continue;
    }

    const mappedCover = imageMappings.get(currentCover);
    if (!mappedCover || mappedCover === currentCover) {
      continue;
    }

    updates.push({
      filePath,
      currentCover,
      nextCover: mappedCover,
    });
  }

  return updates;
}

function scanManifestUpdates(imageMappings, sourceMappings) {
  if (!existsSync(MANIFEST_PATH)) {
    return null;
  }

  const manifest = readJson(MANIFEST_PATH);
  if (!Array.isArray(manifest)) {
    fail('data/gallery-manifest.json の形式が不正です。');
  }

  let changed = false;
  const nextManifest = manifest.map((entry) => {
    if (!entry || typeof entry !== 'object') {
      return entry;
    }

    const nextEntry = { ...entry };
    if (typeof nextEntry.image === 'string' && imageMappings.has(nextEntry.image)) {
      nextEntry.image = imageMappings.get(nextEntry.image);
      changed = true;
    }

    if (typeof nextEntry.source_file === 'string' && sourceMappings.has(nextEntry.source_file)) {
      nextEntry.source_file = sourceMappings.get(nextEntry.source_file);
      changed = true;
    }

    return nextEntry;
  });

  return changed ? nextManifest : null;
}

function replaceJsonStrings(value, mapping) {
  if (typeof value === 'string') {
    return mapping.get(value) ?? value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => replaceJsonStrings(item, mapping));
  }

  if (!value || typeof value !== 'object') {
    return value;
  }

  const nextObject = {};
  for (const [key, item] of Object.entries(value)) {
    nextObject[key] = replaceJsonStrings(item, mapping);
  }

  return nextObject;
}

function scanCorrectionsUpdates(imageMappings, sourceMappings) {
  if (!existsSync(CORRECTIONS_PATH)) {
    return null;
  }

  const corrections = readJson(CORRECTIONS_PATH);
  if (!corrections || typeof corrections !== 'object' || Array.isArray(corrections)) {
    fail('data/gallery-corrections.json の形式が不正です。');
  }

  const valueMappings = new Map([...imageMappings.entries(), ...sourceMappings.entries()]);
  let changed = false;
  const nextCorrections = {};

  for (const [key, value] of Object.entries(corrections)) {
    const nextKey = sourceMappings.get(key) ?? key;
    if (nextKey !== key) {
      changed = true;
    }

    const nextValue = replaceJsonStrings(value, valueMappings);
    if (JSON.stringify(nextValue) !== JSON.stringify(value)) {
      changed = true;
    }

    nextCorrections[nextKey] = nextValue;
  }

  return changed ? nextCorrections : null;
}

function collectTouchedPaths(importReport, renamePlans, reviewUpdates, hasManifestUpdate, hasCorrectionsUpdate) {
  const touched = new Set();

  for (const result of importReport.results ?? []) {
    if (result.status !== 'imported') {
      continue;
    }

    if (result.destinationImagePath) {
      touched.add(result.destinationImagePath);
    }

    if (result.destinationMarkdownPath) {
      touched.add(result.destinationMarkdownPath);
    }
  }

  for (const plan of renamePlans) {
    if (!plan.needsRename) {
      continue;
    }

    touched.add(plan.currentAbsolutePath);
    touched.add(plan.nextAbsolutePath);
    touched.add(plan.markdownPath);
  }

  for (const update of reviewUpdates) {
    touched.add(update.filePath);
  }

  if (hasManifestUpdate) {
    touched.add(MANIFEST_PATH);
  }

  if (hasCorrectionsUpdate) {
    touched.add(CORRECTIONS_PATH);
  }

  return touched;
}

function applyRenames(renamePlans) {
  const executablePlans = renamePlans.filter((plan) => plan.needsRename);
  const staged = [];

  try {
    for (const [index, plan] of executablePlans.entries()) {
      const tempPath = `${plan.currentAbsolutePath}.rename-${Date.now()}-${index}`;
      renameSync(plan.currentAbsolutePath, tempPath);
      staged.push({ ...plan, tempPath });
    }

    for (const plan of staged) {
      mkdirSync(path.dirname(plan.nextAbsolutePath), { recursive: true });
      renameSync(plan.tempPath, plan.nextAbsolutePath);
    }
  } catch (error) {
    for (const plan of [...staged].reverse()) {
      const rollbackSource = existsSync(plan.tempPath)
        ? plan.tempPath
        : existsSync(plan.nextAbsolutePath)
          ? plan.nextAbsolutePath
          : null;

      if (!rollbackSource || existsSync(plan.currentAbsolutePath)) {
        continue;
      }

      renameSync(rollbackSource, plan.currentAbsolutePath);
    }

    throw error;
  }
}

function applyGalleryMarkdownUpdates(renamePlans) {
  for (const plan of renamePlans) {
    if (!plan.needsRename || plan.virtual || !existsSync(plan.markdownPath)) {
      continue;
    }

    let content = readFileSync(plan.markdownPath, 'utf8');
    content = replaceFrontmatterScalar(content, 'image', plan.nextImagePath);
    content = replaceFrontmatterScalar(content, 'source_file', plan.nextSourceFile);
    writeFileSync(plan.markdownPath, content);
  }
}

function applyReviewUpdates(reviewUpdates) {
  for (const update of reviewUpdates) {
    let content = readFileSync(update.filePath, 'utf8');
    content = replaceFrontmatterScalar(content, 'cover', update.nextCover);
    writeFileSync(update.filePath, content);
  }
}

function findOldReferenceHits(renamePlans) {
  const targets = [];
  for (const plan of renamePlans) {
    if (!plan.needsRename) {
      continue;
    }

    targets.push(plan.currentImagePath, plan.currentSourceFile);
  }

  if (targets.length === 0) {
    return [];
  }

  const hits = [];
  const textFiles = [
    ...listFilesRecursive(GALLERY_DIR),
    ...listFilesRecursive(REVIEWS_DIR),
    ...listFilesRecursive(DATA_DIR),
  ].filter((filePath) => /\.(md|json|ya?ml|ts|astro)$/i.test(filePath));

  for (const filePath of textFiles) {
    const content = readFileSync(filePath, 'utf8');
    const matched = targets.filter((target) => content.includes(target));
    if (matched.length === 0) {
      continue;
    }

    hits.push({
      filePath,
      targets: matched,
    });
  }

  return hits;
}

function stageAndCreatePr({ touchedPaths, baselineGit }) {
  if (!baselineGit.available) {
    return { skipped: true, reason: 'git status を取得できないため PR 作成をスキップしました。' };
  }

  if (baselineGit.stagedPaths.size > 0) {
    return { skipped: true, reason: '既存の staged 変更があるため PR 作成をスキップしました。' };
  }

  const commitPaths = [...touchedPaths];
  if (commitPaths.length === 0) {
    return { skipped: true, reason: 'コミット対象の変更がないため PR 作成をスキップしました。' };
  }

  const conflicted = commitPaths.filter((filePath) => baselineGit.dirtyPaths.has(filePath));
  if (conflicted.length > 0) {
    return {
      skipped: true,
      reason: `既存変更と重なるため PR 作成をスキップしました: ${conflicted.map((filePath) => toRelativePath(filePath)).join(', ')}`,
    };
  }

  const branchName = `codex/gallery-${new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)}`;
  const switchResult = runCommand('git', ['switch', '-c', branchName], { cwd: process.cwd() });
  if (!switchResult.ok) {
    return { skipped: true, reason: switchResult.stderr.trim() || 'git switch に失敗しました。' };
  }

  const relativePaths = commitPaths.map((filePath) => toRelativePath(filePath));
  const addResult = runCommand('git', ['add', '-A', '--', ...relativePaths], { cwd: process.cwd() });
  if (!addResult.ok) {
    return { skipped: true, reason: addResult.stderr.trim() || 'git add に失敗しました。' };
  }

  const commitResult = runCommand('git', ['commit', '-m', 'chore: sync gallery batch'], { cwd: process.cwd() });
  if (!commitResult.ok) {
    return { skipped: true, reason: commitResult.stderr.trim() || 'git commit に失敗しました。' };
  }

  const pushResult = runCommand('git', ['push', '-u', 'origin', branchName], { cwd: process.cwd() });
  if (!pushResult.ok) {
    return { skipped: true, reason: pushResult.stderr.trim() || 'git push に失敗しました。' };
  }

  const prResult = runCommand(
    'gh',
    [
      'pr',
      'create',
      '--title',
      'chore: sync gallery batch',
      '--body',
      '## Summary\n- import gallery batch\n- sync canonical gallery asset paths\n- verify build and typecheck\n',
    ],
    { cwd: process.cwd() }
  );
  if (!prResult.ok) {
    return { skipped: true, reason: prResult.stderr.trim() || 'gh pr create に失敗しました。' };
  }

  const prUrl = `${prResult.stdout}${prResult.stderr}`
    .split('\n')
    .map((line) => line.trim())
    .find((line) => /^https:\/\/github\.com\//.test(line));

  return {
    skipped: false,
    branchName,
    prUrl,
  };
}

function printDocs() {
  const lines = [
    '[gallery:pipeline docs]',
    `- docs: ${toRelativePath(DOCS_PATH)}`,
    '- dry-run: npm run gallery:pipeline -- --dry-run',
    '- apply: npm run gallery:pipeline -- --apply',
    '- apply + PR: npm run gallery:pipeline -- --apply --pr',
    '- stop conditions: title/author 未確定, rename-review 超過, placeholder, old path 参照残存, typecheck/build 失敗',
  ];

  console.log(lines.join('\n'));
}

function printSummary(summary) {
  const lines = [
    `[gallery:pipeline] mode=${summary.mode} status=${summary.status}`,
    `- import: created=${summary.import.created} duplicate=${summary.import.duplicate} manual-review=${summary.import.manualReview} error=${summary.import.error}`,
    `- targets: ${summary.targetCount}`,
    `- rename: planned=${summary.renamePlanned} applied=${summary.renameApplied} reviews=${summary.renameReviews}`,
    `- updated files: ${summary.updatedFiles}`,
    `- typecheck: ${summary.typecheck}`,
    `- build: ${summary.build}`,
  ];

  if (summary.prUrl) {
    lines.push(`- pr: ${summary.prUrl}`);
  }

  if (summary.stopReason) {
    lines.push(`- stop: ${summary.stopReason}`);
  }

  for (const detail of summary.details) {
    lines.push(`- detail: ${detail}`);
  }

  console.log(lines.join('\n'));
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.docs) {
    printDocs();
    return 0;
  }

  const baselineGit = getGitStatusInfo();
  const importStep = runImportStep(options);
  const importReport = importStep.report;
  const gitStatusAfter = getGitStatusInfo();
  const targetEntries = collectTargetEntries(importReport, options, gitStatusAfter);
  const renamePlan = buildRenamePlans(targetEntries);
  const imageMappings = new Map(
    renamePlan.plans
      .filter((plan) => plan.needsRename)
      .map((plan) => [plan.currentImagePath, plan.nextImagePath])
  );
  const sourceMappings = new Map(
    renamePlan.plans
      .filter((plan) => plan.needsRename)
      .map((plan) => [plan.currentSourceFile, plan.nextSourceFile])
  );
  const reviewUpdates = scanReviewCoverUpdates(imageMappings);
  const manifestUpdate = scanManifestUpdates(imageMappings, sourceMappings);
  const correctionsUpdate = scanCorrectionsUpdates(imageMappings, sourceMappings);
  const touchedPaths = collectTouchedPaths(
    importReport,
    renamePlan.plans,
    reviewUpdates,
    Boolean(manifestUpdate),
    Boolean(correctionsUpdate)
  );
  const summary = {
    mode: options.dryRun ? 'dry-run' : 'apply',
    status: 'ok',
    import: {
      created: (importReport.results ?? []).filter((result) => result.status === 'imported').length,
      duplicate: (importReport.results ?? []).filter((result) => result.status === 'duplicate').length,
      manualReview: (importReport.results ?? []).filter((result) => result.status === 'manual-review').length,
      error: (importReport.results ?? []).filter((result) => result.status === 'error').length,
    },
    targetCount: targetEntries.length,
    renamePlanned: renamePlan.plans.filter((plan) => plan.needsRename).length,
    renameApplied: 0,
    renameReviews: renamePlan.reviews.length,
    updatedFiles: touchedPaths.size,
    typecheck: options.dryRun ? 'skipped' : deriveValidationSummary(importReport, 'npm run typecheck'),
    build: options.dryRun ? 'skipped' : deriveValidationSummary(importReport, 'npm run build'),
    prUrl: undefined,
    stopReason: undefined,
    details: [],
  };

  const stop = (reason, details = []) => {
    summary.status = 'stopped';
    summary.stopReason = reason;
    summary.details.push(...details);
    printSummary(summary);
    return 1;
  };

  if (importReport.fatalError) {
    return stop('gallery:import が fatal error で停止しました。', [String(importReport.fatalError)]);
  }

  if (!importStep.commandResult.ok && options.dryRun) {
    return stop('gallery:import dry-run が失敗しました。', [importStep.commandResult.stderr.trim() || importStep.commandResult.stdout.trim()]);
  }

  if (summary.import.manualReview > 0 || summary.import.error > 0) {
    return stop('import 段階で manual-review または error が発生しました。', [
      ...((importReport.results ?? [])
        .filter((result) => result.status === 'manual-review' || result.status === 'error')
        .map((result) => `${toRelativePath(result.sourcePath)} -> ${result.status}`)),
    ]);
  }

  if (targetEntries.length === 0) {
    return stop('対象の gallery markdown を特定できませんでした。', [
      `inbox: ${existsSync(INBOX_DIR) ? toRelativePath(INBOX_DIR) : 'missing'}`,
    ]);
  }

  const frontmatterBlockers = validateFrontmatter(targetEntries);
  if (frontmatterBlockers.length > 0) {
    return stop('frontmatter の必須項目チェックで停止しました。', frontmatterBlockers);
  }

  if (renamePlan.reviews.length > MAX_RENAME_REVIEW_COUNT) {
    return stop(
      `rename-review 件数が閾値を超えました (${renamePlan.reviews.length} > ${MAX_RENAME_REVIEW_COUNT})。`,
      renamePlan.reviews.flatMap((review) => [
        `${toRelativePath(review.markdownPath)}: ${review.reasons.join(' / ')}`,
      ])
    );
  }

  if (options.dryRun) {
    summary.status = 'ready';
    printSummary(summary);
    return 0;
  }

  if (!importStep.commandResult.ok && (summary.typecheck === 'failed' || summary.build === 'failed')) {
    return stop('import 後の typecheck/build が失敗したため停止しました。', [
      importStep.commandResult.stderr.trim() || importStep.commandResult.stdout.trim(),
    ]);
  }

  applyRenames(renamePlan.plans);
  summary.renameApplied = summary.renamePlanned;
  applyGalleryMarkdownUpdates(renamePlan.plans);
  applyReviewUpdates(reviewUpdates);

  if (manifestUpdate) {
    writeJson(MANIFEST_PATH, manifestUpdate);
  }

  if (correctionsUpdate) {
    writeJson(CORRECTIONS_PATH, correctionsUpdate);
  }

  const oldReferenceHits = findOldReferenceHits(renamePlan.plans);
  if (oldReferenceHits.length > 0) {
    return stop(
      'rename 後に old path 参照が残っています。',
      oldReferenceHits.map((hit) => `${toRelativePath(hit.filePath)}: ${hit.targets.join(', ')}`)
    );
  }

  const typecheckResult = runCommand('npm', ['run', 'typecheck'], { cwd: process.cwd() });
  summary.typecheck = typecheckResult.ok ? 'passed' : 'failed';
  if (!typecheckResult.ok) {
    return stop('typecheck が失敗しました。', [typecheckResult.stderr.trim() || typecheckResult.stdout.trim()]);
  }

  const buildResult = runCommand('npm', ['run', 'build'], { cwd: process.cwd() });
  summary.build = buildResult.ok ? 'passed' : 'failed';
  if (!buildResult.ok) {
    return stop('build が失敗しました。', [buildResult.stderr.trim() || buildResult.stdout.trim()]);
  }

  if (options.pr) {
    const prResult = stageAndCreatePr({ touchedPaths, baselineGit });
    if (prResult.skipped) {
      summary.details.push(prResult.reason);
    } else {
      summary.prUrl = prResult.prUrl;
    }
  }

  printSummary(summary);
  return 0;
}

try {
  process.exitCode = main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
