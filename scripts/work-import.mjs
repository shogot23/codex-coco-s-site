import { constants } from 'node:fs';
import { copyFile, lstat, mkdir, readFile, realpath, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const fields = ['title', 'description', 'readerWorry', 'imageAlt', 'relatedReview', 'bookTitle', 'bookConnection', 'completion', 'question', 'evidenceNote', 'safetyNote'];
const exists = async (file) => Boolean(await lstat(file).catch((error) => {
  if (error.code === 'ENOENT') return null;
  throw error;
}));

// Review titles currently use a single YAML scalar. Reject unsupported syntax rather than guessing.
function scalar(frontmatter, field) {
  const lines = frontmatter.split(/\r?\n/).filter((line) => line.startsWith(`${field}:`));
  if (lines.length !== 1) throw new Error(`Review ${field}: expected one scalar`);
  const value = lines[0].slice(field.length + 1).trim();
  if (value.startsWith('"')) return JSON.parse(value);
  if (/^'(?:[^']|'')*'$/.test(value)) return value.slice(1, -1).replaceAll("''", "'");
  if (!value || /[#[\]{}|>]/.test(value)) throw new Error(`Review ${field}: unsupported scalar`);
  return value;
}

export async function importWork(packageFile, { root = process.cwd(), dryRun = false } = {}) {
  const input = JSON.parse(await readFile(packageFile, 'utf8'));
  if (input.version !== 1 || !slugPattern.test(input.slug ?? '')) throw new Error('Invalid version or slug');
  for (const field of fields) {
    if (typeof input[field] !== 'string' || !input[field].trim()) throw new Error(`Missing ${field}`);
  }
  if (!slugPattern.test(input.relatedReview)) throw new Error('Invalid relatedReview');
  if (!Number.isInteger(input.durationMinutes) || input.durationMinutes < 1 || input.durationMinutes > 30) throw new Error('Invalid durationMinutes');
  if (!Array.isArray(input.sources) || !input.sources.length || input.sources.some((s) => {
    try { return !s.label?.trim() || new URL(s.url).protocol !== 'https:'; } catch { return true; }
  })) throw new Error('Invalid sources');
  if (typeof input.body !== 'string' || !input.body.includes('## 用意するもの\n') || !input.body.includes('## 手順\n') || !/^1\. .+/m.test(input.body)) throw new Error('Missing preparation or steps');
  if (/<|!\[|\]\(\s*(?:javascript|data):/i.test(input.body)) throw new Error('Use plain Markdown without HTML or embedded images');
  const filename = input.imageFilename;
  if (typeof filename !== 'string' || !filename.endsWith('.png') || filename.includes('/') || filename.includes('\\') || filename.includes('\0')) throw new Error('Invalid imageFilename');
  const sourceDir = await realpath(path.dirname(path.resolve(packageFile)));
  const sourceImage = await realpath(path.join(sourceDir, filename));
  if (path.dirname(sourceImage) !== sourceDir) throw new Error('Image escapes package directory');
  const meta = await sharp(sourceImage).metadata();
  if (meta.format !== 'png' || meta.width !== 1080 || meta.height !== 1350) throw new Error('Image must be a 1080×1350 PNG');
  const reviewFile = path.join(root, 'src/content/reviews', `${input.relatedReview}.md`);
  const review = await readFile(reviewFile, 'utf8');
  const frontmatter = review.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
  if (!frontmatter || scalar(frontmatter, 'title') !== input.bookTitle) throw new Error('Book title mismatch');
  // The review collection defaults published to true when the field is absent.
  if (/^published:/m.test(frontmatter) && scalar(frontmatter, 'published') !== 'true') throw new Error('Related review is unpublished');
  const contentDir = path.join(root, 'src/content/works');
  const imageDir = path.join(root, 'src/assets/works');
  const contentFile = path.join(contentDir, `${input.slug}.md`);
  const imageFile = path.join(imageDir, `${input.slug}.png`);
  const data = Object.fromEntries(fields.map((field) => [field, input[field].trim()]));
  Object.assign(data, { durationMinutes: input.durationMinutes, image: `${input.slug}.png`, sources: input.sources.map(({ label, url }) => ({ label, url })), published: false });
  const markdown = `---\n${Object.entries(data).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n')}\n---\n\n${input.body.trim()}\n`;
  const checkCollision = async () => {
    if (await exists(contentFile) || await exists(imageFile)) throw new Error(`Already exists: ${input.slug}`);
  };
  await checkCollision();
  if (dryRun) return { contentFile, imageFile, published: false, dryRun: true };
  const lock = path.join(root, '.works-import.lock');
  await mkdir(lock); // Serializes importers; stale locks require inspection, never automatic deletion.
  let wroteImage = false;
  let wroteContent = false;
  try {
    await checkCollision();
    await mkdir(contentDir, { recursive: true });
    await mkdir(imageDir, { recursive: true });
    await copyFile(sourceImage, imageFile, constants.COPYFILE_EXCL);
    wroteImage = true;
    await writeFile(contentFile, markdown, { flag: 'wx' });
    wroteContent = true;
    return { contentFile, imageFile, published: false, dryRun: false };
  } catch (error) {
    if (wroteContent) await rm(contentFile);
    if (wroteImage) await rm(imageFile);
    throw error;
  } finally {
    await rm(lock, { recursive: true });
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const args = process.argv.slice(2);
  const file = args.find((arg) => !arg.startsWith('--'));
  if (!file || args.some((arg) => arg.startsWith('--') && arg !== '--dry-run')) {
    console.error('Usage: npm run works:import -- /absolute/path/site-work.json [--dry-run]');
    process.exitCode = 1;
  } else {
    importWork(path.resolve(file), { dryRun: args.includes('--dry-run') })
      .then((result) => console.log(JSON.stringify(result, null, 2)))
      .catch((error) => { console.error(error.message); process.exitCode = 1; });
  }
}
