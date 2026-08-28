"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"

type ClientItem = {
  name: string
  logo: string
  image?: string
}

// Logos de clientes reales
const clients: ClientItem[] = [
  { name: "VeGroup", logo: "VG", image: "/testimonials/vegroup.png" },
  { name: "Stability", logo: "ST", image: "/testimonials/stability.png" },
  { name: "Alfa Club", logo: "AC", image: "/testimonials/alfa-club.png" },
  { name: "OG Circle", logo: "OG", image: "/testimonials/ogcircle.png" },
]

function ClientCard({ client, index, inView }: { client: ClientItem; index: number; inView: boolean }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group flex flex-col items-center gap-2.5"
    >
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-md border border-border/60 bg-surface/50 flex items-center justify-center p-3 hover:border-neon/50 hover:bg-surface hover:shadow-[0_0_20px_rgba(200,255,0,0.08)] transition-all duration-300 overflow-hidden">
        {client.image && !imgError ? (
          <Image
            src={client.image}
            alt={`Logo ${client.name}`}
            fill
            sizes="96px"
            className="object-contain p-2.5 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-xl sm:text-2xl font-black text-muted-foreground group-hover:text-neon transition-colors font-mono">
            {client.logo}
          </span>
        )}
      </div>
      <span className="text-xs text-muted-foreground/80 font-mono tracking-wider transition-colors group-hover:text-foreground">
        {client.name}
      </span>
    </motion.div>
  )
}

export function Clients() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 border-y border-border/40 bg-surface/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-muted-foreground uppercase font-mono">
            Confían en nosotros
          </span>
        </motion.div>

        {/* Logo grid centered */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 md:gap-16">
          {clients.map((client, i) => (
            <ClientCard key={client.name} client={client} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

