"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SpecularButton } from "./SpecularButton";
import { TypewriterHeadline } from "./TypewriterHeadline";
import { StarField } from "./StarField";
import { HeroRibbons } from "./HeroRibbons";
import { Code2, Users, Clock } from "lucide-react";

const LiquidEther = dynamic(() => import("@/components/LiquidEther"), { ssr: false });

const stats = [
  { value: "7", label: "Proyectos", icon: Code2 },
  { value: "100%", label: "Satisfacción", icon: Users },
  { value: "2 años", label: "Experiencia", icon: Clock },
];

const HEADLINE_LINES = [
  {
    text: "Software a medida.",
    className: "text-white justify-center text-[clamp(2.6rem,8.55vw,4.75rem)]",
  },
  {
    text: "Resultados reales.",
    className: "text-[#3f7dff] justify-center text-[clamp(2.6rem,8.55vw,4.75rem)]",
  },
];

export function Hero() {
  const [textCompleted, setTextCompleted] = useState(false);

  return (
    <section className="dark relative min-h-screen px-4 sm:px-6 pt-32 sm:pt-40 pb-24 sm:pb-32 flex flex-col justify-center overflow-hidden bg-background">

      {/* 1. Deep space gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, #0f2678 0%, #091c50 35%, #050f28 68%, #030816 100%)",
        }}
      />

      {/* 2. Ribbons — diagonal flowing gradient waves, weighted toward the bottom */}
      <HeroRibbons />

      {/* 3. Stars — above gradient, below fluid */}
      <StarField count={150} />

      {/* 4. Liquid Ether WebGL fluid */}
      <div className="absolute inset-0">
        <LiquidEther
          colors={["#0b1a42", "#1a4fc0", "#3f7dff", "#bcdcff"]}
          mouseForce={16}
          cursorSize={90}
          clickForce={0.3}
          isViscous={false}
          viscous={30}
          iterationsViscous={12}
          iterationsPoisson={10}
          resolution={0.25}
          BFECC={false}
          isBounce={false}
          autoDemo
          autoSpeed={0.3}
          autoIntensity={0.9}
          takeoverDuration={0.25}
          autoResumeDelay={50}
          autoRampDuration={1.2}
        />
      </div>

      {/* 5. Bottom vignette */}
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

        {/* Brand lockup — logo + wordmark above the headline (enters with the CTAs) */}
        <motion.div
          initial={{ opacity: 0, y: -10, filter: "blur(6px)" }}
          animate={
            textCompleted
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: -10, filter: "blur(6px)" }
          }
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 sm:mb-8 flex items-center justify-center gap-2.5 sm:gap-3"
        >
          <Image
            src="/kei-logo-nuevo.png"
            alt="Kei Software"
            width={36}
            height={36}
            unoptimized
            priority
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
          />
          <span
            className="font-google-sans text-lg sm:text-xl font-[450] tracking-tight text-white"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}
          >
            Kei Software
          </span>
        </motion.div>

        {/* Headline — Antigravity Typewriter Effect */}
        <h1
          className="font-google-sans text-[clamp(2.6rem,8.55vw,4.75rem)] font-[450] tracking-normal mb-8 sm:mb-10 text-center mx-auto max-w-[1100px]"
          style={{
            lineHeight: 1.1,
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

        {/* CTAs — Side-by-side row (Smooth entrance on text completion) */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={
            textCompleted
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 18, filter: "blur(6px)" }
          }
          transition={{
            duration: 0.85,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mx-auto"
        >
          <SpecularButton href="#contacto">Empezá tu proyecto</SpecularButton>

          <a
            href="#proyectos"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[15px] text-white/85 bg-white/[0.06] border border-white/[0.14] backdrop-blur-sm hover:bg-white/[0.1] hover:text-white hover:border-white/[0.22] transition-all duration-200 group select-none"
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
        initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
        animate={
          textCompleted
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 14, filter: "blur(4px)" }
        }
        transition={{
          duration: 0.95,
          delay: 0.25,
          ease: [0.16, 1, 0.3, 1],
        }}
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
                    <span className="font-google-sans text-2xl sm:text-[2rem] font-[450] text-white leading-none tracking-tight">
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
