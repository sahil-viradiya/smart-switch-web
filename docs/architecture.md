# Smart Switch — Architecture

A single Next.js 14 (App Router) + TypeScript (strict) application. It is a static-first marketing site: no API, no database, no authentication.

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

## Forms
`LeadForm` and `ContactForm` validate client-side with Zod, then hand the message to the visitor's email client via `mailto:`. Nothing is stored or sent by the site, and the success state says so. `/request-demo?intent=architect|installer|homeowner` pre-selects the enquiry type. If a form service is adopted later, replace `buildMailto` in `lib/forms.ts`.
