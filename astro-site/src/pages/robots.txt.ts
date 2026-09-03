import type { APIRoute } from "astro";

// Phase 5: ports app/robots.ts. Same user-agent rules + Host line. The Sitemap
// reference is reconciled to what @astrojs/sitemap actually emits
// (/sitemap-index.xml) instead of the Next value (/sitemap.xml).
const body = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /private/

User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /private/

Host: https://keisoftware.dev
Sitemap: https://keisoftware.dev/sitemap-index.xml
`;

export const GET: APIRoute = () =>
  new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
