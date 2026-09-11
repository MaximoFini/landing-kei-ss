"use client";

import { m, useReducedMotion } from "@/lib/motion";

/**
 * Symmetric glow rising from the bottom edge of the hero and dissolving
 * upward into the starfield. Built from stacked elliptical radial gradients
 * (all anchored at 50% on the x axis, so it is symmetric by construction)
 * instead of the blurred side ribbons it replaces — no SVG filter layer, so
 * it costs nothing to composite and its falloff blends cleanly with the
 * deep-space gradient behind the stars.
 */
export function HeroGlow() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* Wide ambient base — the broad wash that fades out well before the top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 72% at 50% 118%, rgba(63,125,255,0.52) 0%, rgba(40,96,220,0.34) 26%, rgba(26,79,192,0.18) 48%, rgba(11,26,66,0.07) 68%, transparent 84%)",
        }}
      />

      {/* Core column — brighter, narrower plume climbing out of the bottom edge */}
      <m.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(66% 52% at 50% 113%, rgba(140,185,255,0.50) 0%, rgba(63,125,255,0.36) 30%, rgba(26,79,192,0.15) 58%, transparent 80%)",
        }}
        animate={
          prefersReducedMotion ? undefined : { opacity: [0.82, 1, 0.82] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hot rim — the tight bloom hugging the very bottom of the section */}
      <m.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(42% 26% at 50% 109%, rgba(188,220,255,0.55) 0%, rgba(99,152,255,0.32) 40%, transparent 74%)",
        }}
        animate={
          prefersReducedMotion ? undefined : { opacity: [0.7, 1, 0.7] }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />
    </div>
  );
}
