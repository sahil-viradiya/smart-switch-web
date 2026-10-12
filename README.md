# Smart Switch — Master Product Marketing & API Platform

A production-grade, architectural marketing website and companion REST API for the **Smart Switch** electrical automation product.

## Project Architecture

```
smart-switch/
├── apps/
│   ├── web/                     # Next.js App Router (React Server Components, SEO, Design System)
│   └── api/                     # Node.js + Express REST API (Zod validation, rate limiting, auth)
├── packages/
│   ├── shared-types/            # TypeScript domain models and DTOs
│   ├── shared-validation/       # Zod schemas shared between client and server
│   └── shared-config/           # Route constants and shared tokens
├── docs/                        # Specifications, architecture, page map, and user flows
│   ├── requirements.md
│   ├── architecture.md
│   ├── page-map.md
│   ├── user-flows.md
│   └── implementation-plan.md
├── .env.example                 # Sanitized environment variable template
└── package.json                 # Monorepo workspace configuration
```

## Quick Start

### 1. Prerequisites
- **Node.js**: v22.x or v24.x LTS (Tested on Node.js `v24.21.0`)
- **npm**: v10.x or v11.x

### 2. Installation
```bash
npm install
```

### 3. Development
Run both frontend and backend concurrently:
```bash
npm run dev
```

- **Marketing Website**: [http://localhost:3000](http://localhost:3000)
- **API Health Check**: [http://localhost:4000/api/v1/health](http://localhost:4000/api/v1/health)

### 4. Build & Verification
```bash
npm run type-check
npm run test
npm run build
```

## Documentation
- [Requirements & Assumptions](docs/requirements.md)
- [System Architecture](docs/architecture.md)
- [Complete Page & Route Map](docs/page-map.md)
- [Customer User Flows & Journeys](docs/user-flows.md)
- [Phased Implementation Plan](docs/implementation-plan.md)
