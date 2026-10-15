import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getPublishedReviews } from '../utils/reviews';

const toPlainText = (value: string) =>
  value
    .replace(/^#{1,6}\s+/gmu, '')
    .replace(/!\[([^\]]*)\]\([^)]+\)/gu, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/gu, '$1')
    .replace(/[*_`>#-]/gu, '')
    .replace(/\s+/gu, ' ')
    .trim();

export const GET: APIRoute = async (context) => {
  const reviews = await getPublishedReviews();
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  const site = new URL(base, context.site).toString();

  return rss({
    title: '読書 with Coco | Reviews',
    description: '本から残った問い、見方の変化、今日の小さな一歩を届ける読書 with Coco のレビュー更新情報。',
    site,
    items: [...reviews]
      .sort((left, right) => right.data.date.getTime() - left.data.date.getTime())
      .map((review) => ({
        title: review.data.title,
        description: toPlainText(review.data.description ?? review.data.excerpt ?? review.body ?? ''),
        pubDate: review.data.date,
        link: `reviews/${review.slug}/`,
      })),
  });
};
