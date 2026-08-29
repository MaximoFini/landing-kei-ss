"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { LogoLoop } from "@/components/ui/logo-loop"

type ClientItem = {
  name: string
  logo: string
  image?: string
}

const clients: ClientItem[] = [
  { name: "VeGroup", logo: "VG", image: "/testimonials/vegroup.png" },
  { name: "Stability", logo: "ST", image: "/testimonials/stability.png" },
  { name: "Alfa Club", logo: "AC", image: "/testimonials/alfa-club.png" },
  { name: "OG Circle", logo: "OG", image: "/testimonials/ogcircle.png" },
]

function ClientLogo({ client }: { client: ClientItem }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="group flex items-center gap-3">
      <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-black/[0.07] bg-white transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#3f7dff]/35 group-hover:shadow-[0_12px_30px_-12px_rgba(63,125,255,0.4)]">
        {client.image && !imgError ? (
          <Image
            src={client.image}
            alt={`Logo ${client.name}`}
            fill
            sizes="56px"
            className="object-contain p-2 opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="font-mono text-lg font-bold text-black/40 transition-colors group-hover:text-[#3f7dff]">
            {client.logo}
          </span>
        )}
      </div>
      <span className="font-google-sans text-sm font-[450] text-black/45 transition-colors group-hover:text-[#0a0e1a]">
        {client.name}
      </span>
    </div>
  )
}

export function Clients() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="border-y border-black/[0.06] bg-white px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-9 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-black/40 sm:text-[11px]"
        >
          Confían en nosotros
        </motion.p>

        <LogoLoop duration={26} gap={64} repeat={3}>
          {clients.map((c) => (
            <ClientLogo key={c.name} client={c} />
          ))}
        </LogoLoop>
      </div>
    </section>
  )
}
