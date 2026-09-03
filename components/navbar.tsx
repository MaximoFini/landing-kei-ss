"use client";

import { useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from "@/lib/motion";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

// Faster, more fluid replacement for the native browser smooth-scroll
// (which feels sluggish and inconsistent on long distances). Eases out
// quickly and scales its duration with distance, capped so a scroll to
// the bottom of the page never feels slow.
function smoothScrollTo(targetY: number, duration = 500) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 1) return;

  const start = performance.now();
  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

  const step = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeOutQuart(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Portfolio", href: "#proyectos" },
  { label: "Equipo", href: "#equipo" },
  { label: "Contacto", href: "#contacto" },
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  // The theme toggle flips `document.documentElement`'s class directly (so
  // the class change lands synchronously inside a view-transition capture)
  // instead of going through next-themes' own React state, so this reads
  // the DOM directly too — `useTheme()` here would go stale after the very
  // first live toggle since it only re-syncs on a full remount.
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const syncTheme = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (soundOn) {
      audio.pause();
      setSoundOn(false);
    } else {
      audio.volume = 0.35;
      void audio.play().then(() => setSoundOn(true)).catch(() => setSoundOn(false));
    }
  };

  // Scroll state + scrollspy: highlight the section currently in view.
  //
  // The section positions (`offsetTop`) and the page's max scroll are read
  // only on mount / resize / `load` / whenever the page height changes, and
  // cached. The scroll handler itself reads just `scrollY` / `innerHeight`
  // (neither forces layout), so scrolling no longer triggers a synchronous
  // reflow the way reading `offsetTop` per section on every scroll event did.
  useEffect(() => {
    let offsets: { i: number; top: number }[] = [];
    let maxScroll = 0;

    const measure = () => {
      offsets = navLinks
        .map((l, i) =>
          l.href.startsWith("#")
            ? { i, el: document.getElementById(l.href.slice(1)) }
            : null
        )
        .filter((s): s is { i: number; el: HTMLElement } => !!s && !!s.el)
        .map((s) => ({ i: s.i, top: s.el.offsetTop }));
      maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    };

    const onScroll = () => {
      setScrolled(window.scrollY > 12);

      // Ignore while a click-triggered smooth scroll is settling
      if (Date.now() - clickLockRef.current < 700 || offsets.length === 0) return;

      // Self-heal: if positions were cached before the lazy sections laid out
      // (last section still at 0), re-read now. Happens at most once.
      if (offsets.length > 1 && offsets[offsets.length - 1].top === 0) measure();

      const probe = window.scrollY + window.innerHeight * 0.32;
      let current = offsets[0].i;
      for (const o of offsets) {
        if (o.top <= probe) current = o.i;
      }
      // Snap to the last section only when genuinely scrolled to the bottom
      if (maxScroll > 200 && window.scrollY >= maxScroll - 4) {
        current = offsets[offsets.length - 1].i;
      }
      setActiveIndex((prev) => (prev === current ? prev : current));
    };

    const remeasure = () => {
      measure();
      onScroll();
    };

    remeasure();
    // Below-the-fold sections are lazy-mounted and fonts/images shift layout,
    // so re-measure when the page height changes, on resize/load, and via a
    // couple of timed fallbacks (mirrors the old timed re-runs).
    const t1 = setTimeout(remeasure, 300);
    const t2 = setTimeout(remeasure, 1200);
    const ro = new ResizeObserver(remeasure);
    ro.observe(document.documentElement);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", remeasure);
    window.addEventListener("load", remeasure);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("load", remeasure);
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

  // Follow hovered item when hovering, otherwise rest on the active item.
  // Deferred one frame so the measurement reads happen after React's commit
  // has settled rather than forcing a synchronous layout during it.
  useEffect(() => {
    const id = requestAnimationFrame(() => updateBlob(hoverIndex ?? activeIndex));
    return () => cancelAnimationFrame(id);
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
      const el = document.querySelector<HTMLElement>(href);
      if (el) {
        clickLockRef.current = Date.now();
        const targetY = el.getBoundingClientRect().top + window.scrollY;
        const distance = Math.abs(targetY - window.scrollY);
        // Longer distances get a bit more time, but stay snappy overall.
        const duration = Math.min(700, Math.max(350, distance * 0.4));
        smoothScrollTo(targetY, duration);
      }
    }
  };

  const indicatorIndex = hoverIndex ?? activeIndex;

  // Surface tokens for the pill. Driven by plain React state + a CSS
  // transition (see the nav's className) instead of a Framer `animate` —
  // same crossfade, no per-frame JS, and SSR gets the right values inline.
  const navSurface: React.CSSProperties = {
    boxShadow: isDark
      ? scrolled
        ? "0 20px 50px -12px rgba(0,0,0,0.55), 0 2px 8px -2px rgba(0,0,0,0.35), inset 0 1px 1px 0 rgba(255,255,255,0.08), inset 0 -1px 2px 0 rgba(255,255,255,0.04)"
        : "0 10px 34px -10px rgba(0,0,0,0.4), inset 0 1px 1px 0 rgba(255,255,255,0.06), inset 0 -1px 2px 0 rgba(255,255,255,0.03)"
      : scrolled
      ? "0 20px 50px -12px rgba(15,23,42,0.22), 0 2px 8px -2px rgba(15,23,42,0.10), inset 0 1px 1px 0 rgba(255,255,255,0.90), inset 0 -1px 2px 0 rgba(255,255,255,0.35)"
      : "0 10px 34px -10px rgba(15,23,42,0.14), inset 0 1px 1px 0 rgba(255,255,255,0.70), inset 0 -1px 2px 0 rgba(255,255,255,0.25)",
    borderColor: isDark
      ? scrolled
        ? "rgba(255, 255, 255, 0.16)"
        : "rgba(255, 255, 255, 0.10)"
      : scrolled
      ? "rgba(255, 255, 255, 0.55)"
      : "rgba(255, 255, 255, 0.35)",
    backgroundColor: isDark
      ? scrolled
        ? "rgba(18, 18, 22, 0.72)"
        : "rgba(18, 18, 22, 0.5)"
      : scrolled
      ? "rgba(255, 255, 255, 0.55)"
      : "rgba(255, 255, 255, 0.34)",
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] pt-4 px-4 sm:px-6 pointer-events-none">
        <div className="font-google-sans max-w-5xl mx-auto pointer-events-auto">
          <nav
            style={navSurface}
            className="relative h-14 sm:h-16 px-2 flex items-center justify-between rounded-full border backdrop-blur-lg sm:backdrop-blur-2xl backdrop-saturate-[1.8] transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform overflow-hidden isolate"
          >
            {/* ── Glass layers ─────────────────────────────── */}
            {/* top specular highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/70 via-white/20 to-transparent dark:from-white/10 dark:via-white/[0.03] dark:to-transparent" />
            {/* diagonal sheen */}
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(115deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_28%,rgba(255,255,255,0)_60%,rgba(255,255,255,0.30)_100%)] dark:bg-[linear-gradient(115deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_28%,rgba(255,255,255,0)_60%,rgba(255,255,255,0.05)_100%)]" />
            {/* subtle color refraction */}
            <div className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(60%_120%_at_15%_0%,rgba(99,102,241,0.14),transparent_60%),radial-gradient(60%_120%_at_85%_100%,rgba(56,189,248,0.12),transparent_60%)] dark:bg-[radial-gradient(60%_120%_at_15%_0%,rgba(99,102,241,0.22),transparent_60%),radial-gradient(60%_120%_at_85%_100%,rgba(56,189,248,0.18),transparent_60%)]" />
            {/* crisp inner rim */}
            <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/40 dark:ring-white/10" />
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
                <span className="text-sm sm:text-base tracking-tight text-black dark:text-white">
                  KEI Software
                </span>
              </a>
            </div>

            {/* PillNav — glassy indicator that follows hover + active */}
            <nav
              ref={pillRef}
              onMouseLeave={() => setHoverIndex(null)}
              className="relative z-10 hidden lg:flex items-center bg-white/25 dark:bg-white/[0.04] rounded-full p-1 border border-white/40 dark:border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),inset_0_-1px_2px_rgba(15,23,42,0.04)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.06),inset_0_-1px_2px_rgba(0,0,0,0.2)] backdrop-blur-md overflow-hidden"
              aria-label="Navegación principal"
            >
              {/* Coloured glow trailing the indicator */}
              <m.div
                className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-indigo-400/35 via-sky-400/35 to-violet-400/35 blur-sm pointer-events-none"
                animate={{ left: blobStyle.left, width: blobStyle.width }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />

              {/* Glass indicator */}
              <m.div
                className="absolute top-1 bottom-1 rounded-full pointer-events-none overflow-hidden bg-white/70 dark:bg-white/10 ring-1 ring-white/70 dark:ring-white/15 shadow-[0_4px_14px_rgba(15,23,42,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-sm"
                animate={{ left: blobStyle.left, width: blobStyle.width }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/40 dark:from-white/15 dark:to-white/5" />
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/80 to-transparent dark:from-white/10 dark:to-transparent" />
              </m.div>

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
                      ? "text-black dark:text-white"
                      : "text-black/55 hover:text-black/80 dark:text-white/55 dark:hover:text-white/80"
                  }`}
                >
                  <m.span
                    className="inline-block"
                    animate={{ y: indicatorIndex === i ? -0.5 : 0, scale: indicatorIndex === i ? 1.04 : 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 26 }}
                  >
                    {link.label}
                  </m.span>
                </button>
              ))}
            </nav>

            {/* CTA */}
            <div className="relative z-10 flex-1 flex items-center justify-end gap-2 pr-1 sm:pr-2">
              <audio ref={audioRef} src="/audio/hero-theme.mp3" loop preload="none" />
              <AnimatedThemeToggler className="grid place-items-center w-9 h-9 rounded-full text-black/60 ring-1 ring-black/10 bg-white/40 backdrop-blur-md transition-all hover:text-black hover:bg-white/70 active:scale-95 dark:text-white/60 dark:ring-white/10 dark:bg-white/[0.06] dark:hover:text-white dark:hover:bg-white/[0.12]" />
              <button
                type="button"
                onClick={toggleSound}
                className="grid place-items-center w-9 h-9 rounded-full text-black ring-1 ring-black/10 bg-white/40 backdrop-blur-md transition-all hover:bg-white/70 active:scale-95 dark:text-white dark:ring-white/10 dark:bg-white/[0.06] dark:hover:bg-white/[0.12]"
                aria-pressed={soundOn}
                aria-label={soundOn ? "Silenciar música" : "Reproducir música"}
                title={soundOn ? "Silenciar música" : "Reproducir música"}
              >
                {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <a
                href="http://wa.me/+5493385442470"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center justify-center px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all shadow-sm ring-1 ring-black/10 hover:scale-[1.03] active:scale-95 dark:bg-white dark:text-black dark:hover:bg-white/85 dark:ring-white/10"
              >
                Consultar
              </a>
              <button
                className={`lg:hidden relative grid place-items-center w-9 h-9 rounded-full transition-colors ${
                  menuOpen
                    ? "bg-white text-black ring-1 ring-black/10 shadow-sm dark:bg-zinc-800 dark:text-white dark:ring-white/10"
                    : "text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
                }`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
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
              className="absolute inset-0 bg-white/70 dark:bg-zinc-950/85 backdrop-blur-2xl backdrop-saturate-[1.8]"
            />
            {/* soft brand glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(99,102,241,0.10),transparent_60%),radial-gradient(70%_50%_at_50%_100%,rgba(56,189,248,0.10),transparent_60%)] dark:bg-[radial-gradient(80%_50%_at_50%_0%,rgba(99,102,241,0.20),transparent_60%),radial-gradient(70%_50%_at_50%_100%,rgba(56,189,248,0.18),transparent_60%)]" />

            <m.nav
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full flex-col px-6 pb-[calc(env(safe-area-inset-bottom,0px)+2rem)] pt-[calc(env(safe-area-inset-top,0px)+6rem)]"
              aria-label="Navegación principal"
            >
              <ul className="flex flex-1 flex-col justify-center gap-1">
                {navLinks.map((link, idx) => (
                  <m.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + idx * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      onClick={() => { handleNavClick(idx, link.href); setMenuOpen(false); }}
                      className={`flex w-full items-baseline gap-3 py-3 text-left transition-colors ${
                        idx === activeIndex
                          ? "text-black dark:text-white"
                          : "text-black/45 active:text-black dark:text-white/45 dark:active:text-white"
                      }`}
                    >
                      <span className="font-mono text-xs tabular-nums text-black/30 dark:text-white/30">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-3xl font-semibold tracking-tight">
                        {link.label}
                      </span>
                    </button>
                  </m.li>
                ))}
              </ul>

              <m.a
                href="http://wa.me/+5493385442470"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.05, duration: 0.3 }}
                className="flex items-center justify-center rounded-full bg-black px-6 py-4 text-sm font-medium text-white shadow-lg ring-1 ring-black/10 active:scale-95 dark:bg-white dark:text-black dark:ring-white/10"
              >
                Primera consulta gratis
              </m.a>
            </m.nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
