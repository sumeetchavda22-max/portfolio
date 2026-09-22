"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { constellation, skillCategories, type ConstellationGroup } from "@/data/skills";
import { cn, polar } from "@/lib/utils";
import { Chip } from "../ui/Chip";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";

const CENTER = { x: 50, y: 50 };
const R_GROUP = 19;
const R_TECH = 38;

const toneText = { accent: "text-accent", cyan: "text-cyan", violet: "text-violet" } as const;
const toneVar = { accent: "var(--accent)", cyan: "var(--cyan)", violet: "var(--violet)" } as const;

export function SkillsConstellation() {
  const [selected, setSelected] = useState<string>(constellation[0].id);

  return (
    <Section
      id="skills"
      number="04"
      label="Skills"
      title="Technical Stack"
      subtitle="Select a domain to reveal the technologies behind it. The full stack is listed alongside."
    >
      <div className="grid grid-cols-1 gap-10 xl:grid-cols-12 xl:gap-12">
        {/* Interactive visualization */}
        <div className="xl:col-span-6">
          <Reveal>
            <Radial selected={selected} onSelect={setSelected} />
            <Accordion selected={selected} onSelect={setSelected} />
          </Reveal>
        </div>

        {/* Full categorized stack */}
        <div className="xl:col-span-6">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2" role="list">
            {skillCategories.map((cat, i) => (
              <Reveal key={cat.code} as="li" delay={0.04 * i}>
                <div className="glass border-glow h-full rounded-2xl p-5 transition-transform duration-500 hover:-translate-y-0.5">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold text-fg">{cat.name}</h3>
                    <span className="font-mono text-[10px] tracking-[0.16em] text-faint">{cat.code}</span>
                  </div>
                  <ul className="flex flex-wrap gap-1.5" role="list">
                    {cat.items.map((s) => (
                      <li key={s}>
                        <Chip>{s}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Desktop radial ---------------- */

function Radial({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const reduce = useReducedMotionSafe();

  const groups = useMemo(
    () =>
      constellation.map((g, i) => {
        const angle = -90 + i * (360 / constellation.length);
        return { ...g, angle, ...polar(CENTER.x, CENTER.y, R_GROUP, angle) };
      }),
    []
  );

  const active = groups.find((g) => g.id === selected) ?? groups[0];

  const techs = useMemo(() => {
    const n = active.items.length;
    // Technologies sit on a single outer ring, spread nearly the whole way
    // around and centred on the active domain. The wide spread keeps labels
    // clear of each other, and the radius gap keeps them clear of the domain
    // buttons on the inner ring.
    const span = Math.min(300, n * 40);
    const start = active.angle - span / 2;
    const step = n > 1 ? span / (n - 1) : 0;
    return active.items.map((label, i) => ({
      label,
      ...polar(CENTER.x, CENTER.y, R_TECH, start + i * step),
    }));
  }, [active]);

  return (
    <div className="glass relative hidden overflow-hidden rounded-3xl p-4 md:block" aria-label="Technology constellation">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 [background-size:32px_32px] opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="relative mx-auto aspect-square w-full max-w-[600px]">
        {/* connection lines */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx={50} cy={50} r={R_GROUP} fill="none" stroke="var(--line)" strokeDasharray="0.6 1.4" />
          <circle cx={50} cy={50} r={R_TECH} fill="none" stroke="var(--line)" strokeDasharray="0.4 1.6" />
          {groups.map((g) => (
            <line
              key={g.id}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={g.x}
              y2={g.y}
              stroke={g.id === selected ? toneVar[g.color] : "var(--line-strong)"}
              strokeWidth={g.id === selected ? 0.5 : 0.3}
              strokeOpacity={g.id === selected ? 0.9 : 0.6}
              vectorEffect="non-scaling-stroke"
              className="transition-[stroke,stroke-opacity] duration-500"
            />
          ))}
          <AnimatePresence mode="wait">
            <motion.g key={active.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {techs.map((t, i) => (
                <motion.line
                  key={t.label}
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={t.x}
                  y2={t.y}
                  stroke={toneVar[active.color]}
                  strokeOpacity={0.55}
                  strokeWidth={0.35}
                  strokeDasharray="1 1.5"
                  vectorEffect="non-scaling-stroke"
                  className={cn(!reduce && "animate-dash")}
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.04 * i }}
                />
              ))}
            </motion.g>
          </AnimatePresence>
        </svg>

        {/* center */}
        <div
          className="absolute z-10 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface-strong shadow-[0_0_60px_-10px_var(--glow)]"
          style={{ left: "50%", top: "50%" }}
        >
          <div className="text-center">
            <p className="gradient-text text-lg font-bold tracking-[0.18em]">SUMIT</p>
            <p className="font-mono text-[9px] tracking-[0.18em] text-faint">CORE</p>
          </div>
        </div>

        {/* group nodes */}
        {groups.map((g) => {
          const isActive = g.id === selected;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => onSelect(g.id)}
              aria-pressed={isActive}
              className={cn(
                "absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-all duration-300",
                isActive
                  ? cn("border-current bg-surface-strong shadow-[0_0_30px_-6px_currentColor]", toneText[g.color])
                  : "border-line bg-surface-strong text-muted opacity-80 hover:border-line-strong hover:text-fg hover:opacity-100"
              )}
              style={{ left: `${g.x}%`, top: `${g.y}%` }}
            >
              {g.label}
            </button>
          );
        })}

        {/* tech nodes */}
        <AnimatePresence mode="wait">
          <motion.div key={active.id} className="absolute inset-0" aria-live="polite">
            <p className="sr-only">{active.label} technologies: {active.items.join(", ")}</p>
            {techs.map((t, i) => (
              <motion.span
                key={t.label}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border bg-surface-strong px-1.5 py-1 font-mono text-[10px] tracking-tight text-fg",
                  "border-[color-mix(in_srgb,currentColor_35%,var(--line))]"
                )}
                style={{ left: `${t.x}%`, top: `${t.y}%`, color: "var(--fg)" }}
                initial={reduce ? false : { opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.35, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              >
                {t.label}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="relative mt-2 text-center font-mono text-[10px] tracking-[0.14em] text-faint">
        CLICK A DOMAIN · {active.items.length} TECHNOLOGIES SHOWN
      </p>
    </div>
  );
}

/* ---------------- Mobile accordion ---------------- */

function Accordion({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  return (
    <div className="glass rounded-3xl p-2 md:hidden">
      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        <p className="gradient-text text-sm font-bold tracking-[0.18em]">SUMIT</p>
        <span className="mono-label">domains</span>
      </div>
      <ul className="divide-y divide-line" role="list">
        {constellation.map((g) => (
          <AccordionItem key={g.id} group={g} open={selected === g.id} onToggle={() => onSelect(g.id)} />
        ))}
      </ul>
    </div>
  );
}

function AccordionItem({ group, open, onToggle }: { group: ConstellationGroup; open: boolean; onToggle: () => void }) {
  const id = `acc-${group.id}`;
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between px-3 py-3.5 text-left"
      >
        <span className={cn("font-semibold", open ? toneText[group.color] : "text-fg")}>{group.label}</span>
        <ChevronDown className={cn("size-4 text-faint transition-transform duration-300", open && "rotate-180")} aria-hidden="true" />
      </button>
      <div
        id={id}
        className={cn("grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-wrap gap-1.5 px-3 pb-4" role="list">
            {group.items.map((s) => (
              <li key={s}>
                <Chip tone={group.color}>{s}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
