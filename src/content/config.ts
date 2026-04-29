import { defineCollection, reference, z } from 'astro:content';
import { GALLERY_GENRES, type GalleryGenre } from '../lib/gallery-taxonomy';

const optionalString = z.preprocess(
  (value) => (value === '' ? undefined : value),
  z.string().optional()
);

const optionalStringList = z.preprocess(
  (value) => {
    if (!Array.isArray(value)) return value;

    const normalized = value
      .map((item) => {
        if (typeof item === 'string') return item.trim();
        if (item && typeof item === 'object') {
          if ('text' in item && typeof item.text === 'string') return item.text.trim();
          if ('value' in item && typeof item.value === 'string') return item.value.trim();
        }
        return '';
      })
      .filter(Boolean);

    return normalized.length > 0 ? normalized : undefined;
  },
  z.array(z.string()).optional()
);

const optionalLinkList = z.preprocess(
  (value) => {
    if (!Array.isArray(value)) return value;

    const normalized = value
      .map((item) => {
        if (!item || typeof item !== 'object') return null;
        const label = 'label' in item && typeof item.label === 'string' ? item.label.trim() : '';
        const url = 'url' in item && typeof item.url === 'string' ? item.url.trim() : '';
        if (!label || !url) return null;
        return { label, url };
      })
      .filter((item): item is { label: string; url: string } => item !== null);

    return normalized.length > 0 ? normalized : undefined;
  },
  z
    .array(
      z.object({
        label: z.string(),
        url: z.string().url(),
      })
    )
    .optional()
);

const profile = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    avatar: z.string().optional(),
    updatedAt: z.coerce.date().optional(),
    profileItems: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      )
      .optional(),
    favoriteItems: optionalStringList,
    sensitiveItems: optionalStringList,
    roleText: z.string().optional(),
    closingQuote: z.string().optional(),
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

export const REVIEW_TAGS = [
  '小説',
  '青春',
  '自己理解',
  '再起',
  'ビジネス',
  '自己啓発',
  '歴史',
  '科学',
  '健康',
  '運動',
  'エッセイ',
  'ノンフィクション',
  'その他',
] as const;
export type ReviewTag = typeof REVIEW_TAGS[number];

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: optionalString,
    date: z.coerce.date(),
    cover: optionalString,
    bookTitle: optionalString,
    author: optionalString,
    excerpt: optionalString,
    readingCompass: optionalString,
    tags: z.preprocess(
      (value) => (Array.isArray(value) && value.length === 0 ? undefined : value),
      z.array(z.enum(REVIEW_TAGS)).optional()
    ),
    infographic: optionalString,
    recommendedFor: optionalStringList,
    purchaseLinks: optionalLinkList,
    published: z.boolean().default(true),
  }),
});

export { GALLERY_GENRES, type GalleryGenre };

const gallery = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    genre: z.enum(GALLERY_GENRES).optional(),
    author: z.string().optional(),
    note: z.string().optional(),
    needs_review: z.boolean().optional(),
    generated_at: z.preprocess(
      (val) => (val instanceof Date ? val.toISOString() : val),
      z.string().optional()
    ),
    source_file: z.string().optional(),
    managed_by: z.string().optional(),
    published: z.boolean().default(false),
    description: z.string().optional(),
    purchaseLinks: optionalLinkList,
    relatedReview: z.preprocess(
      (val) => (val === '' ? undefined : val),
      reference('reviews').optional()
    ),
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
    thumbnail: optionalString,
    url: videoUrlSchema,
    videoSrc: optionalString,
    note: optionalString,
  }),
});

export const collections = { profile, about, reviews, gallery, videos };
