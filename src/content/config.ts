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

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    cover: z.string().optional(),
  }),
});

export const collections = { profile, reviews };
