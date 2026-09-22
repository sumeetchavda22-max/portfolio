"use client";

import { ChevronDown, Building2 } from "lucide-react";
import { useState } from "react";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { Chip, StatusDot } from "../ui/Chip";

export function ExperienceTimeline() {
  return (
    <Section
      id="experience"
      number="02"
      label="Experience"
      title="Professional Experience"
      subtitle="From city-wide surveillance operations to security analysis to running data center infrastructure."
    >
      <ol
        className="relative [mask-image:linear-gradient(to_bottom,transparent,black_3%,black_97%,transparent)]"
        role="list"
      >
        {experience.map((exp, i) => (
          <ExperienceRow key={exp.id} exp={exp} index={i} />
        ))}
      </ol>
    </Section>
  );
}

function ExperienceRow({ exp, index }: { exp: (typeof experience)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `${exp.id}-responsibilities`;

  return (
    <li className="group grid grid-cols-[28px_1fr] gap-4 sm:gap-6 md:grid-cols-[200px_1fr] md:gap-10 lg:grid-cols-[240px_1fr]">
      {/* Timeline column */}
      <div className="relative">
        <span aria-hidden="true" className="absolute bottom-0 top-0 right-[13px] w-px bg-line md:right-5" />
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-7 right-[9px] size-[9px] rounded-full border-2 border-bg transition-all duration-500 md:right-4 md:top-8",
            exp.current ? "bg-success" : "bg-faint",
            "group-hover:scale-125 group-hover:bg-accent group-hover:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_25%,transparent),0_0_18px_var(--accent)]"
          )}
        />
        <div className="hidden pr-12 pt-6 text-right md:block">
          <p className="font-mono text-xs tracking-[0.12em] text-fg">{exp.period}</p>
          <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            {exp.current ? (
              <span className="inline-flex items-center gap-1.5 text-success">
                <StatusDot tone="success" /> Current
              </span>
            ) : (
              `Role 0${experience.length - index}`
            )}
          </p>
        </div>
      </div>

      {/* Card column */}
      <Reveal className="pb-10 sm:pb-12" as="div">
        <article
          aria-labelledby={`${exp.id}-role`}
          className="glass border-glow relative rounded-2xl p-5 transition-[transform,box-shadow] duration-500 will-change-transform group-hover:-translate-y-1 group-hover:shadow-[0_24px_60px_-28px_var(--glow)] sm:p-7"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="mb-2 font-mono text-[11px] tracking-[0.12em] text-accent md:hidden">
                {exp.period}
              </p>
              <h3 id={`${exp.id}-role`} className="text-lg font-semibold leading-snug text-fg sm:text-xl">
                {exp.role}
              </h3>
              <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                <Building2 className="size-4 shrink-0 text-faint" aria-hidden="true" />
                <span className="font-medium text-fg">{exp.company}</span>
                <span className="text-faint" aria-hidden="true">
                  ·
                </span>
                <span>{exp.context}</span>
              </p>
            </div>
            {exp.current ? (
              <Chip tone="success" className="shrink-0">
                <StatusDot tone="success" className="mr-1.5" /> PRESENT
              </Chip>
            ) : null}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-[15px]">{exp.summary}</p>

          {/* Responsibilities: always visible on md+, collapsible on mobile */}
          <div
            id={panelId}
            className={cn(
              "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:grid-rows-[1fr]",
              open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            )}
          >
            <div className="overflow-hidden">
              <ul className="mt-4 space-y-2.5 border-t border-line pt-4" role="list">
                {exp.responsibilities.map((r) => (
                  <li key={r} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-[9px] size-1 shrink-0 rounded-full bg-accent" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent md:hidden"
          >
            {open ? "Hide responsibilities" : "View responsibilities"}
            <ChevronDown className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")} aria-hidden="true" />
          </button>

          <ul className="mt-5 flex flex-wrap gap-1.5" role="list" aria-label="Technologies">
            {exp.tech.map((t, i) => (
              <li
                key={t}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
                style={{ transitionDelay: `${i * 25}ms` }}
              >
                <Chip>{t}</Chip>
              </li>
            ))}
          </ul>
        </article>
      </Reveal>
    </li>
  );
}
