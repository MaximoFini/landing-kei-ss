"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function SplitText({ text, className = "", delay = 0, stagger = 0.03 }: SplitTextProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Ensure animation only fires after client-side hydration
    const timeout = setTimeout(() => setShouldAnimate(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  const words = text.split(" ");
  let letterCount = 0;

  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="whitespace-nowrap mr-[0.25em] last:mr-0 flex">
          {word.split("").map((char, charIndex) => {
            const currentDelay = delay + letterCount * stagger;
            letterCount++;

            return (
              <motion.span
                key={charIndex}
                className="inline-block"
                initial={{ y: 30, opacity: 0, filter: "blur(10px)" }}
                animate={
                  shouldAnimate
                    ? { y: 0, opacity: 1, filter: "blur(0px)" }
                    : { y: 30, opacity: 0, filter: "blur(10px)" }
                }
                transition={{
                  duration: 0.6,
                  delay: currentDelay,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </div>
  );
}
