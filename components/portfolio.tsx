"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import { LightAurora } from "@/components/ui/light-aurora"
import {
  AccordionGallery,
  type AccordionGalleryItem,
} from "@/components/ui/accordion-gallery"

type Project = {
  num: string
  title: string
  category: string
  description: string
  year: string
  tags: string[]
  link?: string
}

const projects: Project[] = [
  {
    num: "01",
    title: "Finova CRM",
    category: "Fintech · SaaS",
    description:
      "CRM a medida para una fintech en crecimiento. Gestión de leads, onboarding automatizado y dashboard en tiempo real.",
    year: "2024",
    tags: ["Next.js", "PostgreSQL", "Stripe"],
  },
  {
    num: "02",
    title: "RetailX Inventory",
    category: "Retail · Automatización",
    description:
      "Sistema de gestión de inventario con alertas inteligentes y sincronización automática con proveedores vía API.",
    year: "2024",
    tags: ["Node.js", "REST API", "React"],
  },
  {
    num: "03",
    title: "EduConnect IA",
    category: "EdTech · Inteligencia Artificial",
    description:
      "Plataforma educativa con tutor IA personalizado. Redujo el trabajo manual del equipo pedagógico en un 70%.",
    year: "2023",
    tags: ["Python", "OpenAI", "React"],
  },
  {
    num: "04",
    title: "LogiTrack",
    category: "Logística · Dashboard",
    description:
      "Panel de control para empresa de logística con seguimiento en tiempo real de flotas y reportes automatizados.",
    year: "2023",
    tags: ["Next.js", "WebSockets", "Maps"],
  },
]

/** Placeholder cover — deep-space gradient + oversized index. Swap for real shots. */
function cover(num: string, a: string, b: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='1200'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='${a}'/>
        <stop offset='1' stop-color='${b}'/>
      </linearGradient>
      <radialGradient id='r' cx='0.3' cy='0.2' r='0.9'>
        <stop offset='0' stop-color='#ffffff' stop-opacity='0.22'/>
        <stop offset='1' stop-color='#ffffff' stop-opacity='0'/>
      </radialGradient>
    </defs>
    <rect width='900' height='1200' fill='url(#g)'/>
    <rect width='900' height='1200' fill='url(#r)'/>
    <text x='60' y='1120' font-family='Google Sans, Arial, sans-serif' font-size='320' font-weight='500' fill='#ffffff' fill-opacity='0.12'>${num}</text>
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const covers = [
  cover("01", "#0b1a42", "#1a4fc0"),
  cover("02", "#12235e", "#3f7dff"),
  cover("03", "#0a1533", "#2a5fd0"),
  cover("04", "#0d1c4a", "#1a4fc0"),
]

const galleryItems: AccordionGalleryItem[] = projects.map((p, i) => ({
  image: covers[i],
  label: p.title,
  meta: p.category,
  alt: `${p.title} — ${p.category}`,
  link: p.link,
}))

export function Portfolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section
      id="proyectos"
      className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-28 lg:py-32"
    >
      <LightAurora intensity={0.7} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Proyectos"
          title="Trabajo real"
          subtitle="Lo que construimos"
          subtitleClassName="mt-4 sm:mt-5"
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <AccordionGallery
            items={galleryItems}
            defaultIndex={0}
            accentColor="#3f7dff"
            height={480}
            trigger="hover"
          />
        </motion.div>
      </div>
    </section>
  )
}
