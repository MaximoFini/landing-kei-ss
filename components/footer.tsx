import Image from "next/image"
import { Linkedin, Instagram, Mail } from "lucide-react"

const socialLinks = [
  {
    label: "Enviar un email a KEI Software",
    href: "mailto:contacto@keisoftware.dev",
    icon: Mail,
    external: false,
  },
  {
    label: "Instagram de KEI Software",
    href: "https://instagram.com/keisoftware",
    icon: Instagram,
    external: true,
  },
  {
    label: "LinkedIn de KEI Software",
    href: "https://www.linkedin.com/company/keii-solutions",
    icon: Linkedin,
    external: true,
  },
]

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
            <span className="text-white">KEI</span>{" "}
            <span className="text-[#3f7dff]">Software</span>
          </p>
        </div>
      </div>

      {/* ─── Detail bar ─── */}
      <div className="mt-10 sm:mt-14 border-t border-white/10 px-4 sm:px-6 py-8 sm:py-10">
        <div className="max-w-[1600px] mx-auto flex flex-col items-center gap-8 text-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <Image
              src="/kei-logo-nuevo.png"
              alt="KEI Software logo"
              width={32}
              height={32}
              loading="lazy"
              className="w-7 h-7 sm:w-8 sm:h-8"
            />
            <span className="font-google-sans text-sm sm:text-base text-white tracking-tight">
              KEI Software
            </span>
          </a>

          {/* Nav */}
          <nav
            className="flex flex-wrap justify-center gap-x-6 gap-y-2"
            aria-label="Footer navigation"
          >
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
          <div className="flex items-center justify-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="w-9 h-9 rounded-sm border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto mt-8 pt-6 border-t border-white/[0.06] flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4">
          <p className="text-[11px] text-white/35">
            &copy; {new Date().getFullYear()} KEI Software. Todos los derechos reservados.
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
