"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { LinkedinIcon } from "../ui/BrandIcons";
import { profile } from "@/data/profile";
import { InfrastructureVisualization } from "../InfrastructureVisualization";
import { MagneticButton } from "../ui/MagneticButton";
import { StatusDot } from "../ui/Chip";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const item = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, ease, delay },
  });

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 sm:pt-28 lg:pt-20"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Left: copy */}
        <div className="lg:col-span-6">
          <motion.div {...item(0.05)}>
            <span className="glass inline-flex items-center gap-2.5 rounded-full px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
              <StatusDot tone="success" pulse={!reduce} />
              Available for infrastructure &amp; security opportunities
            </span>
          </motion.div>

          <motion.h1
            {...item(0.15)}
            className="mt-6 text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-fg sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]"
          >
            Building, Monitoring &amp; Securing Modern{" "}
            <span className="gradient-text">IT Infrastructure</span>.
          </motion.h1>

          <motion.p
            {...item(0.28)}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Data Center Technical Support Engineer &amp; Infrastructure Engineer focused on
            enterprise <span className="font-medium text-fg">infrastructure</span>,{" "}
            <span className="gradient-text font-semibold">cybersecurity</span>, network monitoring,
            virtualization and intelligent monitoring systems with{" "}
            <span className="gradient-text font-semibold">automation</span>.
          </motion.p>

          <motion.div {...item(0.4)} className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton href="#projects" icon={<ArrowRight className="size-4" aria-hidden="true" />}>
              View My Work
            </MagneticButton>
            <MagneticButton
              href={profile.cvPath}
              download={profile.cvFileName}
              variant="secondary"
              icon={<Download className="size-4" aria-hidden="true" />}
              iconPosition="left"
            >
              Download CV
            </MagneticButton>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2 py-2 text-sm font-medium text-muted transition-colors hover:text-fg"
            >
              <LinkedinIcon className="size-4" />
              LinkedIn
            </a>
          </motion.div>

          <motion.dl
            {...item(0.52)}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-faint"
          >
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden="true" />
              <dt className="sr-only">Location</dt>
              <dd>Ahmedabad, IN</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Focus</dt>
              <dd>Data Center · Security · Monitoring</dd>
            </div>
          </motion.dl>
        </div>

        {/* Right: visualization */}
        <motion.div
          className="lg:col-span-6"
          initial={reduce ? false : { opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.3 }}
        >
          <InfrastructureVisualization className="mx-auto w-full max-w-[640px]" />
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint lg:flex"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="mono-label">scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-hint bg-accent" />
        </span>
      </motion.a>
    </section>
  );
}
