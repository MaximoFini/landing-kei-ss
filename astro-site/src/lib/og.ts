/**
 * Phase 5: build-time OG/Twitter image generation.
 *
 * The Next app rendered these PNGs on the fly with `next/og` (Satori):
 *   app/opengraph-image.tsx, app/twitter-image.tsx,
 *   app/blog/opengraph-image.tsx, app/blog/[slug]/opengraph-image.tsx
 *
 * There is no Satori in a static Astro build, so each design is reproduced as an
 * SVG (same canvas, padding, font sizes, weights, colours and copy as the JSX)
 * and rasterised to PNG with `sharp` (already a transitive dependency via Astro's
 * image pipeline). SVG text is rendered by sharp's bundled librsvg, so the
 * typeface is the build host's default bold sans rather than Geist — see the
 * phase report for the visual-parity delta.
 */
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
const BG = "#0a0a0a";
const FONT_STACK =
  "Geist, Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function rasterise(svg: string): Promise<Response> {
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

/** app/opengraph-image.tsx + app/twitter-image.tsx (identical). */
export function defaultOgImage(): Promise<Response> {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BG}"/>
  <text x="80" y="286" font-family="${FONT_STACK}" font-size="108" font-weight="700" letter-spacing="-3" fill="#ffffff">KEI Software</text>
  <text x="80" y="360" font-family="${FONT_STACK}" font-size="40" fill="#d4d4d4">Software a medida · Desarrollo Web &amp; IA</text>
  <text x="80" y="452" font-family="${FONT_STACK}" font-size="26" fill="#8a8a8a">Córdoba, Argentina</text>
</svg>`;
  return rasterise(svg);
}

/** app/blog/opengraph-image.tsx. */
export function blogIndexOgImage(): Promise<Response> {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BG}"/>
  <text x="80" y="290" font-family="${FONT_STACK}" font-size="96" font-weight="700" letter-spacing="-3" fill="#ffffff">Blog · KEI Software</text>
  <text x="80" y="362" font-family="${FONT_STACK}" font-size="40" fill="#d4d4d4">Desarrollo de software, IA y automatización</text>
  <text x="80" y="452" font-family="${FONT_STACK}" font-size="26" fill="#8a8a8a">Córdoba, Argentina</text>
</svg>`;
  return rasterise(svg);
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}

/** Naive word-wrap: estimate width from a bold-sans average glyph advance. */
function wrap(text: string, fontSize: number, maxWidth: number): string[] {
  const avg = fontSize * 0.56;
  const perLine = Math.max(1, Math.floor(maxWidth / avg));
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length > perLine && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** app/blog/[slug]/opengraph-image.tsx — dynamic post title + category. */
export function blogPostOgImage(opts: {
  title: string | null;
  category: string | null;
}): Promise<Response> {
  const title = opts.title
    ? truncate(opts.title, 110)
    : "Blog · KEI Software";
  const category = opts.category ?? "Desarrollo de software, IA y automatización";
  const titleSize = title.length > 60 ? 60 : 76;
  const lines = wrap(title, titleSize, WIDTH - 160);
  const lineHeight = titleSize * 1.15;
  // Vertically centre the title block in the gap between the top category row
  // and the bottom wordmark (the JSX used `justify-content: space-between`).
  const blockHeight = lines.length * lineHeight;
  const startY = (HEIGHT - blockHeight) / 2 + titleSize * 0.8;
  const tspans = lines
    .map(
      (l, i) =>
        `<tspan x="80" y="${Math.round(startY + i * lineHeight)}">${esc(l)}</tspan>`,
    )
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BG}"/>
  <text x="80" y="128" font-family="${FONT_STACK}" font-size="28" font-weight="700" letter-spacing="2.2" fill="#8a8a8a">${esc(category.toUpperCase())}</text>
  <text font-family="${FONT_STACK}" font-size="${titleSize}" font-weight="700" letter-spacing="-1.5" fill="#ffffff">${tspans}</text>
  <text x="80" y="556" font-family="${FONT_STACK}" font-size="30" font-weight="700" fill="#d4d4d4">KEI Software</text>
</svg>`;
  return rasterise(svg);
}
