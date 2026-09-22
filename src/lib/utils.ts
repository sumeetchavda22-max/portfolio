export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Polar → cartesian in percentage space (used by radial layouts). */
export function polar(cx: number, cy: number, radius: number, angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
}
