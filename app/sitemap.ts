import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

/**
 * Sitemap optimizado para SEO
 * Incluye todas las páginas estáticas y posts del blog
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://keisoftware.dev";
  const currentDate = new Date();

  // Get all blog posts
  const posts = getAllPosts();
  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogPosts,
    // Agregar aquí futuras páginas como:
    // { url: `${baseUrl}/servicios`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
