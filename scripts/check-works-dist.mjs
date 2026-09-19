import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

async function files(dir) {
  return (await Promise.all((await readdir(dir, { withFileTypes: true })).map((entry) => {
    const name = path.join(dir, entry.name);
    return entry.isDirectory() ? files(name) : [name];
  }))).flat();
}
const dist = await files('dist');
const textFiles = dist.filter((file) => /\.(html|xml|json|js)$/.test(file));
const combined = (await Promise.all(textFiles.map((file) => readFile(file, 'utf8')))).join('\n');
const drafts = [];
for (const name of await readdir('src/content/works')) {
  if (!name.endsWith('.md')) continue;
  const text = await readFile(path.join('src/content/works', name), 'utf8');
  const slug = name.slice(0, -3);
  if (/^published: true$/m.test(text)) {
    for (const file of [`dist/works/${slug}/index.html`, `dist/works/media/${slug}/480.webp`, `dist/works/media/${slug}/1080.webp`]) {
      assert(dist.includes(file), `Published work output missing: ${file}`);
    }
    continue;
  }
  drafts.push(slug);
  assert(!combined.includes(`/works/${slug}/`), `Draft link leaked: ${slug}`);
  assert(!combined.includes(`/works/media/${slug}/`), `Draft image URL leaked: ${slug}`);
  assert(!dist.some((file) => file.includes(`/works/${slug}/`) || file.includes(`/works/media/${slug}/`) || path.basename(file).startsWith(`${slug}.`)), `Draft asset/route leaked: ${slug}`);
  const match = text.match(/^title: (.+)$/m);
  assert(match, `Missing title: ${name}`);
  const title = JSON.parse(match[1]);
  assert(!combined.includes(title), `Draft title leaked: ${slug}`);
}
console.log(`Draft exclusion verified across dist: ${drafts.join(', ')}`);
