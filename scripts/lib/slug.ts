import { createHash } from 'node:crypto';

function genrePrefix(genre?: string): string {
  switch (genre) {
    case '小説':
      return 'novel';
    case 'ビジネス':
      return 'business';
    case '歴史':
      return 'history';
    default:
      return 'pending';
  }
}

export function createGallerySlug(sourceFile: string, genre?: string): string {
  const hash = createHash('sha1').update(sourceFile).digest('hex').slice(0, 6);
  return `${genrePrefix(genre)}-${hash}`;
}
