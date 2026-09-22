"use client";

import type { ArchitectureKind } from "@/data/projects";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Card art: small abstract illustrations that animate on hover.       */
/* ------------------------------------------------------------------ */

export function ProjectArt({ kind, active, animate }: { kind: ArchitectureKind; active: boolean; animate: boolean }) {
  const common = "h-full w-full";
  switch (kind) {
    case "vms":
      return <VmsArt className={common} active={active} animate={animate} />;
    case "smtc":
      return <SmtcArt className={common} active={active} animate={animate} />;
    case "nms":
      return <NmsArt className={common} active={active} animate={animate} />;
    case "nms-enterprise":
      return <TopologyArt className={common} active={active} animate={animate} />;
  }
}

type ArtProps = { className?: string; active: boolean; animate: boolean };

function VmsArt({ className, active, animate }: ArtProps) {
  const tiles = [
    { x: 16, y: 14, state: "ok" },
    { x: 106, y: 14, state: "blur" },
    { x: 196, y: 14, state: "ok" },
    { x: 16, y: 74, state: "ok" },
    { x: 106, y: 74, state: "offline" },
    { x: 196, y: 74, state: "ok" },
  ];
  return (
    <svg viewBox="0 0 300 130" className={className} aria-hidden="true">
      {tiles.map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={t.y} width={80} height={48} rx={6} fill="var(--surface-strong)" stroke="var(--line-strong)" />
          {t.state === "offline" ? (
            <>
              <line x1={t.x + 30} y1={t.y + 16} x2={t.x + 50} y2={t.y + 32} stroke="var(--faint)" strokeWidth={1.5} />
              <line x1={t.x + 50} y1={t.y + 16} x2={t.x + 30} y2={t.y + 32} stroke="var(--faint)" strokeWidth={1.5} />
            </>
          ) : (
            <>
              <path
                d={`M${t.x + 10} ${t.y + 36} L${t.x + 28} ${t.y + 20} L${t.x + 42} ${t.y + 30} L${t.x + 56} ${t.y + 14} L${t.x + 70} ${t.y + 36} Z`}
                fill="var(--accent)"
                opacity={t.state === "blur" ? 0.18 : 0.35}
                style={t.state === "blur" ? { filter: "blur(2.5px)" } : undefined}
              />
              <circle cx={t.x + 60} cy={t.y + 14} r={3} fill="var(--cyan)" opacity={t.state === "blur" ? 0.3 : 0.7} />
            </>
          )}
          <circle
            cx={t.x + 72}
            cy={t.y + 8}
            r={2.2}
            fill={t.state === "ok" ? "var(--success)" : t.state === "blur" ? "var(--warning)" : "#ef4444"}
          />
          <rect x={t.x + 6} y={t.y + 40} width={22} height={3} rx={1.5} fill="var(--line-strong)" />
        </g>
      ))}
      {/* scan line */}
      <rect
        x={0}
        y={0}
        width={300}
        height={2}
        fill="var(--cyan)"
        opacity={active ? 0.7 : 0.35}
        className={cn(animate && "animate-scan")}
      />
    </svg>
  );
}

function SmtcArt({ className, active, animate }: ArtProps) {
  const blades = Array.from({ length: 8 });
  return (
    <svg viewBox="0 0 300 130" className={className} aria-hidden="true">
      <rect x={18} y={12} width={264} height={106} rx={8} fill="var(--surface-strong)" stroke="var(--line-strong)" />
      {blades.map((_, i) => {
        const x = 30 + i * 30;
        const hot = i === 5;
        return (
          <g key={i}>
            <rect x={x} y={22} width={22} height={62} rx={3} fill="var(--bg)" stroke="var(--line)" />
            <rect x={x + 5} y={28} width={12} height={2} rx={1} fill="var(--line-strong)" />
            <rect x={x + 5} y={34} width={12} height={2} rx={1} fill="var(--line-strong)" />
            <circle cx={x + 11} cy={74} r={2.2} fill={hot ? "var(--warning)" : "var(--success)"} className={cn(hot && animate && "animate-pulse")} />
            {/* utilization bar */}
            <rect x={x + 5} y={44} width={12} height={22} rx={2} fill="var(--line)" />
            <rect
              x={x + 5}
              y={66 - [12, 8, 16, 6, 18, 20, 10, 14][i]}
              width={12}
              height={[12, 8, 16, 6, 18, 20, 10, 14][i]}
              rx={2}
              fill={hot ? "var(--warning)" : "var(--accent)"}
              opacity={active ? 0.9 : 0.6}
            />
          </g>
        );
      })}
      {/* fans */}
      {[62, 122, 182, 242].map((cx) => (
        <g key={cx} style={{ transformOrigin: `${cx}px 100px` }} className={cn(animate && "animate-spin-fan")}>
          <circle cx={cx} cy={100} r={9} fill="none" stroke="var(--cyan)" strokeOpacity={0.5} />
          <path d={`M${cx} ${100 - 8} L${cx + 3} 100 L${cx} ${100 + 8} L${cx - 3} 100 Z`} fill="var(--cyan)" opacity={0.6} />
          <path d={`M${cx - 8} 100 L${cx} ${100 - 3} L${cx + 8} 100 L${cx} ${100 + 3} Z`} fill="var(--cyan)" opacity={0.6} />
        </g>
      ))}
      <text x={274} y={114} textAnchor="end" fontFamily="var(--font-jetbrains)" fontSize={8} fill="var(--faint)" letterSpacing={1}>
        M1000E
      </text>
    </svg>
  );
}

function NmsArt({ className, active, animate }: ArtProps) {
  const nodes = [
    { x: 60, y: 45 },
    { x: 150, y: 30 },
    { x: 240, y: 50 },
    { x: 100, y: 95 },
    { x: 200, y: 98 },
  ];
  return (
    <svg viewBox="0 0 300 130" className={className} aria-hidden="true">
      {nodes.map((n, i) => (
        <g key={i}>
          {animate ? (
            <circle cx={n.x} cy={n.y} r={6} fill="none" stroke="var(--accent)" strokeOpacity={0.6}>
              <animate attributeName="r" values="6;22" dur="2.4s" begin={`${i * 0.45}s`} repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.6;0" dur="2.4s" begin={`${i * 0.45}s`} repeatCount="indefinite" />
            </circle>
          ) : null}
          <rect x={n.x - 16} y={n.y - 10} width={32} height={20} rx={4} fill="var(--surface-strong)" stroke="var(--line-strong)" />
          <rect x={n.x - 11} y={n.y - 5} width={14} height={2} rx={1} fill="var(--line-strong)" />
          <rect x={n.x - 11} y={n.y + 1} width={14} height={2} rx={1} fill="var(--line-strong)" />
          <circle cx={n.x + 10} cy={n.y - 4} r={1.8} fill="var(--success)" />
        </g>
      ))}
      {/* threat intel badge */}
      <g transform="translate(258 96)">
        <path d="M0 -14 L12 -9 V0 C12 8 6 13 0 15 C-6 13 -12 8 -12 0 V-9 Z" fill="var(--violet)" opacity={active ? 0.35 : 0.2} stroke="var(--violet)" strokeOpacity={0.8} />
        <text x={0} y={4} textAnchor="middle" fontFamily="var(--font-jetbrains)" fontSize={8} fill="var(--fg)" fontWeight={600}>
          TI
        </text>
      </g>
      <text x={16} y={120} fontFamily="var(--font-jetbrains)" fontSize={8} fill="var(--faint)" letterSpacing={1}>
        ICMP · SSH · IP REPUTATION
      </text>
    </svg>
  );
}

function TopologyArt({ className, active, animate }: ArtProps) {
  const nodes = [
    { x: 150, y: 24, hub: true },
    { x: 70, y: 66 },
    { x: 150, y: 70 },
    { x: 230, y: 66 },
    { x: 40, y: 108 },
    { x: 100, y: 110 },
    { x: 200, y: 110 },
    { x: 260, y: 108 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 4],
    [1, 5],
    [3, 6],
    [3, 7],
  ];
  return (
    <svg viewBox="0 0 300 130" className={className} aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--accent)"
          strokeOpacity={active ? 0.7 : 0.4}
          strokeDasharray="3 5"
          className={cn(animate && "animate-dash")}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.hub ? 9 : 6} fill="var(--surface-strong)" stroke={n.hub ? "var(--cyan)" : "var(--line-strong)"} />
          <circle cx={n.x} cy={n.y} r={n.hub ? 3 : 2} fill={i === 6 ? "var(--warning)" : n.hub ? "var(--cyan)" : "var(--success)"} />
        </g>
      ))}
      {/* SLA bars */}
      <g transform="translate(232 14)">
        {[18, 26, 22, 30].map((h, i) => (
          <rect key={i} x={i * 12} y={34 - h} width={8} height={h} rx={2} fill="var(--violet)" opacity={0.35 + i * 0.12} />
        ))}
      </g>
      <text x={16} y={22} fontFamily="var(--font-jetbrains)" fontSize={8} fill="var(--faint)" letterSpacing={1}>
        UP / DOWN / MAINT
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Architecture diagram for the project modal (data-driven, layered).  */
/* ------------------------------------------------------------------ */

type DNode = { id: string; label: string; sub?: string; col: number; tone?: "accent" | "cyan" | "violet" };
type DEdge = [string, string];

const diagrams: Record<ArchitectureKind, { nodes: DNode[]; edges: DEdge[] }> = {
  vms: {
    nodes: [
      { id: "cams", label: "CCTV Cameras", sub: "site feeds", col: 0 },
      { id: "vms", label: "VMS", sub: "video management", col: 0 },
      { id: "analysis", label: "Stream Analysis", sub: "blur · freeze · offline · quality", col: 1, tone: "cyan" },
      { id: "app", label: "Django Application", sub: "alerts · logs · recording · playback · geofence", col: 2, tone: "accent" },
      { id: "dash", label: "Admin Dashboard", sub: "cameras · sites · users", col: 3, tone: "violet" },
      { id: "alerts", label: "Alerts & Health Logs", sub: "timestamped", col: 3, tone: "violet" },
    ],
    edges: [
      ["cams", "analysis"],
      ["vms", "analysis"],
      ["analysis", "app"],
      ["app", "dash"],
      ["app", "alerts"],
    ],
  },
  smtc: {
    nodes: [
      { id: "blades", label: "Blade Servers", sub: "M630 / M640", col: 0 },
      { id: "chassis", label: "M1000e Chassis", sub: "fans · PDU · temp", col: 0 },
      { id: "hv", label: "Hyper-V Hosts", sub: "VMs", col: 0 },
      { id: "collect", label: "Collectors", sub: "SNMP · SSH · PowerShell", col: 1, tone: "cyan" },
      { id: "core", label: "Monitoring Core", sub: "Django / Flask · PostgreSQL", col: 2, tone: "accent" },
      { id: "dash", label: "Dashboard & Inventory", col: 3, tone: "violet" },
      { id: "email", label: "Smart Alerts → Email", col: 3, tone: "violet" },
      { id: "backup", label: "VM Backup", sub: "Local · NAS · SAN", col: 3, tone: "violet" },
    ],
    edges: [
      ["blades", "collect"],
      ["chassis", "collect"],
      ["hv", "collect"],
      ["collect", "core"],
      ["core", "dash"],
      ["core", "email"],
      ["core", "backup"],
    ],
  },
  nms: {
    nodes: [
      { id: "linux", label: "Linux Servers", col: 0 },
      { id: "ips", label: "External IPs", sub: "connections", col: 0 },
      { id: "icmp", label: "ICMP Ping", sub: "availability", col: 1, tone: "cyan" },
      { id: "ssh", label: "SSH Health Checks", sub: "CPU · memory · disk · uptime", col: 1, tone: "cyan" },
      { id: "ti", label: "Threat Intelligence", sub: "IP reputation · score", col: 1, tone: "violet" },
      { id: "core", label: "Python NMS Core", col: 2, tone: "accent" },
      { id: "alerts", label: "Alerts", col: 3, tone: "violet" },
      { id: "reports", label: "Reports", col: 3, tone: "violet" },
    ],
    edges: [
      ["linux", "icmp"],
      ["linux", "ssh"],
      ["ips", "ti"],
      ["icmp", "core"],
      ["ssh", "core"],
      ["ti", "core"],
      ["core", "alerts"],
      ["core", "reports"],
    ],
  },
  "nms-enterprise": {
    nodes: [
      { id: "groups", label: "Server Groups", sub: "UP / DOWN / Maintenance", col: 0 },
      { id: "inv", label: "Inventory", sub: "Excel bulk import", col: 0 },
      { id: "ping", label: "Ping Scheduler", sub: "reachability + history", col: 1, tone: "cyan" },
      { id: "core", label: "Django Platform", sub: "PostgreSQL · SLA engine · RBAC", col: 2, tone: "accent" },
      { id: "dash", label: "Dashboard & Topology", col: 3, tone: "violet" },
      { id: "reports", label: "SLA / Uptime Reports", sub: "PDF · Excel · CSV", col: 3, tone: "violet" },
      { id: "tickets", label: "Ticketing", sub: "create · assign · close", col: 3, tone: "violet" },
    ],
    edges: [
      ["groups", "ping"],
      ["inv", "core"],
      ["ping", "core"],
      ["core", "dash"],
      ["core", "reports"],
      ["core", "tickets"],
    ],
  },
};

const W = 880;
const COL_X = [110, 330, 550, 770];
const NODE_W = 176;
const NODE_H = 46;
const GAP = 16;

export function ArchitectureDiagram({ kind, animate }: { kind: ArchitectureKind; animate: boolean }) {
  const { nodes, edges } = diagrams[kind];
  const cols = [0, 1, 2, 3].map((c) => nodes.filter((n) => n.col === c));
  const maxRows = Math.max(...cols.map((c) => c.length));
  const H = maxRows * (NODE_H + GAP) + 44;

  const pos = new Map<string, { x: number; y: number }>();
  cols.forEach((list, c) => {
    const totalH = list.length * NODE_H + (list.length - 1) * GAP;
    const startY = (H - totalH) / 2;
    list.forEach((n, r) => pos.set(n.id, { x: COL_X[c], y: startY + r * (NODE_H + GAP) + NODE_H / 2 }));
  });

  const toneStroke = { accent: "var(--accent)", cyan: "var(--cyan)", violet: "var(--violet)" };

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full min-w-[640px]"
        role="img"
        aria-label="Architecture diagram showing data sources, collection, core application and outputs"
      >
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--faint)" />
          </marker>
        </defs>
        {edges.map(([a, b]) => {
          const p = pos.get(a)!;
          const q = pos.get(b)!;
          const x1 = p.x + NODE_W / 2;
          const x2 = q.x - NODE_W / 2;
          const mid = (x1 + x2) / 2;
          const d = `M${x1} ${p.y} C${mid} ${p.y} ${mid} ${q.y} ${x2} ${q.y}`;
          return (
            <g key={`${a}-${b}`}>
              <path d={d} fill="none" stroke="var(--line-strong)" strokeWidth={1.2} markerEnd="url(#arrow)" />
              <path
                d={d}
                fill="none"
                stroke="var(--accent)"
                strokeOpacity={0.7}
                strokeWidth={1.2}
                strokeDasharray="4 8"
                className={cn(animate && "animate-dash")}
              />
            </g>
          );
        })}
        {nodes.map((n) => {
          const p = pos.get(n.id)!;
          const stroke = n.tone ? toneStroke[n.tone] : "var(--line-strong)";
          return (
            <g key={n.id}>
              <rect
                x={p.x - NODE_W / 2}
                y={p.y - NODE_H / 2}
                width={NODE_W}
                height={NODE_H}
                rx={10}
                fill="var(--surface-strong)"
                stroke={stroke}
                strokeOpacity={n.tone ? 0.7 : 1}
              />
              <text
                x={p.x}
                y={n.sub ? p.y - 3 : p.y + 4}
                textAnchor="middle"
                fontFamily="var(--font-inter)"
                fontSize={12.5}
                fontWeight={600}
                fill="var(--fg)"
              >
                {n.label}
              </text>
              {n.sub ? (
                <text
                  x={p.x}
                  y={p.y + 12}
                  textAnchor="middle"
                  fontFamily="var(--font-jetbrains)"
                  fontSize={9}
                  letterSpacing={0.4}
                  fill="var(--faint)"
                >
                  {n.sub}
                </text>
              ) : null}
            </g>
          );
        })}
        {["SOURCES", "COLLECTION", "CORE", "OUTPUTS"].map((t, i) => (
          <text
            key={t}
            x={COL_X[i]}
            y={H - 8}
            textAnchor="middle"
            fontFamily="var(--font-jetbrains)"
            fontSize={9}
            letterSpacing={2}
            fill="var(--faint)"
          >
            {t}
          </text>
        ))}
      </svg>
    </div>
  );
}
