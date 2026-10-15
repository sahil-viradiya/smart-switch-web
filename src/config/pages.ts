/**
 * PAGES -  the single registry of page names, SEO titles, descriptions and where
 * each page appears (header nav, footer columns, sitemap).
 *
 * Rename a page or move it in the navigation here and every nav, breadcrumb,
 * footer link, <title>, canonical URL and sitemap entry follows. Paths live in
 * `routes.ts`; dynamic pages (/features/[slug], /use-cases/[slug]) take their
 * names from `content/`.
 */
import { ADDRESS, APP_CONFIG } from './site';
import { ROUTES } from './routes';
import { SPEC } from './specs';

/** City for local search terms ("smart switch ahmedabad"). */
const CITY = ADDRESS.city.toLowerCase();

export type PageKey =
  | 'HOME' | 'PRODUCT' | 'CATALOGUE' | 'FEATURES' | 'HOW_IT_WORKS' | 'USE_CASES' | 'REQUEST_DEMO'
  | 'CONTACT' | 'FAQ' | 'ABOUT' | 'PRIVACY' | 'TERMS' | 'COOKIES' | 'THANK_YOU';

export interface PageDef {
  path: string;
  /** Display name used in nav, breadcrumbs and footer. */
  name: string;
  /** Shorter label for tight spots (e.g. footer legal row). Defaults to `name`. */
  shortName?: string;
  /** <title> (the site name is appended automatically, except on HOME). */
  title: string;
  description: string;
  /** Target search phrases. Put the main one in `title` and `description` too: search engines rank on visible text, not on this list. */
  keywords?: string[];
  /** Exclude from search index and sitemap (e.g. thank you / conversion pages). */
  noIndex?: boolean;
  /** Show in the header / mobile menu. */
  nav?: boolean;
  /** Footer column. */
  footer?: 'explore' | 'company' | 'legal';
  /** Sitemap priority (0-1). */
  priority: number;
}

export const PAGES: Record<PageKey, PageDef> = {
  HOME: {
    path: ROUTES.HOME,
    name: 'Home',
    title: APP_CONFIG.DEFAULT_META_TITLE,
    description: APP_CONFIG.DEFAULT_META_DESCRIPTION,
    keywords: [
      'smart switch',
      'smart touch switch',
      'smart switch board',
      'touch switch board',
      'glass touch switch',
      'wifi smart switch',
      'zigbee smart switch',
      `smart switch ${CITY}`,
      `home automation ${CITY}`,
      'smart home switches india',
    ],
    nav: true,
    priority: 1,
  },
  PRODUCT: {
    path: ROUTES.PRODUCT,
    name: 'Product',
    title: 'Glass & Acrylic Smart Touch Switch Panels',
    description: `Smart touch switch panels in glass or acrylic: Color series with backlit icons or Edge with touch points. Wi-Fi or Zigbee, ${SPEC.ratings}, ${SPEC.warrantyTerm} warranty.`,
    keywords: [
      'glass touch switch panel',
      'acrylic touch switch',
      'smart switch panel',
      'backlit touch switch',
      'touch switch with fan regulator',
      'modular smart switch',
    ],
    nav: true,
    footer: 'explore',
    priority: 0.9,
  },
  CATALOGUE: {
    path: ROUTES.CATALOGUE,
    name: 'Catalogue',
    title: 'Smart Switch Catalogue: 2M to 12M Panels',
    description: `Browse every smart touch switch panel by size (${SPEC.moduleSizes}), function, series, panel material and Wi-Fi or Zigbee version.`,
    keywords: [
      'smart switch catalogue',
      'touch switch models',
      '2M touch switch',
      '4M touch switch',
      '6M smart switch',
      '8M touch switch board',
      '12M smart switch panel',
    ],
    nav: true,
    footer: 'explore',
    priority: 0.9,
  },
  FEATURES: {
    path: ROUTES.FEATURES,
    name: 'Technology',
    title: 'Wi-Fi, Zigbee, App & Voice Smart Switches',
    description: 'How Smart Switch panels work: touch, an Android and iOS app, Alexa and Google Home voice control, a handheld remote, and Wi-Fi or Zigbee versions.',
    keywords: [
      'wifi touch switch',
      'zigbee touch switch',
      'alexa smart switch',
      'google home smart switch',
      'app controlled switch',
      'smart switch with remote',
    ],
    nav: true,
    footer: 'explore',
    priority: 0.7,
  },
  HOW_IT_WORKS: {
    path: ROUTES.HOW_IT_WORKS,
    name: 'How It Works',
    title: 'Smart Switch Installation: Plan, Fit, Use',
    description: 'Plan the wall, have a licensed electrician check the wiring and fit each panel, then control it by touch, app, voice or remote. A smart switch install guide.',
    keywords: [
      'smart switch installation',
      'how to install smart switch',
      'touch switch installation',
      'smart switch wiring check',
      'zigbee gateway setup',
    ],
    footer: 'explore',
    priority: 0.7,
  },
  USE_CASES: {
    path: ROUTES.USE_CASES,
    name: 'Use Cases',
    title: 'Smart Switch Ideas for Homes and Offices',
    description: 'Smart touch switch panels for family homes, renovations, studios and offices: lights and fan on one panel, scenes, curtains, dimmers, sockets and USB charging.',
    keywords: [
      'smart switches for home',
      'smart switch for renovation',
      'smart switches for office',
      'living room touch switch',
      'curtain touch switch',
    ],
    nav: true,
    footer: 'explore',
    priority: 0.7,
  },
  REQUEST_DEMO: {
    path: ROUTES.REQUEST_DEMO,
    name: 'Book a Demo',
    title: 'Book a Smart Switch Demo or Quote',
    description: `Book a demo, ask for a quote or request samples for your home, project or install. Our team in ${ADDRESS.city} replies with a quote and the samples available.`,
    keywords: [
      'smart switch demo',
      'smart switch quotation',
      'smart switch price',
      'touch switch samples',
      `buy smart switch ${CITY}`,
    ],
    footer: 'company',
    priority: 0.9,
  },
  CONTACT: {
    path: ROUTES.CONTACT,
    name: 'Contact',
    title: `Contact Us: Smart Switches in ${ADDRESS.city}`,
    description: `Contact the Smart Switch team in ${ADDRESS.city}, ${ADDRESS.region} by phone, WhatsApp or email for prices, project quotes, installation questions or support.`,
    keywords: [
      `smart switch ${CITY}`,
      `touch switch ${CITY}`,
      `home automation ${ADDRESS.region.toLowerCase()}`,
      'smart switch price enquiry',
      'smart switch whatsapp',
    ],
    nav: true,
    footer: 'company',
    priority: 0.7,
  },
  FAQ: {
    path: ROUTES.FAQ,
    name: 'FAQ',
    title: 'Smart Switch FAQ: Ratings, Wi-Fi, Warranty',
    description: `Answers about ${SPEC.ratings} ratings, sizes, glass or acrylic, Wi-Fi or Zigbee, gateways, the app, voice assistants, installation and the ${SPEC.warrantyTerm} warranty.`,
    keywords: [
      'smart switch faq',
      'wifi or zigbee switch',
      'smart switch warranty',
      'smart switch 6a vs 16a',
      'can i install smart switch myself',
    ],
    footer: 'explore',
    priority: 0.7,
  },
  ABOUT: {
    path: ROUTES.ABOUT,
    name: 'About',
    title: 'About Smart Switch',
    description: 'Why we offer smart touch switches in glass and acrylic, and how we keep every claim on this site to facts you can check.',
    keywords: [
      'about smart switch',
      'euxora digital',
      `smart switch company ${CITY}`,
    ],
    footer: 'company',
    priority: 0.7,
  },
  PRIVACY: {
    path: ROUTES.PRIVACY,
    name: 'Privacy Policy',
    shortName: 'Privacy',
    title: 'Privacy Policy',
    footer: 'legal',
    priority: 0.3,
    description: 'How Smart Switch collects, uses and protects the personal information you send us through this website.',
  },
  TERMS: {
    path: ROUTES.TERMS,
    name: 'Terms & Conditions',
    shortName: 'Terms',
    title: 'Terms & Conditions',
    footer: 'legal',
    priority: 0.3,
    description: 'The terms of use for the Smart Switch website, including how product information, quotation requests, and enquiries are handled.',
  },
  COOKIES: {
    path: ROUTES.COOKIES,
    name: 'Cookie Policy',
    shortName: 'Cookies',
    title: 'Cookie Policy',
    footer: 'legal',
    priority: 0.3,
    description: 'How Smart Switch uses cookies, browser storage keys, and advertising measurement technologies on this website.',
  },
  THANK_YOU: {
    path: ROUTES.THANK_YOU,
    name: 'Thank You',
    title: 'Thank You | Enquiry Received',
    priority: 0.1,
    noIndex: true,
    description: 'Thank you for contacting Smart Switch. Your enquiry details have been recorded and our team will follow up promptly.',
  },
};

export const PAGE_LIST = Object.entries(PAGES) as [PageKey, PageDef][];
