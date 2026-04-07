import { getCollection, type CollectionEntry } from 'astro:content';

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
