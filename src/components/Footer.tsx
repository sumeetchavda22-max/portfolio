import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-mono text-sm font-semibold tracking-[0.18em] text-fg">SUMIT CHAVDA</p>
          <p className="mt-1.5 font-mono text-[11px] tracking-[0.12em] text-faint">
            Data Center | Infrastructure | Cybersecurity | Automation
          </p>
        </div>

        <nav aria-label="Social links">
          <ul className="flex items-center gap-2" role="list">
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                <LinkedinIcon className="size-4" /> LinkedIn
              </a>
            </li>
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                <GithubIcon className="size-4" /> GitHub
              </a>
            </li>
            <li>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                <Mail className="size-4" aria-hidden="true" /> Email
              </a>
            </li>
          </ul>
        </nav>

        <p className="font-mono text-[11px] tracking-[0.12em] text-faint">© 2026 Sumit Chavda</p>
      </div>
    </footer>
  );
}
