import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  number: string;
  label: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
};

/** Numbered section wrapper shared by every content block on the page. */
export function Section({
  id,
  number,
  label,
  title,
  subtitle,
  children,
  className,
  headerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("relative scroll-mt-24 py-20 sm:py-28 lg:py-32", className)}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className={cn("mb-12 max-w-3xl sm:mb-16", headerClassName)}>
          <div className="mono-label mb-4 flex items-center gap-3">
            <span className="text-accent">{number}</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            <span>{label}</span>
          </div>
          <h2
            id={`${id}-title`}
            className="text-3xl font-bold tracking-[-0.02em] text-fg sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {subtitle}
            </p>
          ) : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
