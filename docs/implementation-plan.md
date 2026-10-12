# Smart Switch — Implementation Plan

Scope: a standalone product marketing website. No API, database or auth.

- [x] **Phase 1 — Docs & baseline**
- [x] **Phase 2 — Foundation:** single Next.js app, `@/` alias, `config/`, `lib/validation/`, `types/`; monorepo/API/account pages removed
- [x] **Phase 3 — Core pages:** home, product, features (+slugs), how-it-works, use-cases (+slugs), faq, about, legal, contact, request-demo
- [x] **Phase 4 — Content integrity:** unverified claims reworded as provisional (badges on specs); forms use honest `mailto:` handoff, no fake tracking IDs
- [x] **Phase 5 — Design system:** dark + gold tokens, Inter, ui primitives, responsive layout (see `docs/design-brief.md`)
- [x] **Phase 6 — Animation:** hero line reveal + outlined text, self-drawing house outline, scene rotation, hotspots, scroll reveals, orbit diagram, intro splash; honours `prefers-reduced-motion`
- [x] **Phase 6b — Scroll storytelling & content depth:** pinned scroll scenes (zoom reveal, feature wheel, exploded view), counters/gauge, marquee, parallax/tilt, clickable hotspot room, room tabs, lightbox gallery, wall checker, compare table, planned contents, personas, connectivity roadmap, newsletter handoff, section dots, progress line, back-to-top
- [ ] **Phase 7 (partly done: titles, canonicals, FAQ JSON-LD, skip link, focus states) — SEO/a11y/perf:** OG images, structured data, keyboard + WCAG 2.1 AA audit, Lighthouse pass
- [ ] **Phase 8 — Deploy:** Vercel (or static host), env vars, final README


## Open items before launch
- Confirm the contact email spelling, postal address (optional) and legal entity in `config/site.ts`.
- Choose inquiry storage (`docs/inquiry-sheet.md`); use Google Sheets if hosting on a serverless platform.
- Replace SVG placeholder art with real renders/photography (`components/art`).
- Have counsel review privacy/terms/cookies drafts.
- Upgrade Next.js (npm audit reports advisories for 14.x).
