"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Activity,
  Boxes,
  Database,
  Globe,
  HardDrive,
  Layers,
  Network,
  Server,
  Shield,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { StatusDot } from "./ui/Chip";
import { cn } from "@/lib/utils";

type NodeDef = {
  id: string;
  label: string;
  x: number;
  y: number;
  depth: number; // parallax factor
  icon: LucideIcon;
  tone: "accent" | "cyan" | "violet";
  w?: number;
};

type LinkDef = { from: string; to: string; packet?: boolean; dashed?: boolean; dur?: number };

const W = 600;
const H = 440;

const NODES: NodeDef[] = [
  { id: "internet", label: "INTERNET", x: 300, y: 42, depth: 0.35, icon: Globe, tone: "accent" },
  { id: "firewall", label: "FIREWALL", x: 300, y: 122, depth: 0.55, icon: Shield, tone: "violet" },
  { id: "security", label: "SECURITY / NDR", x: 470, y: 122, depth: 0.8, icon: ShieldCheck, tone: "violet", w: 132 },
  { id: "switch", label: "CORE SWITCH", x: 300, y: 202, depth: 0.7, icon: Network, tone: "cyan", w: 104 },
  { id: "servers", label: "BLADE SERVERS", x: 135, y: 282, depth: 1, icon: Server, tone: "accent", w: 112 },
  { id: "hyperv", label: "HYPER-V", x: 300, y: 282, depth: 1, icon: Layers, tone: "accent" },
  { id: "monitoring", label: "MONITORING", x: 465, y: 282, depth: 1, icon: Activity, tone: "cyan", w: 104 },
  { id: "nas", label: "NAS", x: 88, y: 372, depth: 1.25, icon: HardDrive, tone: "cyan", w: 72 },
  { id: "san", label: "SAN", x: 196, y: 372, depth: 1.25, icon: Database, tone: "cyan", w: 72 },
  { id: "vms", label: "VIRTUAL MACHINES", x: 340, y: 372, depth: 1.25, icon: Boxes, tone: "accent", w: 128 },
];

const LINKS: LinkDef[] = [
  { from: "internet", to: "firewall", packet: true, dur: 2.6 },
  { from: "firewall", to: "security", packet: true, dur: 3.4, dashed: true },
  { from: "firewall", to: "switch", packet: true, dur: 2.2 },
  { from: "switch", to: "servers", packet: true, dur: 3 },
  { from: "switch", to: "hyperv", packet: true, dur: 2.4 },
  { from: "switch", to: "monitoring", packet: true, dur: 3.2 },
  { from: "hyperv", to: "vms", packet: true, dur: 2.8 },
  { from: "servers", to: "nas", dur: 3.6 },
  { from: "servers", to: "san", packet: true, dur: 3.1 },
  { from: "hyperv", to: "san", dur: 3.9 },
  { from: "monitoring", to: "vms", dashed: true, dur: 3.3 },
  { from: "security", to: "monitoring", dashed: true },
];

const toneVar = { accent: "var(--accent)", cyan: "var(--cyan)", violet: "var(--violet)" } as const;

const nodeById = Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<string, NodeDef>;

type ParallaxMV = { mx: MotionValue<number>; my: MotionValue<number> };

function Link({
  link,
  mx,
  my,
  active,
  dim,
  animate,
}: { link: LinkDef; active: boolean; dim: boolean; animate: boolean } & ParallaxMV) {
  const a = nodeById[link.from];
  const b = nodeById[link.to];
  const id = `lnk-${link.from}-${link.to}`;

  const d = useTransform([mx, my], (v: number[]) => {
    const [vx, vy] = v;
    return `M ${a.x + vx * a.depth} ${a.y + vy * a.depth} L ${b.x + vx * b.depth} ${b.y + vy * b.depth}`;
  });

  return (
    <g className="transition-opacity duration-500" style={{ opacity: dim ? 0.25 : 1 }}>
      {/* base wire */}
      <motion.path id={id} d={d} fill="none" stroke="var(--line-strong)" strokeWidth={1.2} />
      {/* animated flow overlay */}
      <motion.path
        d={d}
        fill="none"
        stroke={active ? "var(--cyan)" : "var(--accent)"}
        strokeWidth={active ? 1.8 : 1.2}
        strokeDasharray={link.dashed ? "2 6" : "6 10"}
        strokeLinecap="round"
        className={cn(animate && "animate-dash", "transition-[opacity,stroke] duration-500")}
        style={{
          opacity: active ? 0.95 : 0.45,
          filter: active ? "drop-shadow(0 0 6px var(--cyan))" : undefined,
        }}
      />
      {animate && link.packet ? (
        <circle r={2.4} fill={active ? "var(--cyan)" : "var(--accent)"} style={{ filter: "drop-shadow(0 0 4px currentColor)" }}>
          <animateMotion dur={`${link.dur ?? 3}s`} repeatCount="indefinite" rotate="auto">
            <mpath href={`#${id}`} />
          </animateMotion>
        </circle>
      ) : null}
    </g>
  );
}

function Node({
  node,
  mx,
  my,
  hovered,
  connected,
  onHover,
}: {
  node: NodeDef;
  hovered: boolean;
  connected: boolean;
  onHover: (id: string | null) => void;
} & ParallaxMV) {
  const x = useTransform(mx, (v) => v * node.depth);
  const y = useTransform(my, (v) => v * node.depth);
  const w = node.w ?? 92;
  const h = 40;
  const Icon = node.icon;
  const color = toneVar[node.tone];
  const dim = !hovered && !connected;

  return (
    <motion.g
      style={{ x, y }}
      onPointerEnter={() => onHover(node.id)}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onHover(node.id)}
      onBlur={() => onHover(null)}
      tabIndex={0}
      role="img"
      aria-label={node.label}
      className="cursor-default outline-none"
    >
      <title>{node.label}</title>
      {/* glow */}
      <rect
        x={node.x - w / 2}
        y={node.y - h / 2}
        width={w}
        height={h}
        rx={10}
        fill={color}
        className="transition-opacity duration-500"
        style={{ opacity: hovered ? 0.28 : connected ? 0.14 : 0.06, filter: "blur(10px)" }}
      />
      {/* card */}
      <rect
        x={node.x - w / 2}
        y={node.y - h / 2}
        width={w}
        height={h}
        rx={10}
        fill="var(--surface-strong)"
        stroke={hovered ? color : "var(--line-strong)"}
        strokeWidth={hovered ? 1.4 : 1}
        className="transition-[stroke,stroke-width] duration-300"
      />
      <Icon
        x={node.x - w / 2 + 11}
        y={node.y - 8}
        width={16}
        height={16}
        stroke={color}
        strokeWidth={1.8}
        className="pointer-events-none"
        aria-hidden="true"
      />
      <text
        x={node.x - w / 2 + 34}
        y={node.y + 3.5}
        fontFamily="var(--font-jetbrains)"
        fontSize={9.5}
        letterSpacing={0.8}
        fill="var(--fg)"
        className="pointer-events-none select-none transition-opacity"
        style={{ opacity: dim ? 0.85 : 1 }}
      >
        {node.label}
      </text>
      {/* tiny status led */}
      <circle cx={node.x + w / 2 - 9} cy={node.y - h / 2 + 9} r={2} fill="var(--success)" />
    </motion.g>
  );
}

const STATUS = [
  { label: "SYSTEMS", tone: "success" as const },
  { label: "NETWORK", tone: "cyan" as const },
  { label: "SECURITY", tone: "violet" as const },
  { label: "MONITORING", tone: "accent" as const },
];

export function InfrastructureVisualization({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Pointer → parallax offsets in SVG units, smoothed with springs.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawRX = useMotionValue(0);
  const rawRY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 120, damping: 22, mass: 0.6 });
  const my = useSpring(rawY, { stiffness: 120, damping: 22, mass: 0.6 });
  const rotateX = useSpring(rawRX, { stiffness: 140, damping: 24 });
  const rotateY = useSpring(rawRY, { stiffness: 140, damping: 24 });

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduce || e.pointerType !== "mouse" || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      rawX.set(nx * 9);
      rawY.set(ny * 7);
      rawRX.set(-ny * 3.5);
      rawRY.set(nx * 4.5);
    },
    [reduce, rawX, rawY, rawRX, rawRY]
  );

  const onLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    rawRX.set(0);
    rawRY.set(0);
    setHovered(null);
  }, [rawX, rawY, rawRX, rawRY]);

  const connected = useMemo(() => {
    const set = new Set<string>();
    if (!hovered) return set;
    LINKS.forEach((l) => {
      if (l.from === hovered) set.add(l.to);
      if (l.to === hovered) set.add(l.from);
    });
    return set;
  }, [hovered]);

  const animate = !reduce;

  return (
    <div className={cn("relative [perspective:1400px]", className)}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass relative overflow-hidden rounded-3xl p-3 sm:p-4"
      >
        {/* fine grid behind the topology */}
        <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 [background-size:32px_32px] opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" />

        {/* header row */}
        <div className="relative z-10 flex items-center justify-between px-2 pt-1">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="mono-label">topology · illustrative</span>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="relative z-10 mt-1 h-auto w-full"
          role="group"
          aria-label="Abstract infrastructure topology: internet, firewall, security, core switch, blade servers, Hyper-V, monitoring, NAS, SAN and virtual machines"
        >
          <defs>
            <radialGradient id="ringGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* radar sweep behind monitoring */}
          <g style={{ transformOrigin: "465px 282px" }} className={cn(animate && "animate-spin-slow")}>
            <circle cx={465} cy={282} r={62} fill="url(#ringGrad)" />
            <path d="M465 282 L527 282 A62 62 0 0 0 496 228 Z" fill="var(--cyan)" opacity={0.08} />
          </g>
          <circle cx={465} cy={282} r={62} fill="none" stroke="var(--cyan)" strokeOpacity={0.2} strokeDasharray="2 5" />

          {LINKS.map((l) => {
            const isActive = hovered === l.from || hovered === l.to;
            const dim = Boolean(hovered) && !isActive;
            return (
              <Link
                key={`${l.from}-${l.to}`}
                link={l}
                mx={mx}
                my={my}
                active={isActive}
                dim={dim}
                animate={animate}
              />
            );
          })}

          {NODES.map((n) => (
            <Node
              key={n.id}
              node={n}
              mx={mx}
              my={my}
              hovered={hovered === n.id}
              connected={connected.has(n.id)}
              onHover={setHovered}
            />
          ))}
        </svg>

        {/* status strip */}
        <div className="relative z-10 mt-1 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line px-2 pb-1 pt-3">
          {STATUS.map((s) => (
            <span key={s.label} className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.14em] text-muted">
              <StatusDot tone={s.tone} pulse={animate} />
              {s.label}
            </span>
          ))}
          <span className="ml-auto hidden font-mono text-[10px] tracking-widest text-faint sm:inline">
            visual only
          </span>
        </div>
      </motion.div>

      {/* floating badges */}
      <motion.div
        aria-hidden="true"
        className={cn("glass absolute -left-3 top-16 hidden rounded-xl px-3 py-2 md:block", animate && "animate-float")}
        style={{ animationDelay: "0.8s" }}
      >
        <p className="mono-label !text-[9.5px]">iDRAC / SSH / RDP</p>
        <p className="mt-0.5 text-xs font-semibold text-fg">Remote administration</p>
      </motion.div>
      <motion.div
        aria-hidden="true"
        className={cn("glass absolute -right-3 bottom-20 hidden rounded-xl px-3 py-2 md:block", animate && "animate-float")}
      >
        <p className="mono-label !text-[9.5px]">SNMP / ICMP / SSH</p>
        <p className="mt-0.5 text-xs font-semibold text-fg">Health telemetry</p>
      </motion.div>
    </div>
  );
}
