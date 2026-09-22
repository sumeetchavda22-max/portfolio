# Sumit Chavda — Portfolio

Personal portfolio for **Sumit Chavda**, Data Center Technical Support Engineer & Infrastructure Engineer (Ahmedabad, Gujarat, India).

Built as a dark-first, infrastructure-themed single page: an interactive topology visualization, a professional timeline, project case studies with architecture diagrams, and an interactive technology constellation.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, static export) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-variable theming) |
| Animation | Framer Motion |
| Icons | Lucide + inline SVG brand marks |
| Fonts | Inter (UI) · JetBrains Mono (technical labels) |

No UI component library — every card, diagram and illustration is custom CSS/SVG.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
npm run lint
```

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx            # fonts, SEO metadata, theme bootstrap (no flash)
│  ├─ page.tsx              # section composition + JSON-LD Person schema
│  ├─ globals.css           # design tokens, light/dark themes, utilities
│  ├─ icon.svg              # favicon
│  └─ opengraph-image.tsx   # generated OG image
├─ components/
│  ├─ Navbar.tsx            # glass-on-scroll nav, active section, mobile menu
│  ├─ ThemeProvider.tsx     # dark/light, persisted in localStorage
│  ├─ Ambient.tsx           # grid background, cursor glow, page loader
│  ├─ InfrastructureVisualization.tsx
│  ├─ Footer.tsx
│  ├─ graphics/             # project card art + architecture diagrams (SVG)
│  ├─ sections/             # Hero, About, Experience, Projects, Skills, …
│  └─ ui/                   # Section, Reveal, MagneticButton, Chip, icons
└─ data/                    # all content, sourced from the CV
```

Content lives entirely in `src/data/` — editing a role, project or skill means editing one data file, not JSX.

## Theming

Colors are CSS variables on `:root` and `:root[data-theme="dark"]`. Dark is the default; light is a separately designed palette (white / off-white / slate / blue), not an inversion. The choice persists in `localStorage` under `sc-theme` and is applied before hydration to avoid a flash.

## Accessibility & motion

- Semantic landmarks, skip link, labelled sections, `aria-expanded` on all disclosures
- Modal with focus trap, Escape to close, focus restore and scroll lock
- Visible focus rings, keyboard-reachable topology nodes
- Every animation is disabled under `prefers-reduced-motion`

## CV

`public/Sumit_Chavda_CV_2026.pdf` is served by the "Download CV" buttons in the navbar, hero and contact section.

## Deploying

The site is a fully static export (`output: "export"`), so `./out` can be hosted anywhere.

**GitHub Pages** — the included workflow (`.github/workflows/deploy.yml`) builds and publishes on every push to `main`. Enable it under *Settings → Pages → Source: GitHub Actions*. For a project site (`username.github.io/<repo>`), the workflow sets `NEXT_PUBLIC_BASE_PATH` automatically.

**Vercel / Netlify** — import the repository; no configuration needed.

## Content policy

Everything on the site comes from the CV. No invented metrics, percentages, clients, testimonials or repository links — projects that have no public repository are labelled *Private / Internal Project*. The topology, terminal and status indicators are visual branding only and are not connected to any live system.
