# Smart Switch — System Architecture Document

## 1. Architectural Philosophy & Overview

The Smart Switch system is built as a clean, modular, production-ready monorepo combining:
1. **Frontend (`apps/web`)**: Next.js (App Router), TypeScript, React Server Components by default, minimal client boundaries, responsive design system.
2. **Backend API (`apps/api`)**: Node.js, Express, TypeScript, versioned REST API (`/api/v1`), domain-driven modular structure, layered architecture (Routes -> Controllers -> Services -> Repositories -> Stores).
3. **Shared Packages (`packages/*`)**: Shared TypeScript interfaces, validation schemas (Zod), and configuration constants shared between client and server.

```
smart-switch/
├── apps/
│   ├── web/           # Next.js App Router Frontend
│   └── api/           # Express REST API Service
├── packages/
│   ├── shared-types/      # Core interfaces, DTOs, domain models
│   ├── shared-validation/ # Zod schemas for forms, APIs, query params
│   └── shared-config/     # Environment tokens, route constants
├── docs/              # Architectural, requirement, and operational specs
├── scripts/           # Monorepo build, dev, and test scripts
└── package.json       # Root npm/pnpm workspace definition
```

---

## 2. Monorepo & Dependency Architecture

### 2.1 Workspace Configuration
- **Package Manager**: npm workspaces (or pnpm), leveraging Node.js v24.x LTS.
- **TypeScript**: Shared `tsconfig.base.json` extended by each application and package with strict type checking enabled (`strict: true`, `noImplicitAny: true`, `exactOptionalPropertyTypes: true`).
- **Build & Dev Tooling**: Concurrent workspace development via native npm scripts.

### 2.2 Shared Libraries
- `packages/shared-types`:
  - `Lead`: Lead entity, submission payload, lead status enum (`NEW`, `CONTACTED`, `QUALIFIED`, `CLOSED`).
  - `Contact`: Contact message entity, department routing enum.
  - `User`: Account entity, auth token payload, user role (`HOMEOWNER`, `INSTALLER`, `ARCHITECT`, `ADMIN`).
  - `ApiResponse<T>`: Standardized API response format (`{ success: boolean, data?: T, error?: ApiError, meta?: PaginationMeta }`).
- `packages/shared-validation`:
  - `leadSchema`: Name, email, phone regex, inquiry category, message length limits.
  - `contactSchema`: Department validation, email, message length.
  - `signupSchema` & `loginSchema`: Password complexity rules, email normalization.

---

## 3. Frontend Architecture (`apps/web`)

### 3.1 Next.js App Router Structure
```
apps/web/src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                  # Homepage
│   │   ├── product/page.tsx          # Product overview & specs
│   │   ├── features/page.tsx         # Verified features grid
│   │   ├── features/[slug]/page.tsx  # Dynamic deep-dive feature pages
│   │   ├── how-it-works/page.tsx     # Installation & operation process
│   │   ├── use-cases/page.tsx        # Residential & commercial applications
│   │   ├── use-cases/[slug]/page.tsx # Specific application deep-dives
│   │   ├── request-demo/page.tsx     # Consultation / demo request
│   │   ├── contact/page.tsx          # General contact form
│   │   ├── faq/page.tsx              # Comprehensive FAQ with categories
│   │   ├── about/page.tsx            # Company, ethos, safety standards
│   │   ├── privacy-policy/page.tsx   # Privacy & GDPR policy
│   │   ├── terms-and-conditions/page.tsx # Terms of use & warranty
│   │   └── cookies/page.tsx          # Cookie policy
│   ├── (account)/
│   │   ├── signup/page.tsx           # Installer & customer registration
│   │   ├── login/page.tsx            # Portal sign-in
│   │   └── forgot-password/page.tsx  # Password recovery
│   ├── layout.tsx                    # Root layout with HTML/Body & global fonts
│   ├── not-found.tsx                 # Semantic 404 page
│   ├── error.tsx                     # Global error boundary
│   ├── loading.tsx                   # Top-level fallback loader
│   ├── sitemap.ts                    # Dynamic XML sitemap generator
│   └── robots.ts                     # Robots.txt configuration
├── components/
│   ├── ui/                           # Button, Input, Select, Badge, Card, Dialog
│   ├── layout/                       # Header, Footer, Container, Grid, Section
│   ├── navigation/                   # DesktopNav, MobileNav, ActiveLink
│   ├── sections/                     # HeroSection, BenefitsSection, SpecTable
│   ├── product/                      # VariantSelector, InteractiveSwitchPreview
│   └── forms/                        # LeadForm, ContactForm, SignupForm, LoginForm
├── lib/                              # API client, analytics helpers, utilities
├── hooks/                            # useMediaQuery, useActiveSection, useFormSubmit
├── styles/                           # Design tokens, variables, global CSS
└── types/                            # Frontend-specific view model types
```

### 3.2 Server vs. Client Component Boundaries
- **Server Components (Default)**:
  - All page layouts, content sections, markdown/prose renderers, feature cards, specification tables, and legal policies are statically or server-rendered.
  - Zero JavaScript shipped for static display sections, reducing bundle size to the minimum.
- **Client Components (`'use client'`)**:
  - `MobileNav.tsx`: State for drawer menu toggle.
  - `VariantSelector.tsx`: Interactive gang selection (1-Gang, 2-Gang, 3-Gang) and color preview.
  - `LeadForm.tsx`, `ContactForm.tsx`, `SignupForm.tsx`: Interactive form state, client-side validation, submit loading spinners, and toast confirmations.
  - `Accordion.tsx` (FAQ): Expandable question panels with accessible keyboard controls.

---

## 4. Backend Architecture (`apps/api`)

### 4.1 Layered Domain Architecture
```
apps/api/src/
├── server.ts             # Process startup, graceful shutdown listeners
├── app.ts                # Express app initialization, middleware wiring
├── config/               # Validated env vars (PORT, CORS_ORIGIN, JWT_SECRET)
├── middlewares/
│   ├── security.ts       # Helmet, CORS policy, header sanitization
│   ├── rateLimiter.ts    # In-memory token bucket / express-rate-limit
│   ├── validate.ts       # Generic Zod request schema validator middleware
│   ├── errorHandler.ts   # Centralized error handler with consistent JSON
│   └── auth.ts           # Bearer token verification middleware
├── modules/
│   ├── health/
│   │   ├── health.routes.ts
│   │   └── health.controller.ts
│   ├── leads/
│   │   ├── lead.routes.ts
│   │   ├── lead.controller.ts
│   │   ├── lead.service.ts
│   │   ├── lead.repository.ts
│   │   └── lead.schema.ts
│   ├── contact/
│   │   ├── contact.routes.ts
│   │   ├── contact.controller.ts
│   │   ├── contact.service.ts
│   │   └── contact.repository.ts
│   └── auth/
│       ├── auth.routes.ts
│       ├── auth.controller.ts
│       ├── auth.service.ts
│       └── auth.repository.ts
└── database/
    ├── connection.ts     # In-memory store with PostgreSQL/Neon migration hook
    └── schema.sql        # Reference SQL schema for production persistence
```

### 4.2 Request Processing Lifecycle
```
[Client HTTP Request]
         │
         ▼
[Security Middleware] (Helmet headers, CORS check, JSON body limit 50kb)
         │
         ▼
[Rate Limiting Middleware] (Per-IP quota check: 10 requests / min on forms)
         │
         ▼
[Zod Validation Middleware] (Validates req.body, req.query, or req.params)
         │
   Valid? ──No──► [400 Bad Request Response with detailed field errors]
         │ Yes
         ▼
[Controller] (Extracts validated input, invokes Service method)
         │
         ▼
[Service] (Executes business logic, checks duplicates, hashes passwords)
         │
         ▼
[Repository] (Performs sanitized storage operations)
         │
         ▼
[Standardized Response] ({ success: true, data: ..., timestamp: ... })
```

---

## 5. Persistence Strategy & Migration Pathway

### 5.1 Storage Abstraction
The API uses a Repository pattern (`LeadRepository`, `ContactRepository`, `UserRepository`).
- **Initial Implementation**: An in-memory, thread-safe repository with seeded test accounts and persistent state during server runtime.
- **Production Persistence**: Designed for instant drop-in PostgreSQL support (e.g. Neon serverless Postgres). A complete `schema.sql` file provides the exact relational table structure, foreign keys, and indexes.

---

## 6. Security & Operational Hardening

1. **Input Sanitization**: Strip all HTML tags, enforce maximum character limits on all text fields.
2. **CORS Restrictions**: Configured strictly to accept requests only from the frontend origin.
3. **No Credential Leakage**: Log outputs exclude passwords, email addresses, and auth headers.
4. **Graceful Shutdown**: Traps `SIGTERM` and `SIGINT` to close pending network sockets cleanly.
