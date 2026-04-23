import { getCollection, type CollectionEntry } from 'astro:content';
import {
  GALLERY_FICTION_GENRES,
  GALLERY_GENRES,
  GALLERY_HORIZON_GENRES,
  GALLERY_LEARNING_GENRES,
  getGalleryGenreBucket,
  type GalleryGenre,
  type GalleryGenreBucket,
} from '../lib/gallery-taxonomy';

export type GalleryBrowseChapterId = 'fiction' | 'learning' | 'horizon';

export type GalleryBrowseChapterDefinition = {
  id: GalleryBrowseChapterId;
  eyebrow: string;
  title: string;
  description: string;
  genres: readonly GalleryGenre[];
  mood: GalleryBrowseChapterId;
};

export type GalleryBrowseItem = {
  slug: string;
  title: string;
  image: string;
  imageSrc: string;
  author?: string;
  genre?: GalleryGenre;
  genreBucket: GalleryGenreBucket | null;
  summary: string;
  href: string | null;
  hasDetail: boolean;
  hasRelatedReview: boolean;
};

export type GalleryBrowseChapter = GalleryBrowseChapterDefinition & {
  items: GalleryBrowseItem[];
};

export type GalleryBrowseModel = {
  items: GalleryBrowseItem[];
  genres: readonly GalleryGenre[];
  chapters: GalleryBrowseChapter[];
};

export const GALLERY_BROWSE_CHAPTERS: readonly GalleryBrowseChapterDefinition[] = [
  {
    id: 'fiction',
    eyebrow: 'Chapter 01',
    title: '物語と感情の気配を見返す。',
    description:
      '小説やノンフィクションのあとに残る温度を、すこし近い距離で並べる章です。読後に言葉へ戻る前の呼吸をここに置きます。',
    genres: GALLERY_FICTION_GENRES,
    mood: 'fiction',
  },
  {
    id: 'learning',
    eyebrow: 'Chapter 02',
    title: '学びが日常へ降りる瞬間を拾う。',
    description:
      'ビジネス、心理学、健康、新書、社会科学の本から見えた輪郭を、暮らしに近い景色として束ねます。学びを硬くしすぎない章です。',
    genres: GALLERY_LEARNING_GENRES,
    mood: 'learning',
  },
  {
    id: 'horizon',
    eyebrow: 'Chapter 03',
    title: '時代と熱量の遠景まで歩いていく。',
    description:
      '歴史、漫画、ホビーの本がひらく遠い景色を、ココちゃんの歩幅でゆっくりたどります。少し遠くへ行きたい日に向く章です。',
    genres: GALLERY_HORIZON_GENRES,
    mood: 'horizon',
  },
] as const;

export async function getPublishedGallery(): Promise<CollectionEntry<'gallery'>[]> {
  const all = await getCollection('gallery');
  return all.filter((entry) => entry.data.published === true);
}

export function hasDetailContent(entry: CollectionEntry<'gallery'>): boolean {
  const { note, description } = entry.data;
  return Boolean(note || description);
}

export function getGalleryTimestamp(generatedAt?: string): number {
  if (!generatedAt) return 0;

  const timestamp = Date.parse(generatedAt);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export function buildReviewGalleryMap(
  galleryEntries: CollectionEntry<'gallery'>[]
): Map<string, CollectionEntry<'gallery'>> {
  const map = new Map<string, CollectionEntry<'gallery'>>();

  for (const entry of galleryEntries) {
    const ref = entry.data.relatedReview;
    const reviewId =
      typeof ref === 'string'
        ? ref
        : ref && typeof ref === 'object' && 'id' in ref && typeof ref.id === 'string'
          ? ref.id
          : ref && typeof ref === 'object' && 'slug' in ref && typeof ref.slug === 'string'
            ? ref.slug
            : undefined;

    if (reviewId && !map.has(reviewId)) {
      map.set(reviewId, entry);
    }
  }

  return map;
}

const escapeForRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function getGallerySceneSummary(entry: CollectionEntry<'gallery'>): string {
  const summary =
    entry.data.note ?? entry.data.description ?? '本から生まれた景色を静かに見返すための展示です。';

  let cleaned = summary.trim();

  if (entry.data.title) {
    const titlePattern = new RegExp(
      `^(?:『|「)?${escapeForRegExp(entry.data.title)}(?:』|」)?(?:は|を)?(?:、|,)?\\s*`,
      'u'
    );
    cleaned = cleaned.replace(titlePattern, '');
  }

  if (entry.data.author) {
    const authorPattern = new RegExp(
      `^(?:著者[:：]\\s*)?${escapeForRegExp(entry.data.author)}(?:による)?(?:、|,)?\\s*`,
      'u'
    );
    cleaned = cleaned.replace(authorPattern, '');
  }

  cleaned = cleaned.replace(/^[、,]\s*/, '');

  return cleaned || summary;
}

export function getGalleryBrowseHref(
  entry: CollectionEntry<'gallery'>,
  baseWithSlash: string
): string | null {
  return hasDetailContent(entry) ? `${baseWithSlash}gallery/${entry.slug}/` : null;
}

function withGalleryBase(assetPath: string, baseWithSlash: string): string {
  if (!assetPath) return baseWithSlash;
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(assetPath)) return assetPath;
  if (assetPath.startsWith(baseWithSlash)) return assetPath;
  return `${baseWithSlash}${assetPath.replace(/^\/+/, '')}`;
}

export function buildGalleryBrowseModel(
  entries: CollectionEntry<'gallery'>[],
  baseWithSlash: string
): GalleryBrowseModel {
  const items = entries.map((entry) => {
    const genre = entry.data.genre;

    return {
      slug: entry.slug,
      title: entry.data.title,
      image: entry.data.image,
      imageSrc: withGalleryBase(entry.data.image, baseWithSlash),
      author: entry.data.author,
      genre,
      genreBucket: getGalleryGenreBucket(genre),
      summary: getGallerySceneSummary(entry),
      href: getGalleryBrowseHref(entry, baseWithSlash),
      hasDetail: hasDetailContent(entry),
      hasRelatedReview: Boolean(entry.data.relatedReview),
    } satisfies GalleryBrowseItem;
  });

  const chapters = GALLERY_BROWSE_CHAPTERS.map((chapter) => ({
    ...chapter,
    items: items.filter((item) => Boolean(item.genre && chapter.genres.includes(item.genre))),
  })).filter((chapter) => chapter.items.length > 0);

  return {
    items,
    genres: GALLERY_GENRES,
    chapters,
  };
}

/**
 * Sort gallery entries for "lead with review-connected scenes, then richer detail, then recent imports".
 * Order is descending by:
 * 1. `relatedReview` presence
 * 2. detail content presence
 * 3. `generated_at` timestamp
 * 4. title locale order
 */
export function sortGalleryEntries(
  entries: CollectionEntry<'gallery'>[]
): CollectionEntry<'gallery'>[] {
  return [...entries].sort((left, right) => {
    const reviewDiff = Number(Boolean(right.data.relatedReview)) - Number(Boolean(left.data.relatedReview));
    if (reviewDiff !== 0) return reviewDiff;

    const detailDiff = Number(hasDetailContent(right)) - Number(hasDetailContent(left));
    if (detailDiff !== 0) return detailDiff;

    const timeDiff = getGalleryTimestamp(right.data.generated_at) - getGalleryTimestamp(left.data.generated_at);
    if (timeDiff !== 0) return timeDiff;

    return left.data.title.localeCompare(right.data.title, 'ja');
  });
}
