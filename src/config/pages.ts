/**
 * PAGES -  the single registry of page names, SEO titles, descriptions and where
 * each page appears (header nav, footer columns, sitemap).
 *
 * Rename a page or move it in the navigation here and every nav, breadcrumb,
 * footer link, <title>, canonical URL and sitemap entry follows. Paths live in
 * `routes.ts`; dynamic pages (/features/[slug], /use-cases/[slug]) take their
 * names from `content/`.
 */
import { APP_CONFIG } from './site';
import { ROUTES } from './routes';

export type PageKey =
  | 'HOME' | 'PRODUCT' | 'CATALOGUE' | 'FEATURES' | 'HOW_IT_WORKS' | 'USE_CASES' | 'REQUEST_DEMO'
  | 'CONTACT' | 'FAQ' | 'ABOUT' | 'PRIVACY' | 'TERMS' | 'COOKIES';

export interface PageDef {
  path: string;
  /** Display name used in nav, breadcrumbs and footer. */
  name: string;
  /** Shorter label for tight spots (e.g. footer legal row). Defaults to `name`. */
  shortName?: string;
  /** <title> (the site name is appended automatically, except on HOME). */
  title: string;
  description: string;
  /** Show in the header / mobile menu. */
  nav?: boolean;
  /** Footer column. */
  footer?: 'explore' | 'company' | 'legal';
  /** Sitemap priority (0-1). */
  priority: number;
}

export const PAGES: Record<PageKey, PageDef> = {
  HOME: { path: ROUTES.HOME, name: 'Home', title: APP_CONFIG.DEFAULT_META_TITLE, description: APP_CONFIG.DEFAULT_META_DESCRIPTION, nav: true, priority: 1 },
  PRODUCT: {
    path: ROUTES.PRODUCT, name: 'Product', title: 'Smart Switch Product', nav: true, footer: 'explore', priority: 0.9,
    description: 'Touch panels in the Color and Edge series, with glass or acrylic fronts, six sizes and Wi-Fi or Zigbee versions.',
  },
  CATALOGUE: {
    path: ROUTES.CATALOGUE, name: 'Catalogue', title: 'Product catalogue', footer: 'explore', priority: 0.9,
    description: 'Browse every panel configuration by size, function, series, panel material and version.',
  },
  FEATURES: {
    path: ROUTES.FEATURES, name: 'Technology', title: 'Technology', nav: true, footer: 'explore', priority: 0.7,
    description: 'How Smart Switch works: touch control, app and voice, Wi-Fi and Zigbee, and the range of sizes and functions.',
  },
  HOW_IT_WORKS: {
    path: ROUTES.HOW_IT_WORKS, name: 'How It Works', title: 'How It Works', footer: 'explore', priority: 0.7,
    description: 'How a Smart Switch installation goes: planning, installation by a licensed electrician, and everyday use.',
  },
  USE_CASES: {
    path: ROUTES.USE_CASES, name: 'Use Cases', title: 'Use Cases', nav: true, footer: 'explore', priority: 0.7,
    description: 'How Smart Switch fits family homes, renovations and studios.',
  },
  REQUEST_DEMO: {
    path: ROUTES.REQUEST_DEMO, name: 'Book a Demo', title: 'Book a Demo', footer: 'company', priority: 0.9,
    description: 'Ask for a consultation or demo for your home, studio or project.',
  },
  CONTACT: {
    path: ROUTES.CONTACT, name: 'Contact', title: 'Contact', nav: true, footer: 'company', priority: 0.7,
    description: 'Contact the Smart Switch team about sales, technical questions, installation or press.',
  },
  FAQ: {
    path: ROUTES.FAQ, name: 'FAQ', title: 'FAQ', footer: 'explore', priority: 0.7,
    description: 'Answers about wiring, installation, connectivity, warranty and availability.',
  },
  ABOUT: {
    path: ROUTES.ABOUT, name: 'About', title: 'About', footer: 'company', priority: 0.7,
    description: 'Why we built Smart Switch, the touch panels we make and what we care about when we design them.',
  },
  PRIVACY: { path: ROUTES.PRIVACY, name: 'Privacy Policy', shortName: 'Privacy', title: 'Privacy Policy', footer: 'legal', priority: 0.3, description: 'How Smart Switch collects, uses and protects the personal information you send us through this website.' },
  TERMS: { path: ROUTES.TERMS, name: 'Terms & Conditions', shortName: 'Terms', title: 'Terms & Conditions', footer: 'legal', priority: 0.3, description: 'The terms of use for the Smart Switch website, including how product information and enquiries are handled.' },
  COOKIES: { path: ROUTES.COOKIES, name: 'Cookie Policy', shortName: 'Cookies', title: 'Cookie Policy', footer: 'legal', priority: 0.3, description: 'How Smart Switch uses cookies and browser storage.' },
};

export const PAGE_LIST = Object.entries(PAGES) as [PageKey, PageDef][];
