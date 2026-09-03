import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Phase 5: the blog. Ports the inline `blogPosts` array in `lib/blog.ts` to a
// content collection. One `.md` file per post under `src/content/blog/`, the
// filename (sans `.md`) is the `slug`. Schema fields mirror the `BlogPost`
// interface 1:1 (title, excerpt, date, readTime, category, featured, keywords,
// author {name, role}). `content` in the old interface is now the file body.
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    // Kept as a plain `YYYY-MM-DD` string (not `z.date()`) to match the old
    // field exactly — callers do `new Date(post.date)` themselves.
    date: z.string(),
    readTime: z.string(),
    category: z.string(),
    featured: z.boolean(),
    keywords: z.array(z.string()),
    author: z.object({
      name: z.string(),
      role: z.string(),
    }),
  }),
});

export const collections = { blog };
