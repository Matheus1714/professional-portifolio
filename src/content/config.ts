import { defineCollection, z } from 'astro:content';

const blogsCollection = defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      datetime: z.string(),
      image: z.string().optional(),
    }),
});

const tilCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    datetime: z.string(),
    image: z.string().optional(),
  }),
});

const masterCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    datetime: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = {
  'blogs': blogsCollection,
  'today-i-learned': tilCollection,
  'master': masterCollection,
};