import type { Metadata } from 'next';
import { ADDRESS, APP_CONFIG, IMAGES, LEGAL, PAGES, ROUTES, SPEC, legalName, type PageKey } from '@/config';

const social = { url: IMAGES.social.src, width: IMAGES.social.width, height: IMAGES.social.height, alt: IMAGES.social.alt };

/** Open Graph block shared by every page (title and description differ per page). */
export function openGraph(title: string, description: string, path: string): NonNullable<Metadata['openGraph']> {
  return {
    type: 'website',
    locale: 'en_IN',
    siteName: legalName(),
    title,
    description,
    url: path,
    images: [social],
  };
}

/** Twitter card metadata for rich social and search sharing. */
export function twitterCard(title: string, description: string): NonNullable<Metadata['twitter']> {
  return {
    card: 'summary_large_image',
    title,
    description,
    images: [social.url],
  };
}

/** schema.org Organization for the home page. Every value comes from config. */
export function organizationJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: legalName(),
    legalName: LEGAL.entityName || undefined,
    url: siteUrl,
    logo: `${siteUrl}${IMAGES.logo.src}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${ADDRESS.street}, ${ADDRESS.area}`,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.postalCode,
      addressCountry: 'IN',
    },
    areaServed: 'IN',
    email: APP_CONFIG.SUPPORT_EMAIL,
    telephone: APP_CONFIG.PHONE_E164,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: APP_CONFIG.SALES_EMAIL,
        telephone: APP_CONFIG.PHONE_E164,
        areaServed: 'IN',
        availableLanguage: ['en'],
      },
    ],
  };
}

/** schema.org WebSite, linked to the Organization so search engines treat them as one entity. */
export function websiteJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: APP_CONFIG.BRAND_NAME,
    alternateName: legalName(),
    url: siteUrl,
    description: APP_CONFIG.DEFAULT_META_DESCRIPTION,
    inLanguage: 'en-IN',
    publisher: { '@id': `${siteUrl}/#organization` },
  };
}

/**
 * schema.org Product for the panel range. Only verified facts from `SPEC`: no price, stock,
 * rating or manufacturer, because the site publishes none of those (prices are hidden and the
 * supplier is not named). Google may report "missing offers"; that only means no price rich result.
 */
export function productJsonLd(siteUrl: string) {
  const prop = (name: string, value: string) => ({ '@type': 'PropertyValue', name, value });
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${siteUrl}${ROUTES.PRODUCT}#product`,
    name: `${APP_CONFIG.BRAND_NAME} touch switch panels`,
    url: `${siteUrl}${ROUTES.PRODUCT}`,
    image: `${siteUrl}${IMAGES.social.src}`,
    description: PAGES.PRODUCT.description,
    brand: { '@type': 'Brand', name: APP_CONFIG.BRAND_NAME },
    category: 'Smart home touch switches',
    material: SPEC.panels,
    additionalProperty: [
      prop('Module sizes', SPEC.moduleSizes),
      prop('Ratings', SPEC.ratings),
      prop('Versions', 'Wi-Fi or Zigbee'),
      prop('Warranty', SPEC.warranty),
    ],
  };
}

/** schema.org BreadcrumbList for SERP rich breadcrumbs. */
export function breadcrumbsJsonLd(crumbs: { name: string; path: string }[], siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path === '/' ? '' : crumb.path}`,
    })),
  };
}

/** schema.org FAQPage for rich expandable FAQ search snippets. */
export function faqJsonLd(items: readonly { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: i.answer,
      },
    })),
  };
}

/** Page metadata generator from the registry in `config/pages.ts`. */
export function pageMeta(key: PageKey): Metadata {
  const p = PAGES[key];
  const meta: Metadata = {
    title: key === 'HOME' ? { absolute: p.title } : p.title,
    description: p.description,
    alternates: { canonical: p.path },
    openGraph: openGraph(p.title, p.description, p.path),
    twitter: twitterCard(p.title, p.description),
  };
  if (p.keywords && p.keywords.length > 0) {
    meta.keywords = p.keywords;
  }
  if (p.noIndex) {
    meta.robots = { index: false, follow: false };
  }
  return meta;
}
