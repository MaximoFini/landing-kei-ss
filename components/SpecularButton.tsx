"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SpecularButtonProps {
  href: string;
  children: React.ReactNode;
}

export function SpecularButton({ href, children }: SpecularButtonProps) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.045 }}
      whileTap={{ scale: 0.96 }}
      className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-white text-[15px] select-none"
      style={{ backgroundColor: "#3f7dff" }}
    >
      <span>{children}</span>
      <motion.span
        className="group-hover:translate-x-1 transition-transform duration-200"
      >
        <ArrowRight className="w-4 h-4" />
      </motion.span>
    </motion.a>
  );
}
