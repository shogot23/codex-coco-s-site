import { getCollection, type CollectionEntry } from 'astro:content';

export async function getPublishedGallery(): Promise<CollectionEntry<'gallery'>[]> {
  const all = await getCollection('gallery');
  return all.filter((entry) => entry.data.published === true);
}

export function hasDetailContent(entry: CollectionEntry<'gallery'>): boolean {
  const { note, description } = entry.data;
  return Boolean(note || description);
}
