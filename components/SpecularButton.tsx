"use client";

import { useRef, useState, useEffect, MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SpecularButtonProps {
  href: string;
  children: React.ReactNode;
}

export function SpecularButton({ href, children }: SpecularButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const [shimmerKey, setShimmerKey] = useState(0);

  // Re-trigger shimmer sweep every 3.5s
  useEffect(() => {
    const id = setInterval(() => setShimmerKey((k) => k + 1), 3500);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.045 }}
      whileTap={{ scale: 0.96 }}
      className="relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-white text-[15px] overflow-hidden select-none"
      style={{
        backgroundColor: "#3b82f6",
        boxShadow: hovered
          ? "0 0 0 1px rgba(59,130,246,0.6), 0 6px 28px rgba(59,130,246,0.6), 0 18px 52px rgba(59,130,246,0.22)"
          : "0 0 0 1px rgba(59,130,246,0.3), 0 4px 18px rgba(59,130,246,0.28)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Shimmer sweep — replays on interval */}
      <motion.span
        key={shimmerKey}
        className="pointer-events-none absolute inset-0"
        initial={{ x: "-150%", skewX: "-20deg" }}
        animate={{ x: "300%" }}
        transition={{ duration: 0.75, ease: "easeInOut" }}
        style={{
          width: "50%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)",
        }}
      />

      {/* Cursor-tracking specular highlight */}
      <span
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle 80px at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.2) 0%, transparent 70%)`,
        }}
      />

      {/* Top-edge shine */}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.5) 50%, transparent)",
        }}
      />

      {/* Inner border */}
      <span className="pointer-events-none absolute inset-0 rounded-full border border-white/[0.12]" />

      {/* Label + arrow */}
      <span className="relative z-10">{children}</span>
      <motion.span
        className="relative z-10"
        animate={{ x: hovered ? 4 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowRight className="w-4 h-4" />
      </motion.span>
    </motion.a>
  );
}
