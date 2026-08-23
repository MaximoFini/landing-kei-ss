import Image from "next/image"
import { Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <a href="#" className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/logo.png"
                alt="Kei Software logo"
                width={32}
                height={32}
                className="w-7 h-7 sm:w-8 sm:h-8"
              />
              <span className="font-bold text-sm sm:text-base text-foreground tracking-tight">
                Kei <span className="text-neon">Software</span>
              </span>
            </a>
            <p className="text-xs text-muted-foreground">
              Córdoba, Argentina — Remoto global
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-4 sm:gap-6" aria-label="Footer navigation">
            {[
              { label: "Servicios", href: "#servicios" },
              { label: "Proceso", href: "#proceso" },
              { label: "Proyectos", href: "#proyectos" },
              { label: "Contacto", href: "#contacto" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-neon transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social + contact */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <a
              href="mailto:keiisolutions2@gmail.com"
              className="text-xs text-muted-foreground hover:text-neon transition-colors font-mono break-all"
            >
              keiisolutions2@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/company/keii-solutions"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Kei Software"
              className="w-8 h-8 rounded-sm border border-border flex items-center justify-center text-muted-foreground hover:text-neon hover:border-neon/50 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-border/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-[11px] text-muted-foreground">
            &copy; {new Date().getFullYear()} Kei Software. Todos los derechos reservados.
          </p>
          <p className="text-[11px] text-muted-foreground">
            Primera consulta sin cargo
            <span className="text-neon ml-1">— siempre.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
