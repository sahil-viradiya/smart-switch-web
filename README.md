# Smart Switch — Product Marketing Website

A single Next.js (App Router) marketing website for the **Smart Switch** architectural electrical switch. Static-first, no backend, no API.

## Structure

```
smart_switch/
├── src/
│   ├── theme/          # ★ THE look: colors, typography, layout, motion, art palette (+ fonts)
│   ├── config/         # ★ THE facts: routes, pages (names/SEO/nav), cta (buttons), site (brand/contact), specs, images
│   ├── content/        # Page copy as data: product, features, use-cases, faq
│   ├── app/            # Routes (App Router): pages, layout, sitemap, robots, manifest, icon.svg
│   ├── components/
│   │   ├── art/        # Logo, Icons, SwitchArt, SceneArt, OrbitDiagram (SVG placeholders)
│   │   ├── layout/     # Header, Footer, MobileDock, IntroSplash
│   │   ├── home/       # HeroVisual
│   │   ├── product/    # Configurator
│   │   ├── forms/      # LeadForm, ContactForm, Field, FormSuccess
│   │   └── ui/         # Reveal, ButtonLink, CtaLink, PageHero, SectionHead, CtaBand, FaqAccordion...
│   ├── lib/            # validation/ (Zod), forms.ts (mailto), seo.ts (page metadata)
│   ├── types/          # Shared TypeScript types
│   └── styles/         # base.css, components.css, sections.css, animations.css (tokens only)
├── public/images/      # Real photos/renders (register in src/config/images.ts)
├── scripts/            # check-theme.mjs — guards the single sources of truth
├── docs/               # Requirements, architecture, page map, flows, design brief, customization guide
├── .env.example
└── package.json
```

Import with the `@/` alias, e.g. `import { ROUTES } from '@/config'`.

## Quick start

Requires Node.js 20+ (22/24 LTS recommended).

```bash
npm install
npm run dev          # http://localhost:3000
npm run type-check
npm run check         # type-check + guard against hard-coded colours/fonts/specs/paths
npm run build
```

## Docs
- [Requirements](docs/requirements.md)
- [Architecture](docs/architecture.md)
- [Page map](docs/page-map.md)
- [User flows](docs/user-flows.md)
- [Customization guide — where to change what](docs/customization.md)
- [Design brief](docs/design-brief.md)
- [Implementation plan](docs/implementation-plan.md)
