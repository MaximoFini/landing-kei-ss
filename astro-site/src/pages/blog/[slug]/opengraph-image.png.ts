import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { blogPostOgImage } from "@/lib/og";

// Phase 5: build-time per-post PNG. Ports app/blog/[slug]/opengraph-image.tsx
// -> /blog/<slug>/opengraph-image.png (one file per post via getStaticPaths).
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title, category: post.data.category },
  }));
};

export const GET: APIRoute = ({ props }) =>
  blogPostOgImage({
    title: (props.title as string) ?? null,
    category: (props.category as string) ?? null,
  });
