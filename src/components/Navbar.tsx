"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { navLinks, profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";

function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={cn(
        "relative grid size-9 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-fg",
        className
      )}
    >
      <Sun
        className={cn(
          "absolute size-4 transition-all duration-500",
          isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        )}
      />
      <Moon
        className={cn(
          "absolute size-4 transition-all duration-500",
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
        )}
      />
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track the section currently in view for the active nav state.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className={cn(
          "transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500",
          scrolled || open
            ? "border-b border-line bg-[color-mix(in_srgb,var(--bg)_72%,transparent)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
          <a
            href="#home"
            className="group flex items-center gap-2.5 font-semibold tracking-tight text-fg"
            aria-label="Sumit Chavda — home"
          >
            <span className="grid size-8 place-items-center rounded-lg border border-line bg-surface text-xs font-bold">
              <span className="gradient-text">SC</span>
            </span>
            <span className="hidden font-mono text-[13px] tracking-wider sm:inline">
              SUMIT<span className="text-accent">.</span>CHAVDA
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex" role="list">
            {navLinks.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors",
                      isActive ? "text-fg" : "text-muted hover:text-fg"
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-surface ring-1 ring-line"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative">{l.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={profile.cvPath}
              download={profile.cvFileName}
              className="hidden items-center gap-2 rounded-full bg-fg px-4 py-2 text-[13px] font-semibold text-bg transition-shadow hover:shadow-[0_0_0_1px_var(--accent),0_12px_30px_-12px_var(--glow)] sm:inline-flex"
            >
              <Download className="size-3.5" aria-hidden="true" />
              Download CV
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-9 place-items-center rounded-full border border-line bg-surface text-fg lg:hidden"
            >
              <span className="relative block size-4">
                <Menu
                  className={cn(
                    "absolute inset-0 size-4 transition-all duration-300",
                    open ? "scale-50 opacity-0" : "scale-100 opacity-100"
                  )}
                />
                <X
                  className={cn(
                    "absolute inset-0 size-4 transition-all duration-300",
                    open ? "scale-100 opacity-100" : "scale-50 opacity-0"
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              className="lg:hidden"
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduce ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mx-auto max-h-[calc(100dvh-4rem)] w-full max-w-7xl overflow-y-auto px-4 pb-6 pt-2 sm:px-6">
                <ul className="flex flex-col gap-1" role="list">
                  {navLinks.map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={reduce ? false : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.3 }}
                    >
                      <a
                        href={l.href}
                        onClick={close}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                          active === l.href.slice(1)
                            ? "bg-surface text-fg ring-1 ring-line"
                            : "text-muted hover:bg-surface hover:text-fg"
                        )}
                      >
                        {l.label}
                        <span className="mono-label">0{i + 1}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <a
                  href={profile.cvPath}
                  download={profile.cvFileName}
                  onClick={close}
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-fg px-4 py-3 text-sm font-semibold text-bg"
                >
                  <Download className="size-4" aria-hidden="true" />
                  Download CV
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
    </header>
  );
}
