"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { ArrowUpRight, Building2, Lock } from "lucide-react";
import { useCallback, useState } from "react";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ProjectArt } from "../graphics/ProjectGraphics";
import { Chip, StatusDot } from "../ui/Chip";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { ProjectModal } from "./ProjectModal";

export function ProjectGrid() {
  const [active, setActive] = useState<Project | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <Section
      id="projects"
      number="03"
      label="Projects"
      title="Things I've Built"
      subtitle="Monitoring systems, security platforms and infrastructure automation."
    >
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6" role="list">
        {projects.map((p, i) => (
          <Reveal key={p.id} as="li" delay={0.06 * i} className="h-full">
            <ProjectCard project={p} onOpen={() => setActive(p)} />
          </Reveal>
        ))}
      </ul>
      <ProjectModal project={active} onClose={close} />
    </Section>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const reduce = useReducedMotionSafe();
  const [hover, setHover] = useState(false);
  const visibleFeatures = project.features.slice(0, 5);
  const more = project.features.length - visibleFeatures.length;

  return (
    <motion.article
      aria-labelledby={`${project.id}-title`}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocusCapture={() => setHover(true)}
      onBlurCapture={() => setHover(false)}
      whileHover={reduce ? undefined : { y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={cn(
        "glass border-glow group relative flex h-full flex-col overflow-hidden rounded-3xl transition-shadow duration-500",
        "hover:shadow-[0_30px_70px_-30px_var(--glow)]",
        project.enterprise && "md:col-span-2"
      )}
    >
      {/* art */}
      <div
        className={cn(
          "relative border-b border-line bg-[color-mix(in_srgb,var(--bg-2)_70%,transparent)]",
          project.enterprise ? "h-44 sm:h-52" : "h-40 sm:h-44"
        )}
      >
        <div aria-hidden="true" className="grid-bg absolute inset-0 [background-size:24px_24px] opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
        <div className={cn("absolute inset-0 p-3 transition-transform duration-700", hover && !reduce && "scale-[1.03]")}>
          <ProjectArt kind={project.architecture} active={hover} animate={!reduce} />
        </div>
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="font-mono text-[11px] tracking-[0.16em] text-accent">{project.number}</span>
          <span className="h-px w-5 bg-line-strong" aria-hidden="true" />
          <span className="font-mono text-[11px] tracking-[0.14em] text-faint">{project.year}</span>
        </div>
        <div className="absolute right-4 top-4 flex items-center gap-2">
          {project.enterprise ? (
            <Chip tone="violet">
              <Building2 className="mr-1 size-3" aria-hidden="true" /> ENTERPRISE
            </Chip>
          ) : null}
          <Chip tone={project.status === "Ongoing" ? "warning" : "success"}>
            <StatusDot tone={project.status === "Ongoing" ? "warning" : "success"} pulse={!reduce && project.status === "Ongoing"} className="mr-1.5" />
            {project.status.toUpperCase()}
          </Chip>
        </div>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 id={`${project.id}-title`} className="text-lg font-semibold tracking-tight text-fg sm:text-xl">
          {project.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" role="list" aria-label="Technologies">
          {project.tech.slice(0, 8).map((t) => (
            <li key={t}>
              <Chip>{t}</Chip>
            </li>
          ))}
          {project.tech.length > 8 ? (
            <li>
              <Chip tone="accent">+{project.tech.length - 8}</Chip>
            </li>
          ) : null}
        </ul>

        <div className="mt-5">
          <p className="mono-label mb-2">Key features</p>
          <ul className={cn("grid gap-x-4 gap-y-1.5 text-sm text-muted", project.enterprise && "sm:grid-cols-2")} role="list">
            {visibleFeatures.map((f) => (
              <li key={f} className="flex gap-2">
                <span aria-hidden="true" className="mt-[8px] size-1 shrink-0 rounded-full bg-cyan" />
                {f}
              </li>
            ))}
            {more > 0 ? <li className="font-mono text-[11px] tracking-wide text-faint">+{more} more in details</li> : null}
          </ul>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            <Lock className="size-3" aria-hidden="true" /> Private / Internal Project
          </span>
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-fg transition-[border-color,background-color,box-shadow] hover:border-[color-mix(in_srgb,var(--accent)_50%,transparent)] hover:shadow-[0_0_24px_-6px_var(--glow)]"
          >
            View Details
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
