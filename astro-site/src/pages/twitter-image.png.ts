import type { APIRoute } from "astro";
import { defaultOgImage } from "@/lib/og";

// Phase 5: build-time PNG. Ports app/twitter-image.tsx (which re-exports
// app/opengraph-image.tsx) -> /twitter-image.png
export const GET: APIRoute = () => defaultOgImage();
