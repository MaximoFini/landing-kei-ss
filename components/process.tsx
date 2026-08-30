"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { MessageSquare, FileCheck, Code, Rocket, ArrowRight } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { DotGrid } from "@/components/ui/dot-grid"
import { BorderBeam } from "@/components/ui/border-beam"

const steps = [
  {
    num: "01",
    icon: MessageSquare,
    title: "Consulta gratuita",
    description:
      "Hablamos 30 minutos sin compromiso. Entendemos tu problema, tus objetivos y si podemos ayudarte.",
  },
  {
    num: "02",
    icon: FileCheck,
    title: "Propuesta clara",
    description:
      "Recibís un documento detallado con alcance, cronograma, tecnologías y precio fijo. Sin sorpresas.",
  },
  {
    num: "03",
    icon: Code,
    title: "Desarrollo ágil",
    description:
      "Construimos en sprints cortos con demos semanales. Siempre sabés en qué estamos trabajando.",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Entrega y soporte",
    description:
      "Lanzamos tu producto, te capacitamos y damos soporte técnico incluido durante el primer mes.",
  },
]

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const Icon = step.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[0_2px_16px_-8px_rgba(10,14,26,0.08)] dark:shadow-[0_2px_16px_-8px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] duration-300 hover:border-[#3f7dff]/35 hover:shadow-[0_24px_60px_-20px_rgba(63,125,255,0.35)]"
    >
      <BorderBeam
        size={70}
        duration={7 + index}
        delay={index * 1.2}
        colorFrom="#bcdcff"
        colorTo="#3f7dff"
        borderWidth={1.5}
      />

      {/* Light wash from the top on hover */}
      <div
        className="pointer-events-none absolute inset-0 [clip-path:circle(0%_at_50%_0%)] transition-[clip-path] duration-700 ease-out group-hover:[clip-path:circle(150%_at_50%_0%)]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(63,125,255,0.22) 0%, rgba(63,125,255,0.08) 60%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#3f7dff]/20 bg-[#3f7dff]/10 transition-all duration-300 group-hover:border-[#3f7dff]/40 group-hover:bg-[#3f7dff]/15 group-hover:shadow-[0_0_20px_rgba(63,125,255,0.35)]">
          <Icon className="h-5 w-5 text-[#3f7dff]" />
        </div>
        <span className="font-google-sans text-3xl font-[450] text-foreground/[0.08] transition-colors duration-300 group-hover:text-[#3f7dff]/25">
          {step.num}
        </span>
      </div>

      <div className="relative z-10 flex-1">
        <h3 className="mb-2 font-google-sans text-lg font-[450] text-foreground">
          {step.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
      </div>
    </motion.div>
  )
}

export function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section
      id="proceso"
      className="relative overflow-hidden bg-[#fafbff] dark:bg-background px-4 pt-16 pb-12 sm:px-6 sm:pt-24 sm:pb-14 lg:pt-28 lg:pb-16"
    >
      <DotGrid
        className="opacity-70"
        gap={38}
        proximity={140}
        baseColor="#dbe4f7"
        activeColor="#3f7dff"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Proceso"
          title="Cómo trabajamos"
          subtitle="De la idea al producto"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 sm:mt-10 flex justify-center"
        >
          <a
            href="#contacto"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#3f7dff] px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:bg-[#2f6bec] active:scale-95"
          >
            Empezá - Primer consulta gratis
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
