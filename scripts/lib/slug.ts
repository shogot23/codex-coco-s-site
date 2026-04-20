import { createHash } from 'node:crypto';
import { getGalleryGenreSlugPrefix } from '../../src/lib/gallery-taxonomy.ts';

function slugifyAscii(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export function createGallerySlug(sourceFile: string, genre?: string): string {
  const hash = createHash('sha1').update(sourceFile).digest('hex').slice(0, 6);
  return `${getGalleryGenreSlugPrefix(genre)}-${hash}`;
}

export function createGalleryAssetBasename(sourceStem: string, title?: string, author?: string): string {
  const semanticBase = slugifyAscii([title, author].filter(Boolean).join(' '));
  const fallbackBase = slugifyAscii(sourceStem);
  const base = semanticBase || fallbackBase || 'gallery-book';
  const hash = createHash('sha1')
    .update(`${sourceStem}:${title ?? ''}:${author ?? ''}`)
    .digest('hex')
    .slice(0, 8);

  return `${base}-${hash}`;
}
