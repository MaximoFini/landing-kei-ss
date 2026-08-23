"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"

type Project = {
  num: string
  title: string
  category: string
  description: string
  year: string
  tags: string[]
  image?: string
  link?: string
}

const projects: Project[] = [
  {
    num: "01",
    title: "Finova CRM",
    category: "Fintech · SaaS",
    description: "CRM a medida para una fintech en crecimiento. Gestión de leads, onboarding automatizado y dashboard en tiempo real.",
    year: "2024",
    tags: ["Next.js", "PostgreSQL", "Stripe"],
    image: undefined,
    link: undefined,
  },
  {
    num: "02",
    title: "RetailX Inventory",
    category: "Retail · Automatización",
    description: "Sistema de gestión de inventario con alertas inteligentes y sincronización automática con proveedores vía API.",
    year: "2024",
    tags: ["Node.js", "REST API", "React"],
    image: undefined,
    link: undefined,
  },
  {
    num: "03",
    title: "EduConnect IA",
    category: "EdTech · Inteligencia Artificial",
    description: "Plataforma educativa con tutor IA personalizado. Redujo el trabajo manual del equipo pedagógico en un 70%.",
    year: "2023",
    tags: ["Python", "OpenAI", "React"],
    image: undefined,
    link: undefined,
  },
  {
    num: "04",
    title: "LogiTrack",
    category: "Logística · Dashboard",
    description: "Panel de control para empresa de logística con seguimiento en tiempo real de flotas y reportes automatizados.",
    year: "2023",
    tags: ["Next.js", "WebSockets", "Maps"],
    image: undefined,
    link: undefined,
  },
]

function ProjectRow({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const hasLink = Boolean(project.link)
  const isExternal = hasLink && /^https?:\/\//.test(project.link!)

  const rowClassName = hasLink
    ? "group grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-4 sm:gap-6 lg:gap-10 py-6 sm:py-8 items-start border-b border-border/40 last:border-0 hover:bg-surface/50 -mx-2 sm:-mx-4 px-2 sm:px-4 transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-neon/50"
    : "grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-4 sm:gap-6 lg:gap-10 py-6 sm:py-8 items-start border-b border-border/40 last:border-0 -mx-2 sm:-mx-4 px-2 sm:px-4 rounded-sm"

  const content = (
    <>
      {/* Number */}
      <span className="text-xs font-mono text-muted-foreground pt-1 w-6 hidden sm:block">
        {project.num}
      </span>

      {/* Content */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-3 sm:gap-4 lg:gap-12">
        <div className="lg:w-52 flex-shrink-0">
          <h3
            className={`text-base sm:text-lg font-bold text-foreground transition-colors ${hasLink ? "group-hover:text-neon" : ""}`}
          >
            {project.title}
          </h3>
          <p className="text-[10px] font-mono text-muted-foreground mt-1 tracking-wide">
            {project.category}
          </p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
          {project.description}
        </p>
      </div>

      {/* Year + tags + arrow */}
      <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 justify-between sm:justify-start">
        <span className="text-xs font-mono text-muted-foreground">{project.year}</span>
        <div className="flex sm:hidden lg:flex flex-wrap justify-end gap-1.5 max-w-[160px]">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[9px] sm:text-[10px] tracking-wider font-mono border border-border text-muted-foreground rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        {hasLink && (
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-neon transition-colors" />
        )}
      </div>
    </>
  )

  if (hasLink) {
    return (
      <motion.a
        ref={ref}
        href={project.link}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className={rowClassName}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={rowClassName}
    >
      {content}
    </motion.div>
  )
}

export function Portfolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="proyectos" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-surface/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-16 pb-4 sm:pb-6 border-b border-border/40"
        >
          <div>
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-neon uppercase font-mono">
              Proyectos
            </span>
            <h2 className="mt-2 sm:mt-3 text-3xl sm:text-5xl lg:text-6xl font-black text-foreground uppercase tracking-tight leading-none">
              Trabajo<br />real
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
            Algunos de los productos que construimos y lanzamos con nuestros clientes.
          </p>
        </motion.div>

        <div>
          {projects.map((project, i) => (
            <ProjectRow key={project.num} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
