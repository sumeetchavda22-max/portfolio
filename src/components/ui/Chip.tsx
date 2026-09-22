import { cn } from "@/lib/utils";

type ChipProps = {
  children: React.ReactNode;
  tone?: "default" | "accent" | "cyan" | "violet" | "success" | "warning";
  className?: string;
  mono?: boolean;
};

const tones = {
  default: "border-line bg-surface text-muted",
  accent: "border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] text-accent",
  cyan: "border-[color-mix(in_srgb,var(--cyan)_35%,transparent)] bg-[color-mix(in_srgb,var(--cyan)_10%,transparent)] text-cyan",
  violet: "border-[color-mix(in_srgb,var(--violet)_35%,transparent)] bg-[color-mix(in_srgb,var(--violet)_10%,transparent)] text-violet",
  success: "border-[color-mix(in_srgb,var(--success)_35%,transparent)] bg-[color-mix(in_srgb,var(--success)_10%,transparent)] text-success",
  warning: "border-[color-mix(in_srgb,var(--warning)_35%,transparent)] bg-[color-mix(in_srgb,var(--warning)_10%,transparent)] text-warning",
};

export function Chip({ children, tone = "default", className, mono = true }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] leading-5 tracking-wide transition-colors duration-300",
        mono && "font-mono",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

type StatusDotProps = {
  tone?: "success" | "accent" | "cyan" | "violet" | "warning";
  pulse?: boolean;
  className?: string;
};

/** Small live-looking indicator. Purely decorative — never wired to real telemetry. */
export function StatusDot({ tone = "success", pulse = true, className }: StatusDotProps) {
  const color = {
    success: "text-success bg-success",
    accent: "text-accent bg-accent",
    cyan: "text-cyan bg-cyan",
    violet: "text-violet bg-violet",
    warning: "text-warning bg-warning",
  }[tone];
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block size-1.5 rounded-full", color, pulse && "animate-pulse-dot", className)}
    />
  );
}
