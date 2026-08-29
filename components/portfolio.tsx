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
  image?: string
  position?: string
  link?: string
}

const projects: Project[] = [
  {
    num: "01",
    title: "Stability",
    category: "Salud & Fitness · Plataforma Web",
    description:
      "Plataforma web y sistema a medida para gestión de clientes, turnos y seguimiento personalizado en centros de entrenamiento.",
    year: "2024",
    tags: ["Next.js", "React", "PostgreSQL", "Node.js"],
    image: "/proyectos/proyecto-stability.png",
    position: "left center",
    link: "https://stabilityar.com/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAaceaWnFnfCoqVO76BfBRKMwlMO89rbSQLEgolV77Z21tOHTH14LBxkeRENugQ_aem_1hd5xYp3UMkRlP21J1zNNQ",
  },
  {
    num: "02",
    title: "OG Circle",
    category: "Plataforma Web · Digital Experience",
    description:
      "Plataforma interactiva con diseño de alto impacto visual, arquitectura escalable y rendimiento optimizado.",
    year: "2024",
    tags: ["Next.js", "React", "TypeScript", "TailwindCSS"],
    image: "/proyectos/proyecto-og-circle-1.png",
    position: "center center",
    link: "https://ogcircle.vercel.app/#top",
  },
  {
    num: "03",
    title: "Alfa Club",
    category: "Gestión Deportiva · Sistema Web",
    description:
      "Sistema a medida para la administración integral, control de socios, turnos y finanzas de centro deportivo y gimnasio.",
    year: "2024",
    tags: ["Next.js", "React", "Node.js", "PostgreSQL"],
    image: "/proyectos/proyecto-alfa-club-1.jpg",
    position: "center center",
    link: "https://www.instagram.com/alfa.mma.team/",
  },
  {
    num: "04",
    title: "Centro Automotores LB",
    category: "Automotriz · Plataforma Web",
    description:
      "Sitio web y catálogo digital para concesionaria líder, optimizando la exhibición de vehículos y captación de clientes.",
    year: "2024",
    tags: ["Next.js", "React", "TypeScript", "TailwindCSS"],
    image: "/proyectos/proyecto-centro-automotores-1.jpg",
    position: "center center",
    link: "https://www.instagram.com/centro_automotores/",
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
  image: p.image || covers[i],
  label: p.title,
  meta: p.category,
  alt: `${p.title} — ${p.category}`,
  position: p.position,
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
          title="Portfolio"
          subtitle="Lo que construimos"
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <AccordionGallery
            items={galleryItems}
            defaultIndex={1}
            accentColor="#3f7dff"
            height={480}
            trigger="hover"
          />
        </motion.div>
      </div>
    </section>
  )
}
