"use client";

import { useEffect, useState } from "react";

/**
 * Reduced-motion preference that is safe to branch on during render.
 *
 * Framer's `useReducedMotion` reads the media query immediately, so it returns
 * `false` while server rendering and `true` on a reduced-motion client's first
 * render — every `reduce ? a : b` in the tree then mismatches on hydration.
 * This hook reports `false` until after mount, so the first client render
 * always matches the server, then corrects itself.
 *
 * Motion is still reduced from the very first frame: `MotionConfig
 * reducedMotion="user"` handles Framer animations, and `globals.css` neutralises
 * CSS animations and transitions under the same media query.
 */
export function useReducedMotionSafe(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    const id = window.requestAnimationFrame(sync);
    query.addEventListener("change", sync);
    return () => {
      window.cancelAnimationFrame(id);
      query.removeEventListener("change", sync);
    };
  }, []);

  return reduced;
}
