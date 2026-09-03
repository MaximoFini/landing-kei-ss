import type { APIRoute } from "astro";
import { defaultOgImage } from "@/lib/og";

// Phase 5: build-time PNG. Ports app/opengraph-image.tsx -> /opengraph-image.png
export const GET: APIRoute = () => defaultOgImage();
