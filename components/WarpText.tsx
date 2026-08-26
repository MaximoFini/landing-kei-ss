"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface WarpTextProps {
  text: string;
  delay?: number;
  wordDelay?: number;
  className?: string;
  as?: "h1" | "h2" | "p" | "span" | "div";
}

export function WarpText({
  text,
  delay = 0,
  wordDelay = 0.11,
  className = "",
}: WarpTextProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  const words = text.split(" ");

  return (
    // perspective enables the 3-D flip
    <div className={`flex flex-wrap ${className}`} style={{ perspective: "700px" }}>
      {words.map((word, i) => (
        // overflow:hidden acts as the "mask" — text invisible outside its bounding box
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.22em] last:mr-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.span
            className="inline-block origin-bottom"
            initial={{ rotateX: -88, y: "30%", opacity: 0 }}
            animate={
              ready
                ? { rotateX: 0, y: "0%", opacity: 1 }
                : { rotateX: -88, y: "30%", opacity: 0 }
            }
            transition={{
              rotateX: {
                duration: 0.75,
                delay: delay + i * wordDelay,
                ease: [0.16, 1, 0.3, 1],
              },
              y: {
                duration: 0.75,
                delay: delay + i * wordDelay,
                ease: [0.16, 1, 0.3, 1],
              },
              opacity: {
                duration: 0.3,
                delay: delay + i * wordDelay,
                ease: "easeOut",
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
