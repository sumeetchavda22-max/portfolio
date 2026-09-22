import { Award, GraduationCap } from "lucide-react";
import { certifications, education } from "@/data/education";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";

export function Education() {
  return (
    <Section id="education" number="05" label="Education" title="Education">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <ol className="space-y-4" role="list">
            {education.map((e, i) => (
              <Reveal key={e.degree} as="li" delay={0.06 * i}>
                <article className="glass border-glow group flex gap-4 rounded-2xl p-5 transition-transform duration-500 hover:-translate-y-0.5 sm:gap-5 sm:p-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface text-accent">
                    <GraduationCap className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-mono text-[10.5px] tracking-[0.16em] text-faint">{e.tag}</p>
                      <p className="font-mono text-xs tracking-[0.12em] text-accent">{e.period}</p>
                    </div>
                    <h3 className="mt-1.5 text-lg font-semibold text-fg">{e.degree}</h3>
                    <p className="mt-1 text-sm text-muted">{e.institution}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <div className="glass rounded-2xl p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl border border-line bg-surface text-violet">
                  <Award className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-fg">Certifications &amp; accomplishments</h3>
                  <p className="mono-label">as listed in CV</p>
                </div>
              </div>
              <ul className="divide-y divide-line" role="list">
                {certifications.map((c, i) => (
                  <li key={c.title} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                    <span className="mt-0.5 font-mono text-[10.5px] tracking-[0.14em] text-faint">0{i + 1}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-snug text-fg">{c.title}</p>
                      {c.issuer ? <p className="mt-0.5 font-mono text-[11px] text-muted">{c.issuer}</p> : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
