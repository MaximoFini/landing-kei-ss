"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Equipo", href: "#equipo" },
  { label: "Contacto", href: "#contacto" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [blobStyle, setBlobStyle] = useState<{ left: number; width: number }>({ left: 4, width: 90 });
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pillRef = useRef<HTMLDivElement>(null);
  const clickLockRef = useRef(0);

  // Scroll state + scrollspy: highlight the section currently in view
  useEffect(() => {
    const sections = navLinks
      .map((l, i) =>
        l.href.startsWith("#") ? { i, el: document.getElementById(l.href.slice(1)) } : null
      )
      .filter((s): s is { i: number; el: HTMLElement } => !!s && !!s.el);

    const onScroll = () => {
      setScrolled(window.scrollY > 12);

      // Ignore while a click-triggered smooth scroll is settling
      if (Date.now() - clickLockRef.current < 700 || sections.length === 0) return;

      const probe = window.scrollY + window.innerHeight * 0.32;
      let current = sections[0].i;
      for (const s of sections) {
        if (s.el.offsetTop <= probe) current = s.i;
      }
      // Snap to the last section only when genuinely scrolled to the bottom
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 200 && window.scrollY >= maxScroll - 4) {
        current = sections[sections.length - 1].i;
      }
      setActiveIndex((prev) => (prev === current ? prev : current));
    };

    onScroll();
    // Recompute once layout has settled (fonts, images, hero animation)
    const t1 = setTimeout(onScroll, 300);
    const t2 = setTimeout(onScroll, 1200);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", onScroll);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", onScroll);
    };
  }, []);

  const updateBlob = (index: number) => {
    const el = itemRefs.current[index];
    const container = pillRef.current;
    if (!el || !container) return;
    const cr = container.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    setBlobStyle({ left: er.left - cr.left, width: er.width });
  };

  // Follow hovered item when hovering, otherwise rest on the active item
  useEffect(() => {
    updateBlob(hoverIndex ?? activeIndex);
  }, [activeIndex, hoverIndex]);

  // Set initial blob on mount
  useEffect(() => {
    const id = setTimeout(() => updateBlob(0), 80);
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock body scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const handleNavClick = (index: number, href: string) => {
    setActiveIndex(index);
    if (href.startsWith("/")) {
      window.location.href = href;
    } else {
      clickLockRef.current = Date.now();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const indicatorIndex = hoverIndex ?? activeIndex;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] pt-4 px-4 sm:px-6 pointer-events-none">
        <div className="font-google-sans max-w-5xl mx-auto pointer-events-auto">
          <motion.nav
            animate={{
              boxShadow: scrolled
                ? "0 20px 50px -12px rgba(15,23,42,0.22), 0 2px 8px -2px rgba(15,23,42,0.10), inset 0 1px 1px 0 rgba(255,255,255,0.90), inset 0 -1px 2px 0 rgba(255,255,255,0.35)"
                : "0 10px 34px -10px rgba(15,23,42,0.14), inset 0 1px 1px 0 rgba(255,255,255,0.70), inset 0 -1px 2px 0 rgba(255,255,255,0.25)",
              borderColor: scrolled
                ? "rgba(255, 255, 255, 0.55)"
                : "rgba(255, 255, 255, 0.35)",
              backgroundColor: scrolled
                ? "rgba(255, 255, 255, 0.55)"
                : "rgba(255, 255, 255, 0.34)",
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-14 sm:h-16 px-2 flex items-center justify-between rounded-full border backdrop-blur-2xl backdrop-saturate-[1.8] transition-all duration-300 will-change-transform overflow-hidden isolate"
          >
            {/* ── Glass layers ─────────────────────────────── */}
            {/* top specular highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/70 via-white/20 to-transparent" />
            {/* diagonal sheen */}
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(115deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_28%,rgba(255,255,255,0)_60%,rgba(255,255,255,0.30)_100%)]" />
            {/* subtle color refraction */}
            <div className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(60%_120%_at_15%_0%,rgba(99,102,241,0.14),transparent_60%),radial-gradient(60%_120%_at_85%_100%,rgba(56,189,248,0.12),transparent_60%)]" />
            {/* crisp inner rim */}
            <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/40" />

            {/* Logo */}
            <div className="relative z-10 flex-1 flex items-center pl-2 sm:pl-3">
              <a
                href="#"
                onClick={() => setActiveIndex(0)}
                className="flex items-center gap-2.5"
              >
                <Image
                  src="/kei-logo-nuevo.png"
                  alt="KEI Software"
                  width={32}
                  height={32}
                  priority
                  className="w-8 h-8 object-contain"
                />
                <span className="text-sm sm:text-base tracking-tight text-black">
                  KEI Software
                </span>
              </a>
            </div>

            {/* PillNav — glassy indicator that follows hover + active */}
            <nav
              ref={pillRef}
              onMouseLeave={() => setHoverIndex(null)}
              className="relative z-10 hidden lg:flex items-center bg-white/25 rounded-full p-1 border border-white/40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),inset_0_-1px_2px_rgba(15,23,42,0.04)] backdrop-blur-md overflow-hidden"
              aria-label="Navegación principal"
            >
              {/* Coloured glow trailing the indicator */}
              <motion.div
                className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-indigo-400/35 via-sky-400/35 to-violet-400/35 blur-sm pointer-events-none"
                animate={{ left: blobStyle.left, width: blobStyle.width }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />

              {/* Glass indicator */}
              <motion.div
                className="absolute top-1 bottom-1 rounded-full pointer-events-none overflow-hidden bg-white/70 ring-1 ring-white/70 shadow-[0_4px_14px_rgba(15,23,42,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] backdrop-blur-sm"
                animate={{ left: blobStyle.left, width: blobStyle.width }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/40" />
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/80 to-transparent" />
              </motion.div>

              {/* Nav items */}
              {navLinks.map((link, i) => (
                <button
                  key={link.href}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  onClick={() => handleNavClick(i, link.href)}
                  onMouseEnter={() => setHoverIndex(i)}
                  onFocus={() => setHoverIndex(i)}
                  onBlur={() => setHoverIndex(null)}
                  className={`relative z-10 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                    indicatorIndex === i
                      ? "text-black"
                      : "text-black/55 hover:text-black/80"
                  }`}
                >
                  <motion.span
                    className="inline-block"
                    animate={{ y: indicatorIndex === i ? -0.5 : 0, scale: indicatorIndex === i ? 1.04 : 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 26 }}
                  >
                    {link.label}
                  </motion.span>
                </button>
              ))}
            </nav>

            {/* CTA */}
            <div className="relative z-10 flex-1 flex items-center justify-end pr-1 sm:pr-2">
              <a
                href="#contacto"
                className="hidden lg:inline-flex items-center justify-center px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all shadow-sm ring-1 ring-black/10 hover:scale-[1.03] active:scale-95"
              >
                Consultar
              </a>
              <button
                className={`lg:hidden relative grid place-items-center w-9 h-9 rounded-xl transition-colors ${
                  menuOpen
                    ? "bg-white text-black ring-1 ring-black/10 shadow-sm"
                    : "text-black/70 hover:text-black"
                }`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </motion.nav>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 z-[55]"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
          >
            {/* Frosted, blurred backdrop */}
            <div
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-white/70 backdrop-blur-2xl backdrop-saturate-[1.8]"
            />
            {/* soft brand glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(99,102,241,0.10),transparent_60%),radial-gradient(70%_50%_at_50%_100%,rgba(56,189,248,0.10),transparent_60%)]" />

            <motion.nav
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full flex-col px-6 pb-[calc(env(safe-area-inset-bottom,0px)+2rem)] pt-[calc(env(safe-area-inset-top,0px)+6rem)]"
              aria-label="Navegación principal"
            >
              <ul className="flex flex-1 flex-col justify-center gap-1">
                {navLinks.map((link, idx) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + idx * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      onClick={() => { handleNavClick(idx, link.href); setMenuOpen(false); }}
                      className={`flex w-full items-baseline gap-3 py-3 text-left transition-colors ${
                        idx === activeIndex ? "text-black" : "text-black/45 active:text-black"
                      }`}
                    >
                      <span className="font-mono text-xs tabular-nums text-black/30">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-3xl font-semibold tracking-tight">
                        {link.label}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.05, duration: 0.3 }}
                className="flex items-center justify-center rounded-full bg-black px-6 py-4 text-sm font-medium text-white shadow-lg ring-1 ring-black/10 active:scale-95"
              >
                Primera consulta gratis
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
