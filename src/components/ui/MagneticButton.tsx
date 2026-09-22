"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

type AnchorProps = CommonProps & {
  href: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  "aria-label"?: string;
};

type ButtonProps = CommonProps & {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-[background-color,color,box-shadow,border-color] duration-300 select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-bg shadow-[0_0_0_1px_var(--line-strong),0_12px_30px_-12px_var(--glow)] hover:shadow-[0_0_0_1px_var(--accent),0_18px_40px_-14px_var(--glow)]",
  secondary:
    "glass text-fg hover:border-line-strong hover:bg-[color-mix(in_srgb,var(--surface)_60%,var(--accent)_8%)]",
  ghost: "text-muted hover:text-fg",
};

/**
 * Button/link with a subtle magnetic pull toward the cursor.
 * Disabled for reduced-motion and coarse pointers (touch).
 */
export function MagneticButton(props: AnchorProps | ButtonProps) {
  const { variant = "primary", className, children, icon, iconPosition = "right" } = props;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduce || e.pointerType !== "mouse" || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      x.set(dx * 0.22);
      y.set(dy * 0.28);
    },
    [reduce, x, y]
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const content = (
    <>
      {icon && iconPosition === "left" ? (
        <span className="transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>
      ) : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? (
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>
      ) : null}
    </>
  );

  const cls = cn(base, variants[variant], className);

  if ("href" in props && props.href) {
    const { href, download, target, rel, onClick } = props;
    return (
      <motion.a
        ref={(el) => {
          ref.current = el;
        }}
        href={href}
        download={download}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-label={props["aria-label"]}
        className={cls}
        style={{ x: sx, y: sy }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        whileTap={reduce ? undefined : { scale: 0.97 }}
      >
        {content}
      </motion.a>
    );
  }

  const { type = "button", onClick } = props as ButtonProps;
  return (
    <motion.button
      ref={(el) => {
        ref.current = el;
      }}
      type={type}
      onClick={onClick}
      aria-label={props["aria-label"]}
      aria-expanded={(props as ButtonProps)["aria-expanded"]}
      className={cls}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileTap={reduce ? undefined : { scale: 0.97 }}
    >
      {content}
    </motion.button>
  );
}
