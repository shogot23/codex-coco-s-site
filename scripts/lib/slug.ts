import { createHash } from 'node:crypto';

function slugifyAscii(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function genrePrefix(genre?: string): string {
  switch (genre) {
    case '小説':
    case '現代文学':
    case '歴史小説':
      return 'novel';
    case '漫画':
      return 'manga';
    case 'ノンフィクション':
      return 'nonfiction';
    case 'ビジネス':
      return 'business';
    case '歴史':
    case '歴史教養':
      return 'history';
    case '心理学':
      return 'psychology';
    case '健康':
      return 'health';
    case 'ホビー':
      return 'hobby';
    case '新書':
      return 'shinsho';
    case '自伝':
      return 'autobiography';
    case 'エッセイ':
      return 'essay';
    default:
      return 'pending';
  }
}

export function createGallerySlug(sourceFile: string, genre?: string): string {
  const hash = createHash('sha1').update(sourceFile).digest('hex').slice(0, 6);
  return `${genrePrefix(genre)}-${hash}`;
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
