export const GALLERY_GENRES = [
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
  '社会科学',
] as const;

export type GalleryGenre = typeof GALLERY_GENRES[number];

export const GALLERY_FICTION_GENRES: readonly GalleryGenre[] = [
  '現代文学',
  'ノンフィクション',
  'エッセイ',
  '自伝',
] as const;

export const GALLERY_LEARNING_GENRES: readonly GalleryGenre[] = [
  'ビジネス',
  '心理学',
  '健康',
  '新書',
  '社会科学',
] as const;

export const GALLERY_HORIZON_GENRES: readonly GalleryGenre[] = [
  '歴史小説',
  '歴史教養',
  '漫画',
  'ホビー',
] as const;

export type GalleryGenreBucket = 'fiction' | 'learning' | 'horizon';

export function getGalleryGenreBucket(genre?: string): GalleryGenreBucket | null {
  if (!genre) return null;
  if (GALLERY_FICTION_GENRES.includes(genre as GalleryGenre)) return 'fiction';
  if (GALLERY_LEARNING_GENRES.includes(genre as GalleryGenre)) return 'learning';
  if (GALLERY_HORIZON_GENRES.includes(genre as GalleryGenre)) return 'horizon';
  return null;
}

export function getGalleryGenreSlugPrefix(genre?: string): string {
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
    case '社会科学':
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
