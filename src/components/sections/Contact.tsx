"use client";

import { Download, Mail, MapPin, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { profile } from "@/data/profile";
import { MagneticButton } from "../ui/MagneticButton";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { StatusDot } from "../ui/Chip";

export function Contact() {
  return (
    <Section
      id="contact"
      number="06"
      label="Contact"
      title={
        <>
          Let&apos;s build <span className="gradient-text">reliable infrastructure</span>.
        </>
      }
      subtitle="Interested in infrastructure engineering, cybersecurity, monitoring platforms or technical automation?"
      className="pb-16 sm:pb-20"
    >
      <Reveal>
        <div className="glass border-glow relative overflow-hidden rounded-3xl p-6 sm:p-10">
          <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent)_25%,transparent),transparent)] blur-2xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--violet)_18%,transparent),transparent)] blur-2xl" />

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
                <StatusDot tone="success" /> Open to opportunities
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Whether it&apos;s a data center role, a security operations team or a monitoring
                platform that needs building — I&apos;d like to hear about it.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <MagneticButton href={`mailto:${profile.email}`} icon={<Mail className="size-4" aria-hidden="true" />} iconPosition="left">
                  Email Me
                </MagneticButton>
                <MagneticButton
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  icon={<LinkedinIcon className="size-4" />}
                  iconPosition="left"
                >
                  LinkedIn
                </MagneticButton>
                <MagneticButton
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  icon={<GithubIcon className="size-4" />}
                  iconPosition="left"
                >
                  GitHub
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
              </div>
            </div>

            <dl className="space-y-4 lg:col-span-5">
              <ContactRow icon={<MapPin className="size-4" aria-hidden="true" />} label="Location">
                {profile.location}
              </ContactRow>
              <ContactRow icon={<Mail className="size-4" aria-hidden="true" />} label="Email">
                <a href={`mailto:${profile.email}`} className="break-all transition-colors hover:text-accent">
                  {profile.email}
                </a>
              </ContactRow>
              <ContactRow icon={<Phone className="size-4" aria-hidden="true" />} label="Phone">
                <a href={profile.phoneHref} className="transition-colors hover:text-accent">
                  {profile.phone}
                </a>
              </ContactRow>
            </dl>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function ContactRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-line bg-bg-2/40 text-accent">{icon}</span>
      <div className="min-w-0">
        <dt className="mono-label">{label}</dt>
        <dd className="mt-1 text-sm font-medium text-fg sm:text-[15px]">{children}</dd>
      </div>
    </div>
  );
}
