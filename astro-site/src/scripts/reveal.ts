/*
 * Minimal shared IntersectionObserver for `.reveal` elements.
 *
 * Replaces every `useInView(ref, { once: true, margin: "-60px" | "-80px" | "-100px" })`
 * in the ported sections. The source components use slightly different margins;
 * we use one shared bottom margin of -80px (the middle of the three values) so a
 * single observer covers all of them. `once: true` behaviour → each element is
 * unobserved after its first intersection.
 *
 * Also drives `.dia-text` (DiaTextReveal): same once-in-view trigger adds
 * `.is-visible`, which starts the CSS gradient sweep. The original bailed to the
 * end state on coarse pointers (the per-frame text repaint stutters on phones) —
 * we mirror that by tagging `.dia-static` instead so the CSS snaps to rest.
 *
 * Imported once from BaseLayout via <script>, which Astro bundles + dedupes.
 */

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const COARSE = window.matchMedia("(pointer: coarse)").matches;

function reveal() {
  const els = document.querySelectorAll<HTMLElement>(
    ".reveal:not(.is-visible), .dia-text:not(.is-visible):not(.dia-static)",
  );
  if (!els.length) return;

  if (COARSE) {
    document
      .querySelectorAll<HTMLElement>(".dia-text:not(.dia-static)")
      .forEach((el) => el.classList.add("dia-static"));
  }

  if (REDUCED || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    },
    // Framer `margin: "-60px" / "-80px" / "-100px"` → shrink the viewport
    // rectangle from the bottom so reveals fire a touch after the element
    // crosses into view.
    { rootMargin: "0px 0px -80px 0px", threshold: 0 },
  );

  els.forEach((el) => {
    if (COARSE && el.classList.contains("dia-text")) return;
    io.observe(el);
  });
}

reveal();
// Astro view transitions / bfcache re-entry safety.
document.addEventListener("astro:page-load", reveal);
