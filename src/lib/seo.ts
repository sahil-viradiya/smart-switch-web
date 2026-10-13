import type { Metadata } from 'next';
import { APP_CONFIG, IMAGES, LEGAL, PAGES, type PageKey } from '@/config';

const social = { url: IMAGES.social.src, width: IMAGES.social.width, height: IMAGES.social.height, alt: IMAGES.social.alt };

/** Open Graph block shared by every page (title and description differ per page). */
export function openGraph(title: string, description: string, path: string): NonNullable<Metadata['openGraph']> {
  return { type: 'website', title, description, url: path, images: [social] };
}

/** schema.org Organization for the home page. Every value comes from config; nothing is hard-coded here. */
export function organizationJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: APP_CONFIG.BRAND_NAME,
    legalName: LEGAL.entityName || undefined,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    email: APP_CONFIG.SUPPORT_EMAIL,
    telephone: APP_CONFIG.PHONE_E164,
    contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', email: APP_CONFIG.SALES_EMAIL, telephone: APP_CONFIG.PHONE_E164, areaServed: 'IN', availableLanguage: ['en'] }],
  };
}

/** Page metadata from the registry in `config/pages.ts`. */
export function pageMeta(key: PageKey): Metadata {
  const p = PAGES[key];
  return {
    title: key === 'HOME' ? { absolute: p.title } : p.title,
    description: p.description,
    alternates: { canonical: p.path },
    openGraph: openGraph(p.title, p.description, p.path),
  };
}
