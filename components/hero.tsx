"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SpecularButton } from "./SpecularButton";
import { WarpText } from "./WarpText";
import { StarField } from "./StarField";
import { Code2, Users, Clock } from "lucide-react";

const LiquidEther = dynamic(() => import("@/components/LiquidEther"), { ssr: false });

const stats = [
  { value: "53+", label: "Proyectos", icon: Code2 },
  { value: "97%", label: "Satisfacción", icon: Users },
  { value: "3.5a", label: "Experiencia", icon: Clock },
];

export function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="dark relative min-h-screen px-4 sm:px-6 pt-36 sm:pt-44 overflow-hidden bg-background">

      {/* 1. Deep space gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, #0f2678 0%, #091c50 35%, #050f28 68%, #030816 100%)",
        }}
      />

      {/* 2. Stars — above gradient, below fluid */}
      <StarField count={200} />

      {/* 3. Liquid Ether WebGL fluid */}
      <div className="absolute inset-0">
        <LiquidEther
          colors={["#0b1a42", "#1a4fc0", "#3f7dff", "#bcdcff"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={16}
          iterationsPoisson={16}
          resolution={0.3}
          BFECC={false}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={50}
          autoRampDuration={1.4}
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
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col">

        {/* Badge — clean, no pulsing dot */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 sm:mb-9"
        >
          <span className="inline-flex items-center gap-3 text-xs sm:text-[13px] text-white/50 font-mono tracking-[0.18em] uppercase">
            <span className="w-6 h-px bg-white/25" />
            +50 proyectos entregados · 97% de satisfacción
            <span className="w-6 h-px bg-white/25" />
          </span>
        </motion.div>

        {/* Headline — WarpText word by word */}
        <h1
          className="text-[clamp(2.9rem,12vw,7rem)] font-black tracking-tight uppercase mb-6 sm:mb-8"
          style={{
            lineHeight: 1.02,
            filter:
              "drop-shadow(0 2px 4px rgba(2,6,18,0.9)) drop-shadow(0 12px 32px rgba(2,6,18,0.55))",
          }}
        >
          <WarpText
            text="Software a medida."
            delay={0.18}
            wordDelay={0.1}
            className="text-white"
          />
          <WarpText
            text="Resultados reales."
            delay={0.62}
            wordDelay={0.1}
            className="text-[#3f7dff] mt-1"
          />
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg text-white/50 max-w-lg leading-relaxed mb-10 sm:mb-12"
        >
          Convertimos ideas en productos digitales que generan resultados medibles para tu negocio.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-5"
        >
          <SpecularButton href="#contacto">Empezá tu proyecto</SpecularButton>

          <a
            href="#proyectos"
            className="inline-flex items-center gap-2 text-sm sm:text-[15px] font-medium text-white/50 hover:text-white/80 transition-colors duration-200 group"
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
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 2.0 }}
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
