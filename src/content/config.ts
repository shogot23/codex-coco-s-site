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

export const EXCERPT_KINDS = ['direct-quote', 'paraphrase', 'site-takeaway'] as const;
export type ExcerptKind = typeof EXCERPT_KINDS[number];

export const EDITORIAL_STATUSES = ['draft', 'needs-review', 'reviewed'] as const;
export type EditorialStatus = typeof EDITORIAL_STATUSES[number];

export const VISUAL_ORIGINS = [
  'ai-generated',
  'official-cover',
  'original-photo',
  'licensed-artwork',
] as const;
export type VisualOrigin = typeof VISUAL_ORIGINS[number];

const reviews = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string(),
      description: optionalString,
      date: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      cover: optionalString,
      bookTitle: optionalString,
      author: optionalString,
      excerpt: optionalString,
      excerptKind: z.enum(EXCERPT_KINDS).optional(),
      excerptSource: optionalString,
      readingCompass: optionalString,
      readerWorry: optionalString,
      bookQuestion: optionalString,
      perspectiveShift: optionalString,
      smallStep: optionalString,
      cocoNote: optionalString,
      lingeringQuestion: optionalString,
      editorialStatus: z.enum(EDITORIAL_STATUSES).optional(),
      tags: z.preprocess(
        (value) => (Array.isArray(value) && value.length === 0 ? undefined : value),
        z.array(z.enum(REVIEW_TAGS)).optional()
      ),
      infographic: optionalString,
      recommendedFor: optionalStringList,
      purchaseLinks: optionalLinkList,
      published: z.boolean().default(true),
    })
    .superRefine((review, context) => {
      if (review.excerptKind === 'direct-quote' && !review.excerptSource) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['excerptSource'],
          message: 'excerptSource is required when excerptKind is direct-quote',
        });
      }
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
    updatedAt: z.coerce.date().optional(),
    galleryEditorialStatus: z.enum(EDITORIAL_STATUSES).optional(),
    galleryPrompt: optionalString,
    visualOrigin: z.enum(VISUAL_ORIGINS).optional(),
    published: z.boolean().default(false),
    description: z.string().optional(),
    purchaseLinks: optionalLinkList,
    relatedReview: z.preprocess(
      (val) => (val === '' ? undefined : val),
      reference('reviews').optional()
    ),
  }),
});

export const collections = { profile, about, reviews, gallery };
