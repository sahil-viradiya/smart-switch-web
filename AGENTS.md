# Agent Development Rules & Conventions for Smart Switch

This repository contains the **Smart Switch** architectural smart-home electrical switch marketing website and companion REST API.

## Architectural Principles
1. **Monorepo Structure**:
   - `apps/web`: Next.js App Router (frontend).
   - `apps/api`: Node.js + Express (REST API).
   - `packages/shared-types`: Common TypeScript definitions.
   - `packages/shared-validation`: Common Zod validation schemas.
   - `packages/shared-config`: Shared constants and route paths.
2. **Strict Hardware Integrity**:
   - Never fabricate unverified electrical ratings, certifications, or protocol compatibilities.
   - If a specification is unverified, clearly document it as provisional or pending lab confirmation.
3. **Security Standards**:
   - Never expose API secrets, database credentials, or JWT signing keys to browser client bundles.
   - Enforce Zod validation on both client and server boundaries.
   - Rate-limit all mutation endpoints to prevent form abuse.
4. **Code Quality**:
   - All TypeScript must compile with strict mode enabled (`strict: true`).
   - Use semantic HTML tags and ensure WCAG 2.1 AA keyboard accessibility.
   - Zero broken links (`href="#"` is strictly prohibited).
