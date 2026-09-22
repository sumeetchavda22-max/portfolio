"use client";

import { motion, useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useEffect, useRef, useState } from "react";
import { terminalLines } from "@/data/education";
import { cn } from "@/lib/utils";
import { Reveal } from "../ui/Reveal";

const TAGS: Record<string, string> = {
  "infrastructure.monitoring": "dell · isilon · san/nas",
  "server.health": "cpu · ram · disk · uptime",
  "virtualization.status": "hyper-v · vmware",
  "network.security": "fortinet · ndr",
  "threat.detection": "ioc · packet inspection",
  "camera.health": "vms · blur · freeze · offline",
  "automation.jobs": "alerts · backups · scripts",
};

/**
 * Purely visual branding element: the lines represent areas of daily work.
 * Nothing here is connected to a live system.
 */
export function TerminalSection() {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (reduce) {
      // Reveal everything at once rather than typing it out.
      const id = window.setTimeout(() => setShown(terminalLines.length), 0);
      return () => window.clearTimeout(id);
    }
    if (!inView) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= terminalLines.length) window.clearInterval(id);
    }, 260);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const done = shown >= terminalLines.length;

  return (
    <section aria-labelledby="terminal-title" className="relative py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div ref={ref} className="glass relative overflow-hidden rounded-3xl">
            <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="font-mono text-[11px] tracking-[0.12em] text-muted">sumit@infra — zsh</span>
              </div>
              <span className="mono-label hidden sm:inline">visual only · not live</span>
            </div>

            <div className="grid grid-cols-1 gap-8 p-5 sm:p-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="mono-label mb-2">{"// currently"}</p>
                <h2 id="terminal-title" className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                  Currently working across
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  The areas that make up a normal week — from blade chassis firmware to camera
                  stream health. Decorative output, not telemetry.
                </p>
              </div>

              <div className="font-mono text-[13px] leading-7 sm:text-sm lg:col-span-8">
                <p className="text-faint">
                  <span className="text-success">➜</span> <span className="text-cyan">~</span> cat ./focus.list
                </p>
                <ol className="mt-1" role="list" aria-label="Areas of work">
                  {terminalLines.map((line, i) => {
                    const visible = i < shown;
                    return (
                      <motion.li
                        key={line}
                        className={cn("flex flex-wrap items-baseline gap-x-3", !visible && "invisible")}
                        initial={reduce ? false : { opacity: 0, x: -6 }}
                        animate={visible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.25 }}
                      >
                        <span className="text-accent">&gt;</span>
                        <span className="text-fg">{line}</span>
                        <span className="text-faint">[{TAGS[line]}]</span>
                        <span className="ml-auto hidden text-success sm:inline">ok</span>
                      </motion.li>
                    );
                  })}
                </ol>
                <p className={cn("mt-1 text-faint transition-opacity", done ? "opacity-100" : "opacity-0")} aria-hidden={!done}>
                  <span className="text-success">➜</span> <span className="text-cyan">~</span>{" "}
                  <span className={cn("inline-block h-4 w-2 translate-y-0.5 bg-fg/80", !reduce && "animate-blink")} />
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
