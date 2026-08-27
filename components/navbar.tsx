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
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 pointer-events-none">
        <div className="max-w-5xl mx-auto pointer-events-auto">
          <motion.nav
            animate={{
              boxShadow: scrolled
                ? "0 12px 36px -8px rgba(0,0,0,0.12), inset 0 1px 1px 0 rgba(255,255,255,0.8)"
                : "0 4px 20px -6px rgba(0,0,0,0.08), inset 0 1px 1px 0 rgba(255,255,255,0.45)",
              borderColor: scrolled
                ? "rgba(0, 0, 0, 0.08)"
                : "rgba(255, 255, 255, 0.22)",
              backgroundColor: scrolled
                ? "rgba(255, 255, 255, 0.82)"
                : "rgba(255, 255, 255, 0.55)",
            }}
            transition={{ duration: 0.25 }}
            className="h-14 sm:h-16 px-2 flex items-center justify-between rounded-full border backdrop-blur-xl transition-all duration-300 will-change-transform"
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

            {/* PillNav — smooth spring animated indicator */}
            <nav
              ref={pillRef}
              className="hidden md:flex items-center relative bg-black/[0.04] rounded-full p-1 border border-black/[0.03]"
              aria-label="Navegación principal"
            >
              {/* Smooth indicator */}
              <motion.div
                className="absolute top-1 bottom-1 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] pointer-events-none"
                animate={{ left: blobStyle.left, width: blobStyle.width }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />

              {/* Nav items */}
              {navLinks.map((link, i) => (
                <button
                  key={link.href}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  onClick={() => handleNavClick(i, link.href)}
                  className={`relative z-10 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                    activeIndex === i
                      ? "text-black"
                      : "text-black/55 hover:text-black/80"
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
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="md:hidden mt-3 rounded-3xl border border-white/40 bg-white/80 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_16px_40px_rgba(0,0,0,0.12),_inset_0_1px_1px_rgba(255,255,255,0.7)] overflow-hidden"
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
