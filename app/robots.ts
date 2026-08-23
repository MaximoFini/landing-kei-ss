import { MetadataRoute } from "next";

/**
 * Robots.txt optimizado para SEO
 * Permite crawling de contenido público y protege archivos privados
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
    ],
    sitemap: "https://keisoftware.dev/sitemap.xml",
    host: "https://keisoftware.dev",
  };
}
