import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

/**
 * Sitemap optimizado para SEO
 * Incluye todas las páginas estáticas y posts del blog
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://keisoftware.dev";

  // Get all blog posts
  const posts = getAllPosts();

  // Stable lastModified: newest post date, falling back to a fixed date.
  const latestPostDate = posts.length > 0 ? new Date(posts[0].date) : new Date("2026-08-29");
  const homeLastModified = new Date("2026-08-29");
  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: homeLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogPosts,
    // Agregar aquí futuras páginas como:
    // { url: `${baseUrl}/servicios`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
