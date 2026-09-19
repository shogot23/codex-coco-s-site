import { getCollection, getEntry } from 'astro:content';

// Production builds never accept a preview flag, including CI environments.
export const worksPreview = import.meta.env.DEV && process.env.WORKS_PREVIEW === '1';

export async function getVisibleWorks() {
  const entries = await getCollection('works');
  const visible = entries.filter((entry) => entry.data.published || worksPreview);
  for (const entry of visible) {
    const review = await getEntry(entry.data.relatedReview);
    if (!review?.data.published || review.data.title !== entry.data.bookTitle) {
      throw new Error(`Work ${entry.id}: related book is missing, unpublished, or mismatched`);
    }
  }
  return visible.sort((a, b) => a.slug.localeCompare(b.slug));
}

export function workImageUrl(slug: string, width: 480 | 1080) {
  return `${import.meta.env.BASE_URL}works/media/${slug}/${width}.webp`;
}
