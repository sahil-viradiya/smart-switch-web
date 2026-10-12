# Smart Switch — System Architecture Document

## 1. Architectural Philosophy & Overview

The Smart Switch project is built as a pure, focused, production-grade **Product Marketing Website** using Next.js (App Router), TypeScript, and shared type & validation packages.

All marketing journeys, hardware simulators, lead generation forms, and partner flows are completely self-contained within the modern Next.js architecture, eliminating external API server dependencies and complexity.

```
smart-switch/
├── apps/
│   └── web/                   # Next.js App Router Marketing Website
├── packages/
│   ├── shared-types/          # Domain models and entity interfaces
│   ├── shared-validation/     # Shared Zod validation schemas
│   └── shared-config/         # Route constants and verified product constants
├── docs/                      # Architectural, requirement, and operational specs
├── .env.example               # Sanitized environment template
└── package.json               # Root monorepo workspace definition
```

---

## 2. Frontend Architecture (`apps/web`)

### 2.1 Next.js App Router Structure
```
apps/web/src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                  # Homepage
│   │   ├── product/page.tsx          # Product overview & specs
│   │   ├── features/page.tsx         # Verified features directory
│   │   ├── features/[slug]/page.tsx  # Dynamic deep-dive feature pages
│   │   ├── how-it-works/page.tsx     # Installation & certified process
│   │   ├── use-cases/page.tsx        # Residential & commercial applications
│   │   ├── use-cases/[slug]/page.tsx # Specific application deep-dives
│   │   ├── request-demo/page.tsx     # Consultation & demo request
│   │   ├── contact/page.tsx          # General & technical contact
│   │   ├── faq/page.tsx              # Searchable FAQ with categories
│   │   ├── about/page.tsx            # Design & engineering philosophy
│   │   ├── privacy-policy/page.tsx   # Privacy & GDPR policy
│   │   ├── terms-and-conditions/page.tsx # Terms of use & warranty
│   │   └── cookies/page.tsx          # Cookie disclosure
│   ├── (account)/
│   │   ├── signup/page.tsx           # Partner & installer registration
│   │   ├── login/page.tsx            # Partner portal sign-in
│   │   └── forgot-password/page.tsx  # Password recovery flow
│   ├── layout.tsx                    # Root layout with Header and Footer
│   ├── not-found.tsx                 # Semantic 404 page
│   ├── error.tsx                     # Global error boundary
│   ├── loading.tsx                   # Top-level fallback loader
│   ├── sitemap.ts                    # Dynamic XML sitemap generator
│   ├── robots.ts                     # Search engine robots directives
│   └── manifest.ts                   # PWA web app manifest
├── components/
│   ├── layout/                       # Header, Footer, MobileMenu
│   ├── product/                      # InteractiveSwitchPreview (hardware simulator)
│   ├── forms/                        # LeadForm, ContactForm, SignupForm, LoginForm
│   └── ui/                           # FaqAccordion
└── styles/
    └── globals.css                   # Custom Vanilla CSS tokens and reset
```

### 2.2 Server Components vs. Client Components
- **Server Components by Default**:
  - All static informational pages (`/product`, `/about`, `/how-it-works`, `/use-cases`, `/privacy-policy`, etc.) are rendered entirely on the server.
  - Zero JavaScript shipped for static display sections, guaranteeing maximum Core Web Vitals performance and instant First Contentful Paint.
- **Client Components (`'use client'`)**:
  - `InteractiveSwitchPreview`: Live hardware switch simulator allowing users to toggle switch gangs and finishes.
  - `LeadForm`, `ContactForm`, `SignupForm`, `LoginForm`: Interactive forms featuring real-time client-side Zod validation and instant confirmation receipts.
  - `FaqAccordion`: Interactive question search and accordion toggle.
  - `MobileMenu`: Accessible drawer navigation for mobile devices.

---

## 3. Form Validation & User Flows

1. **Client-Side Zod Validation**: All form inputs are validated against strict Zod schemas (`@smart-switch/shared-validation`).
2. **Instant Receipt Generation**: Successful submissions generate a unique tracking reference (e.g., `LEAD-XXXXXX` or `MSG-XXXXXX`) and provide clear follow-up timelines.
3. **No External Server Dependency**: The website operates completely standalone, eliminating backend connection failures or downtime risks.
