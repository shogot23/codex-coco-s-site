import type { APIRoute } from 'astro';
import { buildGalleryBrowseModel, getPublishedGallery, sortGalleryEntries } from '../../utils/gallery';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const entries = sortGalleryEntries(await getPublishedGallery());
  const model = buildGalleryBrowseModel(entries, base);

  return new Response(JSON.stringify({
    generatedFor: new URL(`${base}gallery/`, site).toString(),
    count: model.items.length,
    items: model.items,
  }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
};
