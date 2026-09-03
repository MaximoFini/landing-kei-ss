// @ts-check
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

// --- Phase 5 additions -------------------------------------------------------
// Canonical origin. Drives `Astro.site`, absolute OG URLs, and @astrojs/sitemap.
// Mirrors the Next `metadataBase` (`app/layout.tsx`).
const SITE = 'https://keisoftware.dev'

// Read every blog post's frontmatter `date` straight off disk so the sitemap
// `serialize` hook (which runs outside the content-collection API) can stamp a
// per-post `lastmod` that matches `app/sitemap.ts`.
const BLOG_DIR = fileURLToPath(new URL('./src/content/blog', import.meta.url))
/** @type {Record<string, string>} slug -> ISO date */
const postDates = {}
try {
  for (const file of readdirSync(BLOG_DIR)) {
    if (!file.endsWith('.md')) continue
    const raw = readFileSync(new URL(`./src/content/blog/${file}`, import.meta.url), 'utf8')
    const m = raw.match(/^date:\s*["']?([0-9]{4}-[0-9]{2}-[0-9]{2})["']?\s*$/m)
    if (m) postDates[file.replace(/\.md$/, '')] = m[1]
  }
} catch {
  /* directory not created yet during tooling */
}
const sortedDates = Object.values(postDates).sort((a, b) => (a < b ? 1 : -1))
// `app/sitemap.ts`: /blog lastmod = newest post date, home lastmod = fixed date.
const LATEST_POST_DATE = sortedDates[0] ?? '2026-08-29'
const HOME_LAST_MODIFIED = '2026-08-29'

// remark plugin: drop the first top-level `# H1` from every post body.
// Mirrors `renderMarkdown()` in `lib/blog.ts`, which strips the leading H1 so the
// article body starts at H2 (the page already renders the title as the single
// <h1>). Bodies stay verbatim on disk; the H1 is removed at render time only.
function remarkStripFirstH1() {
  return (/** @type {any} */ tree) => {
    const i = tree.children.findIndex(
      (/** @type {any} */ n) => n.type === 'heading' && n.depth === 1,
    )
    if (i !== -1) tree.children.splice(i, 1)
  }
}

// https://astro.build/config
export default defineConfig({
  site: SITE,
  server: { port: 4321 },
  // `ignore` + `build.format: 'file'` so every route resolves in `astro preview`
  // with and without a trailing slash (emits `/phase2.html`, served for both
  // `/phase2` and `/phase2/`). Directory format 404s on the bare path.
  trailingSlash: 'ignore',
  build: { format: 'file' },
  // Fully static: `output: 'static'` (Astro's default) — every page prerenders,
  // zero server runtime, no Astro server adapter. The contact form is handled by
  // a standalone Vercel Function at `astro-site/api/contact.ts`, which Vercel
  // auto-detects from the top-level `api/` folder and deploys independently of
  // Astro. That file lives outside `src/`, so Astro never processes it.
  integrations: [
    preact(),
    // Phase 5: replaces `app/sitemap.ts`. Emits /sitemap-index.xml + /sitemap-0.xml.
    sitemap({
      // Drop scratch pages and the non-HTML image/text endpoints.
      filter: (page) =>
        !/\/phase\d(?:\/|$|\.html)/.test(page) &&
        !page.includes('opengraph-image') &&
        !page.includes('twitter-image') &&
        !page.includes('/robots.txt'),
      /** @param {import('@astrojs/sitemap').SitemapItem} item */
      serialize(item) {
        // Normalise to the no-trailing-slash form the Next sitemap used.
        const url = item.url.replace(/\/$/, '')
        item.url = url === SITE ? `${SITE}/` : url
        const path = url.slice(SITE.length)
        const weekly = /** @type {any} */ ('weekly')
        const monthly = /** @type {any} */ ('monthly')
        if (path === '' || path === '/') {
          item.changefreq = weekly
          item.priority = 1
          item.lastmod = new Date(HOME_LAST_MODIFIED).toISOString()
        } else if (path === '/blog') {
          item.changefreq = weekly
          item.priority = 0.9
          item.lastmod = new Date(LATEST_POST_DATE).toISOString()
        } else if (path.startsWith('/blog/')) {
          const slug = path.slice('/blog/'.length)
          item.changefreq = monthly
          item.priority = 0.7
          if (postDates[slug]) item.lastmod = new Date(postDates[slug]).toISOString()
        }
        return item
      },
    }),
  ],
  markdown: {
    // marked was called with `{ gfm: true, breaks: false }` (Astro defaults).
    // Disable smartypants so quotes/dashes/ellipses stay literal like marked.
    smartypants: false,
    remarkPlugins: [remarkStripFirstH1],
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
