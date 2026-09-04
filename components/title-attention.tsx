"use client";

import { useEffect } from "react";

const BRAND_TITLE = "KEI Software";
const AWAY_TITLE = "KEI Software - Volvé!";

/**
 * Mantiene el <title> visible en "KEI Software" (marca corta) en vez del
 * título real, keyword-rich, que exporta cada página para SEO — ese sigue
 * siendo el que Google lee en el HTML server-rendered. Un MutationObserver
 * fuerza el valor de vuelta si algo más (Next.js sincroniza el <title> con
 * los metadatos al hidratar) lo pisa. También cambia el título cuando el
 * usuario se va a otra pestaña/ventana y lo restaura al volver.
 */
export function TitleAttention() {
  useEffect(() => {
    const desiredTitle = () => (document.hidden ? AWAY_TITLE : BRAND_TITLE);

    const enforceTitle = () => {
      const desired = desiredTitle();
      if (document.title !== desired) {
        document.title = desired;
      }
    };

    enforceTitle();

    const titleEl = document.querySelector("title");
    const observer = titleEl ? new MutationObserver(enforceTitle) : null;
    observer?.observe(titleEl!, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    document.addEventListener("visibilitychange", enforceTitle);
    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", enforceTitle);
    };
  }, []);

  return null;
}
