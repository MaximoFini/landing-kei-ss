import Image from "next/image"
import { Linkedin } from "lucide-react"

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
]

export function Footer() {
  return (
    <footer className="dark relative overflow-hidden border-t border-white/10 bg-background pt-14 sm:pt-20">
      {/* ─── Giant wordmark — same typeface as the hero headline ─── */}
      <div className="px-4 sm:px-6">
        <div className="max-w-[1600px] mx-auto">
          <p
            className="font-google-sans font-[450] leading-[0.8] tracking-[-0.04em] whitespace-nowrap text-[clamp(3.25rem,15.5vw,14rem)] select-none"
            style={{ lineHeight: 0.8 }}
            aria-hidden="true"
          >
            <span className="text-white">Kei</span>{" "}
            <span className="text-[#3f7dff]">Software</span>
          </p>
        </div>
      </div>

      {/* ─── Detail bar ─── */}
      <div className="mt-10 sm:mt-14 border-t border-white/10 px-4 sm:px-6 py-8 sm:py-10">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Logo */}
          <div className="flex flex-col gap-2">
            <a href="#" className="flex items-center gap-2.5">
              <Image
                src="/kei-logo-nuevo.png"
                alt="Kei Software logo"
                width={32}
                height={32}
                loading="lazy"
                className="w-7 h-7 sm:w-8 sm:h-8"
              />
              <span className="font-google-sans text-sm sm:text-base text-white tracking-tight">
                Kei Software
              </span>
            </a>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact + social */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:contacto@keisoftware.dev"
              className="text-xs text-white/50 hover:text-white transition-colors font-mono break-all"
            >
              contacto@keisoftware.dev
            </a>
            <a
              href="https://www.linkedin.com/company/keii-solutions"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Kei Software"
              className="w-8 h-8 rounded-sm border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-[11px] text-white/35">
            &copy; {new Date().getFullYear()} Kei Software. Todos los derechos reservados.
          </p>
          <p className="text-[11px] text-white/35">
            Primera consulta sin cargo
            <span className="text-[#3f7dff] ml-1">— siempre.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
