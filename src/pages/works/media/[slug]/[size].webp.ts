import type { APIRoute } from 'astro';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { getVisibleWorks } from '../../../../utils/works';

export async function getStaticPaths() {
  return (await getVisibleWorks()).flatMap((work) => [480, 1080].map((size) => ({
    params: { slug: work.slug, size: String(size) },
    props: { image: work.data.image, size },
  })));
}

export const GET: APIRoute = async ({ props }) => {
  const input = await readFile(path.join(process.cwd(), 'src/assets/works', props.image));
  const output = await sharp(input).resize({ width: props.size, withoutEnlargement: true }).webp({ quality: 88 }).toBuffer();
  return new Response(new Uint8Array(output), { headers: { 'Content-Type': 'image/webp' } });
};
