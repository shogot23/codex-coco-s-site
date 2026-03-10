import { getCollection, type CollectionEntry } from 'astro:content';

export async function getPublishedReviews(): Promise<CollectionEntry<'reviews'>[]> {
  const all = await getCollection('reviews');
  return all.filter((entry) => entry.data.published === true);
}
