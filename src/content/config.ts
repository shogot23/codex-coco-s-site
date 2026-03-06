import { defineCollection, z } from 'astro:content';

const profile = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    avatar: z.string().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
});

const about = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
});

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    cover: z.string().optional(),
  }),
});

// Gallery genres - fixed list for filtering
export const GALLERY_GENRES = ['小説', 'ビジネス', '歴史'] as const;
export type GalleryGenre = typeof GALLERY_GENRES[number];

const gallery = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    genre: z.enum(GALLERY_GENRES).optional(),
    author: z.string().optional(),
    note: z.string().optional(),
    needs_review: z.boolean().optional(),
    generated_at: z.string().optional(),
    source_file: z.string().optional(),
  }),
});

// Allowed video URL hosts for embed
const ALLOWED_VIDEO_HOSTS = [
  'youtube.com',
  'www.youtube.com',
  'youtu.be',
  'instagram.com',
  'www.instagram.com',
] as const;

// Validate video URL: must be https and from allowed hosts
// Empty strings are treated as undefined (CMS may save empty strings for optional fields)
const videoUrlSchema = z.preprocess(
  (val) => (val === '' ? undefined : val),
  z.string().url().optional().refine(
    (url) => {
      if (!url) return true;
      try {
        const parsed = new URL(url);
        if (parsed.protocol !== 'https:') return false;
        return ALLOWED_VIDEO_HOSTS.includes(parsed.hostname as typeof ALLOWED_VIDEO_HOSTS[number]);
      } catch {
        return false;
      }
    },
    { message: 'URL must be https and from youtube.com, youtu.be, or instagram.com' }
  )
);

const videos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    thumbnail: z.string(),
    url: videoUrlSchema,
  }),
});

export const collections = { profile, about, reviews, gallery, videos };
