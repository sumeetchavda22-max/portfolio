"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { Cpu, Radar, Server, ShieldCheck, Workflow, Layers } from "lucide-react";
import { domains } from "@/data/skills";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { Chip, StatusDot } from "../ui/Chip";

const icons = [Server, ShieldCheck, Radar, Layers, Workflow, Cpu];

const stack = [
  "Data center infrastructure",
  "Dell PowerEdge servers",
  "Dell EMC Isilon",
  "SAN / NAS",
  "Hyper-V",
  "VMware",
  "Linux",
  "Windows Server",
  "Active Directory",
  "DNS / DHCP",
  "Network monitoring",
  "Cybersecurity",
  "NDR",
  "VMS monitoring",
  "Infrastructure automation",
];

export function About() {
  const reduce = useReducedMotionSafe();

  return (
    <Section id="about" number="01" label="About" title="Engineer behind the infrastructure">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-6">
          <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              I&apos;m Sumit Chavda, a Data Center Technical Support Engineer &amp; Infrastructure
              Engineer based in Ahmedabad. I currently manage complete data center operations for
              TCC and CCC infrastructure environments at the SASA Smart City Project — the physical
              layer, the virtual layer and the monitoring on top of both.
            </p>
            <p>
              Day to day that means Dell PowerEdge M1000e chassis and M630 / M640 blades, Dell EMC
              Isilon and SAN / NAS storage, Hyper-V and VMware hosts running Linux and Windows
              virtual machines, and the Active Directory, DNS, DHCP and NTP services that sit
              underneath everything.
            </p>
            <p>
              Before moving into data center operations I worked as a Security Analyst deploying
              and tuning NDR platforms alongside firewalls and SIEM systems, and before that
              supervised city-wide CCTV operations for the Ahmedabad Smart City Project. Along the
              way I&apos;ve built my own monitoring tools for servers, VMs, chassis and cameras —
              because the fastest way to understand infrastructure is to instrument it.
            </p>
          </div>

          <div className="mt-8">
            <p className="mono-label mb-3">Working across</p>
            <ul className="flex flex-wrap gap-2" role="list">
              {stack.map((s, i) => (
                <motion.li
                  key={s}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.03 * i, duration: 0.4 }}
                >
                  <Chip>{s}</Chip>
                </motion.li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6" delay={0.1}>
          <div className="glass border-glow relative overflow-hidden rounded-3xl p-6 sm:p-8">
            <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 [background-size:28px_28px] opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mono-label">Technical profile</p>
                  <h3 className="mt-1 text-xl font-semibold text-fg">Domains of work</h3>
                </div>
                <span className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.14em] text-muted">
                  <StatusDot tone="success" pulse={!reduce} />
                  PROFILE
                </span>
              </div>

              <ul className="mt-6 divide-y divide-line" role="list">
                {domains.map((d, i) => {
                  const Icon = icons[i];
                  return (
                    <li key={d.name} className="group flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl border border-line bg-surface text-accent transition-colors group-hover:border-[color-mix(in_srgb,var(--accent)_45%,transparent)]">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-semibold text-fg">{d.name}</p>
                          <span className="font-mono text-[10px] tracking-[0.16em] text-faint">{d.code}</span>
                        </div>
                        <p className="mt-0.5 truncate text-sm text-muted">{d.note}</p>
                        {/* Decorative segmented indicator — categorization only, no percentages */}
                        <div className="mt-2.5 flex gap-1" aria-hidden="true">
                          {Array.from({ length: 12 }).map((_, j) => (
                            <motion.span
                              key={j}
                              className="h-1 flex-1 rounded-full bg-gradient-to-r from-accent via-cyan to-violet"
                              initial={reduce ? false : { opacity: 0.15, scaleY: 0.6 }}
                              whileInView={reduce ? undefined : { opacity: 1, scaleY: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.08 * i + 0.03 * j, duration: 0.35 }}
                            />
                          ))}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-6 font-mono text-[10px] tracking-[0.14em] text-faint">
                CATEGORIZATION ONLY · NOT A SKILL SCORE
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
