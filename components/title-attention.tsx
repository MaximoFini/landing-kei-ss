"use client";

import { useEffect } from "react";

/**
 * Cambia el título de la pestaña cuando el usuario se va a otra pestaña/ventana
 * y lo restaura al volver.
 */
export function TitleAttention() {
  useEffect(() => {
    const awayTitle = "KEI Software - Volvé!";
    let original: string | null = null;

    const handleVisibility = () => {
      if (document.hidden) {
        original = document.title;
        document.title = awayTitle;
      } else if (original !== null) {
        document.title = original;
        original = null;
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      if (original !== null) document.title = original;
    };
  }, []);

  return null;
}
