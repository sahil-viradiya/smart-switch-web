# Smart Switch — Architecture

A single Next.js 14 (App Router) + TypeScript (strict) application. It is a static-first marketing site with one server endpoint (`/api/inquiries`) that saves inquiries to an Excel sheet. No database, no authentication.

## Folder layout

```
src/
├── app/                 # file-system routes (flat; no route groups)
│   ├── page.tsx                      # /
│   ├── product/  features/  features/[slug]/        # "Technology" in the nav
│   ├── how-it-works/  use-cases/  use-cases/[slug]/
│   ├── request-demo/  contact/  faq/  about/
│   ├── privacy-policy/  terms-and-conditions/  cookies/
│   ├── layout.tsx  error.tsx  loading.tsx  not-found.tsx
│   └── sitemap.ts  robots.ts  manifest.ts  icon.svg
├── components/{art,layout,home,product,forms,ui}
├── content/             # page copy as typed data
├── config/              # routes, pages, cta, site, specs, images, navigation (derived)
├── theme/               # colors, typography, layout, motion, art, fonts  (generates CSS variables)
├── lib/                 # validation (Zod), form helpers, seo helper
├── types/
└── styles/              # base → components → sections → animations (tokens only)
```

## Design system & single sources of truth
`src/theme/` is the only place colours, fonts, sizes, radii, button sizing and motion are defined. `themeCss()` turns it into CSS variables injected in `<head>`; CSS and SVG art read tokens only. `src/config/` holds the facts: routes, the page registry (names, SEO, nav/footer placement), CTA labels, brand/contact, product specs and the image registry. See `docs/customization.md`; `npm run check:theme` enforces it.

## Motion
CSS keyframes/transitions plus two small client pieces: `Reveal` (IntersectionObserver, gated by `html.js`) and `HeroVisual` (scene rotation, paused when hidden/off-screen). `IntroSplash` plays once per session on `/`. Everything is disabled under `prefers-reduced-motion`.

## Conventions
- Server Components by default; `'use client'` only for interactive pieces (header/menu, forms, FAQ, configurator, hero visual, reveal, intro).
- Always link through `ROUTES` from `@/config`; never hard-code paths or use `href="#"`.
- Spec values live in `PRODUCT_SPECS` and are **provisional** until lab-confirmed (see `requirements.md` §2.2).
- Imports use the `@/` alias (maps to `src/`).

## Forms & inquiry storage
`LeadForm` (Book a Demo), `ContactForm` and the footer `Newsletter` validate client-side with Zod, then `POST /api/inquiries`. The route handler re-validates with the same shared schema (`lib/validation/inquiry.ts`), checks same-origin, size and a per-IP rate limit, drops honeypot hits, assigns a reference (`DEMO-YYMMDD-XXXXX`) and appends a row to `data/inquiries.xlsx` and/or a Google Sheet (`src/server/inquiries`). An append-only `data/inquiries.jsonl` backup guarantees nothing is lost if Excel has the file locked. The success state appears only after the server confirms; on failure the form keeps the text and offers WhatsApp / email / phone. See `docs/inquiry-sheet.md`. `/request-demo?intent=architect|installer|homeowner` pre-selects the enquiry type.
