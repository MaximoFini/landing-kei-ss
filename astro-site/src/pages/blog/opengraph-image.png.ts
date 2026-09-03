import type { APIRoute } from "astro";
import { blogIndexOgImage } from "@/lib/og";

// Phase 5: build-time PNG. Ports app/blog/opengraph-image.tsx -> /blog/opengraph-image.png
export const GET: APIRoute = () => blogIndexOgImage();
