"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Fixed background: fine drifting grid + soft ambient gradients. */
export function GridBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-bg" />
      <div className="grid-bg absolute -inset-16 animate-grid-drift opacity-100 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent)_22%,transparent),transparent)] blur-2xl" />
      <div className="absolute top-[40%] -right-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--violet)_16%,transparent),transparent)] blur-2xl" />
      <div className="absolute bottom-[-10%] -left-40 h-[420px] w-[520px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--cyan)_12%,transparent),transparent)] blur-2xl" />
    </div>
  );
}

/** Ambient glow that lags behind the cursor. Skipped for touch and reduced motion. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight * 0.35;
    let cx = tx;
    let cy = ty;
    let raf = 0;
    let active = false;

    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `translate3d(${cx - 300}px, ${cy - 300}px, 0)`;
      if (Math.abs(tx - cx) > 0.2 || Math.abs(ty - cy) > 0.2) {
        raf = requestAnimationFrame(loop);
      } else {
        active = false;
      }
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = "1";
      if (!active) {
        active = true;
        raf = requestAnimationFrame(loop);
      }
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 -z-[5] size-[600px] rounded-full opacity-0 transition-opacity duration-700 will-change-transform"
      style={{
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--accent) 14%, transparent) 0%, color-mix(in srgb, var(--violet) 6%, transparent) 40%, transparent 70%)",
      }}
    />
  );
}

/** Short boot-style loading overlay, shown once per session. */
export function Loader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduce) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem("sc-booted") === "1";
    } catch {
      /* ignore */
    }
    if (seen) return;
    const show = window.setTimeout(() => setShow(true), 0);
    const t = window.setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem("sc-booted", "1");
      } catch {
        /* ignore */
      }
    }, 1100);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(t);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="loader"
          role="status"
          aria-live="polite"
          aria-label="Loading"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center gap-5">
            <div className="relative grid size-14 place-items-center rounded-2xl border border-line bg-surface font-bold text-fg">
              <span className="gradient-text text-lg">SC</span>
              <span className="absolute -right-1 -top-1 size-2 rounded-full bg-success animate-pulse-dot text-success" />
            </div>
            <div className="h-px w-40 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full w-full origin-left bg-gradient-to-r from-accent via-cyan to-violet"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <p className="mono-label">initializing interface</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
