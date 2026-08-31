"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const LEFT_A =
  "M 120,-100 C 0,250 260,420 160,620 C 80,760 260,850 140,1000";
const LEFT_B =
  "M 260,-100 C -100,300 420,360 300,620 C 20,880 420,780 0,1000";
const RIGHT_A =
  "M 1320,-100 C 1440,250 1180,420 1280,620 C 1360,760 1180,850 1300,1000";
const RIGHT_B =
  "M 1180,-100 C 1540,300 1020,360 1140,620 C 1420,880 1020,780 1440,1000";

export function HeroRibbons() {
  const prefersReducedMotion = useReducedMotion();
  const [animate, setAnimate] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // A full-viewport SVG behind a 46px blur is a heavy GPU layer even when it
    // isn't morphing — and its blur tail bleeds ~140px past the hero, stuttering
    // the top of the next section as it scrolls in. On phones swap it for a
    // plain CSS gradient (no filter); the morph, imperceptible behind the blur
    // anyway, only runs on non-touch larger viewports.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    setIsMobile(coarse || small);
    if (prefersReducedMotion || coarse || small) return;
    setAnimate(true);
  }, [prefersReducedMotion]);

  const morph = animate && !prefersReducedMotion;

  if (isMobile) {
    return (
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60% 55% at -8% 42%, rgba(63,125,255,0.22) 0%, rgba(26,79,192,0.10) 45%, transparent 72%), radial-gradient(60% 55% at 108% 42%, rgba(63,125,255,0.22) 0%, rgba(26,79,192,0.10) 45%, transparent 72%)",
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        viewBox="0 0 1440 1000"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        style={{ filter: "blur(46px)" }}
      >
        <defs>
          <linearGradient id="ribbonGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0b1a42" stopOpacity="0" />
            <stop offset="25%" stopColor="#1a4fc0" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#3f7dff" stopOpacity="0.85" />
            <stop offset="78%" stopColor="#bcdcff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1a4fc0" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        <motion.path
          d={LEFT_A}
          fill="none"
          stroke="url(#ribbonGradient)"
          strokeWidth={150}
          strokeLinecap="round"
          animate={morph ? { d: [LEFT_A, LEFT_B, LEFT_A] } : undefined}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d={RIGHT_A}
          fill="none"
          stroke="url(#ribbonGradient)"
          strokeWidth={150}
          strokeLinecap="round"
          animate={morph ? { d: [RIGHT_A, RIGHT_B, RIGHT_A] } : undefined}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
