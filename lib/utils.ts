import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Converts a "#rrggbb" hex string into an rgba(...) string at the given alpha,
// for building per-item accent tints (icon fills, glows, gradients) from a
// single hex color defined in data rather than duplicating each shade by hand.
export function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// Faster, more fluid replacement for the native browser smooth-scroll
// (which feels sluggish and inconsistent on long distances). Eases out
// quickly and scales its duration with distance, capped so a scroll to
// the bottom of the page never feels slow.
export function smoothScrollTo(targetY: number, duration = 500) {
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

// Scrolls smoothly to the element targeted by an in-page anchor href
// (e.g. "#proyectos"). Shared by any on-page link that should ease into
// its target instead of jumping there.
export function smoothScrollToHash(href: string) {
  const el = document.querySelector<HTMLElement>(href);
  if (!el) return;
  const targetY = el.getBoundingClientRect().top + window.scrollY;
  const distance = Math.abs(targetY - window.scrollY);
  const duration = Math.min(700, Math.max(350, distance * 0.4));
  smoothScrollTo(targetY, duration);
}
