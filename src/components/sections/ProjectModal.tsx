"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { Lock, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Project } from "@/data/projects";
import { ArchitectureDiagram } from "../graphics/ProjectGraphics";
import { Chip, StatusDot } from "../ui/Chip";

type Props = { project: Project | null; onClose: () => void };

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProjectModal({ project, onClose }: Props) {
  const reduce = useReducedMotionSafe();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  // Scroll lock, focus management and keyboard handling while open.
  useEffect(() => {
    if (!project) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFirst = () => {
      const first = panelRef.current?.querySelector<HTMLElement>("[data-autofocus]");
      first?.focus();
    };
    const t = window.setTimeout(focusFirst, 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      restoreRef.current?.focus?.();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key={project.id}
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* backdrop */}
          <button
            type="button"
            aria-label="Close project details"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-[color-mix(in_srgb,var(--bg)_70%,transparent)] backdrop-blur-md"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${project.id}-modal-title`}
            className="glass-strong relative flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl sm:max-h-[88vh] sm:rounded-3xl"
            initial={reduce ? false : { y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* header */}
            <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-8 sm:py-5">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                  <span className="text-accent">Project {project.number}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <StatusDot tone={project.status === "Ongoing" ? "warning" : "success"} pulse={false} />
                    {project.status}
                  </span>
                </div>
                <h3 id={`${project.id}-modal-title`} className="mt-1.5 text-xl font-bold tracking-tight text-fg sm:text-2xl">
                  {project.name}
                </h3>
              </div>
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                aria-label="Close"
                className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            {/* body */}
            <div className="overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="space-y-8 lg:col-span-8">
                  <Block title="Overview" number="01">
                    <p>{project.overview}</p>
                  </Block>
                  <Block title="Problem" number="02">
                    <p>{project.problem}</p>
                  </Block>
                  <Block title="Solution" number="03">
                    <p>{project.solution}</p>
                  </Block>
                  <Block title="My contribution" number="04">
                    <ul className="space-y-2.5" role="list">
                      {project.contribution.map((c) => (
                        <li key={c} className="flex gap-3">
                          <span aria-hidden="true" className="mt-[9px] size-1 shrink-0 rounded-full bg-cyan" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </Block>
                </div>

                <aside className="space-y-6 lg:col-span-4">
                  <div className="glass rounded-2xl p-5">
                    <p className="mono-label mb-3">Technology</p>
                    <ul className="flex flex-wrap gap-1.5" role="list">
                      {project.tech.map((t) => (
                        <li key={t}>
                          <Chip tone="accent">{t}</Chip>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="glass rounded-2xl p-5">
                    <p className="mono-label mb-3">Features</p>
                    <ul className="space-y-2 text-sm text-muted" role="list">
                      {project.features.map((f) => (
                        <li key={f} className="flex gap-2.5">
                          <span aria-hidden="true" className="mt-[8px] size-1 shrink-0 rounded-full bg-accent" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="glass flex items-center gap-3 rounded-2xl p-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-line bg-surface text-faint">
                      <Lock className="size-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-fg">Private / Internal Project</p>
                      <p className="text-xs text-muted">No public repository is available.</p>
                    </div>
                  </div>
                </aside>
              </div>

              {/* Full width so the diagram has room to breathe. */}
              <div className="mt-8">
                <Block title="Architecture" number="05">
                  <div className="glass rounded-2xl p-3 sm:p-4">
                    <ArchitectureDiagram kind={project.architecture} animate={!reduce} />
                  </div>
                  <p className="mt-2 font-mono text-[10px] tracking-[0.14em] text-faint">
                    SIMPLIFIED DATA FLOW · ILLUSTRATIVE
                  </p>
                </Block>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Block({ title, number, children }: { title: string; number: string; children: React.ReactNode }) {
  return (
    <section aria-label={title}>
      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono text-[10.5px] tracking-[0.16em] text-accent">{number}</span>
        <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-fg">{title}</h4>
        <span className="h-px flex-1 bg-line" aria-hidden="true" />
      </div>
      <div className="text-[15px] leading-relaxed text-muted">{children}</div>
    </section>
  );
}
