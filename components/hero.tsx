"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SpecularButton } from "./SpecularButton";
import { TypewriterHeadline } from "./TypewriterHeadline";
import { StarField } from "./StarField";
import { Code2, Users, Clock } from "lucide-react";

const LiquidEther = dynamic(() => import("@/components/LiquidEther"), { ssr: false });

const stats = [
  { value: "7", label: "Proyectos", icon: Code2 },
  { value: "100%", label: "Satisfacción", icon: Users },
  { value: "2 años", label: "Experiencia", icon: Clock },
];

const HEADLINE_LINES = [
  { text: "Software a medida.", className: "text-white justify-center" },
  { text: "Resultados reales.", className: "text-[#3f7dff] mt-1 justify-center" },
];

export function Hero() {
  const [textCompleted, setTextCompleted] = useState(false);

  return (
    <section className="dark relative min-h-screen px-4 sm:px-6 pt-44 sm:pt-56 pb-24 sm:pb-32 flex flex-col justify-center overflow-hidden bg-background">

      {/* 1. Deep space gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, #0f2678 0%, #091c50 35%, #050f28 68%, #030816 100%)",
        }}
      />

      {/* 2. Stars — above gradient, below fluid */}
      <StarField count={150} />

      {/* 3. Liquid Ether WebGL fluid */}
      <div className="absolute inset-0">
        <LiquidEther
          colors={["#0b1a42", "#1a4fc0", "#3f7dff", "#bcdcff"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={12}
          iterationsPoisson={10}
          resolution={0.25}
          BFECC={false}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.0}
          takeoverDuration={0.25}
          autoResumeDelay={50}
          autoRampDuration={1.2}
        />
      </div>

      {/* 4. Bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 110%, rgba(2,6,18,0.65) 0%, transparent 65%)",
        }}
      />

      {/* Top rule */}
      <div className="absolute top-20 sm:top-24 left-4 sm:left-6 right-4 sm:right-6 h-px bg-white/[0.08]" />

      {/* ─── Main content ─── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center text-center my-auto">

        {/* Headline — Antigravity Typewriter Effect */}
        <h1
          className="font-instrument text-[clamp(2.9rem,12vw,7rem)] font-bold tracking-tight uppercase mb-8 sm:mb-10 text-center mx-auto"
          style={{
            lineHeight: 1.02,
            textShadow: "0 2px 10px rgba(0,0,0,0.85), 0 8px 30px rgba(2,6,18,0.6)",
          }}
        >
          <TypewriterHeadline
            lines={HEADLINE_LINES}
            startDelay={80}
            typingSpeed={22}
            linePause={100}
            cursorColor="#3f7dff"
            onComplete={() => setTextCompleted(true)}
          />
        </h1>

        {/* CTAs — Stacked Vertically & Centered (Appears on text completion) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={textCompleted ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center gap-3.5 mx-auto"
        >
          <SpecularButton href="#contacto">Empezá tu proyecto</SpecularButton>

          <a
            href="#proyectos"
            className="inline-flex items-center justify-center gap-2 text-sm sm:text-[15px] font-medium text-white/50 hover:text-white/80 transition-colors duration-200 group pt-1"
          >
            Ver proyectos
            <svg
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* ─── Stats bar — pinned to bottom ─── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={textCompleted ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="absolute inset-x-0 bottom-8 sm:bottom-12 z-10 px-4 sm:px-6 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-0">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center">
                  {/* Stat card */}
                  <div className="flex flex-col items-center gap-1.5 px-8 sm:px-12">
                    <Icon className="w-3.5 h-3.5 text-white/25 mb-0.5" />
                    <span className="text-2xl sm:text-[2rem] font-black text-white leading-none tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-white/30 tracking-[0.2em] uppercase font-mono">
                      {stat.label}
                    </span>
                  </div>
                  {/* Divider — except after last */}
                  {i < stats.length - 1 && (
                    <div className="h-8 w-px bg-white/[0.08]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
