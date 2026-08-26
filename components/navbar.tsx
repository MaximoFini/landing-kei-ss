"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [blobStyle, setBlobStyle] = useState<{ left: number; width: number }>({ left: 4, width: 90 });
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const updateBlob = (index: number) => {
    const el = itemRefs.current[index];
    const container = pillRef.current;
    if (!el || !container) return;
    const cr = container.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    setBlobStyle({ left: er.left - cr.left, width: er.width });
  };

  useEffect(() => { updateBlob(activeIndex); }, [activeIndex]);

  // Set initial blob on mount
  useEffect(() => {
    const id = setTimeout(() => updateBlob(0), 80);
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavClick = (index: number, href: string) => {
    setActiveIndex(index);
    if (href.startsWith("/")) {
      window.location.href = href;
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* SVG gooey filter */}
      <svg className="fixed w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <filter id="pill-gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
            <feColorMatrix in="b" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -12" />
          </filter>
        </defs>
      </svg>

      <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.nav
            animate={{
              boxShadow: scrolled
                ? "0 8px 32px -8px rgba(0,0,0,0.12)"
                : "0 2px 16px -8px rgba(0,0,0,0.06)",
            }}
            transition={{ duration: 0.35 }}
            className={`h-14 sm:h-16 px-2 flex items-center justify-between rounded-full border border-black/[0.06] backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 ${
              scrolled ? "bg-white/96" : "bg-white/82"
            }`}
          >
            {/* Logo */}
            <div className="flex-1 flex items-center pl-2 sm:pl-3">
              <a
                href="#"
                onClick={() => setActiveIndex(0)}
                className="flex items-center gap-2.5"
              >
                <Image
                  src="/logo.png"
                  alt="Kei Software"
                  width={32}
                  height={32}
                  unoptimized
                  priority
                  className="w-8 h-8 rounded-full shadow-sm"
                />
                <span className="font-bold text-sm sm:text-base tracking-tight text-black">
                  Kei Software
                </span>
              </a>
            </div>

            {/* PillNav — each item in its own pill */}
            <nav
              ref={pillRef}
              className="hidden md:flex items-center relative bg-black/[0.055] rounded-full p-1"
              aria-label="Navegación principal"
            >
              {/* Gooey blob layer (filtered) */}
              <div
                className="absolute inset-1 pointer-events-none overflow-visible rounded-full"
                style={{ filter: "url(#pill-gooey)" }}
              >
                <motion.div
                  className="absolute top-0 bottom-0 bg-white rounded-full shadow-sm"
                  animate={{ left: blobStyle.left - 4, width: blobStyle.width }}
                  transition={{ type: "spring", stiffness: 480, damping: 36, mass: 0.85 }}
                />
              </div>

              {/* Nav items */}
              {navLinks.map((link, i) => (
                <button
                  key={link.href}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  onClick={() => handleNavClick(i, link.href)}
                  className={`relative z-10 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                    activeIndex === i
                      ? "text-black"
                      : "text-black/50 hover:text-black/75"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* CTA */}
            <div className="flex-1 flex items-center justify-end pr-1 sm:pr-2">
              <a
                href="#contacto"
                className="hidden md:inline-flex items-center justify-center px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all shadow-sm ring-1 ring-black/10 hover:scale-105 active:scale-95"
              >
                Consultar
              </a>
              <button
                className="md:hidden p-2 text-black/70 hover:text-black transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </motion.nav>

          {/* Mobile menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="md:hidden mt-3 rounded-3xl border border-black/5 bg-white shadow-xl overflow-hidden"
              >
                <ul className="flex flex-col px-4 py-4 gap-1">
                  {navLinks.map((link, idx) => (
                    <li key={link.href}>
                      <button
                        onClick={() => { handleNavClick(idx, link.href); setMenuOpen(false); }}
                        className={`w-full text-left px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                          idx === activeIndex
                            ? "bg-black/5 text-black"
                            : "text-black/60 hover:bg-black/5"
                        }`}
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                  <li className="pt-3 mt-1 border-t border-black/5">
                    <a
                      href="#contacto"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center px-6 py-3 rounded-full bg-black text-white text-sm font-medium w-full"
                    >
                      Primera consulta gratis
                    </a>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
