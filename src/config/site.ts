/**
 * Site-wide constants: brand, contact details, SEO defaults.
 *
 * Contact details below are the real ones supplied by the owner.
 * ADDRESS is the street address, shown in full (with the pincode and country) in the footer and on the
 * contact page; the policies use the same lines. The legal name is in `config/legal.ts`.
 */
/** Public address of the website (set NEXT_PUBLIC_SITE_URL in production). Used for canonical links, the sitemap and structured data. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/** The business address. Everything that shows it (footer, contact page, policies, structured data, map link) reads this one object. */
export const ADDRESS = {
  street: '502, Business Hub, Arved Transcube Plaza',
  area: 'Ranip',
  city: 'Ahmedabad',
  region: 'Gujarat',
  postalCode: '382480',
  country: 'India',
} as const;

/** Display lines for the address, one per line. */
export const ADDRESS_LINES: readonly string[] = [ADDRESS.street, `${ADDRESS.area}, ${ADDRESS.city}`, `${ADDRESS.region} ${ADDRESS.postalCode}`, ADDRESS.country];

import { SPEC } from './specs';

export const APP_CONFIG = {
  BRAND_NAME: 'Smart Switch',
  BRAND_TAGLINE: 'Smart touch switches',
  SUPPORT_EMAIL: 'hello@optimanex.com',
  SALES_EMAIL: 'hello@optimanex.com',
  /** Display format. */
  PHONE: '+91 97255 58828',
  /** E.164, used for tel: links. */
  PHONE_E164: '+919725558828',
  /** Digits only, country code first -  used for wa.me links. */
  WHATSAPP_NUMBER: '919725558828',
  DEFAULT_META_TITLE: `Smart Switch | Touch Switches & Home Automation, ${ADDRESS.city}`,
  DEFAULT_META_DESCRIPTION:
    `Glass and acrylic smart touch switches with Wi-Fi or Zigbee, app and voice control, modular 2M to 12M sizes and a ${SPEC.warrantyTerm} warranty. Based in ${ADDRESS.city}, India.`,
  COPYRIGHT_YEAR: 2026,
  META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '1455200079933584',
} as const;

/** Site-ownership codes from Google Search Console and Bing Webmaster Tools (HTML tag method). Empty = no tag. */
export const SEARCH_VERIFICATION = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || undefined,
} as const;

export const WHATSAPP_DEFAULT_MESSAGE = `Hello ${APP_CONFIG.BRAND_NAME}, I would like to know more about the switch.`;

/** https://wa.me link that opens a WhatsApp chat with an optional pre-filled message. */
export const whatsappHref = (message: string = WHATSAPP_DEFAULT_MESSAGE) => `https://wa.me/${APP_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
/** Opens the address in Google Maps (a plain link; nothing from Google loads on this site). */
export const mapsHref = () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_LINES.join(', '))}`;
export const telHref = () => `tel:${APP_CONFIG.PHONE_E164}`;
export const mailHref = (to: string = APP_CONFIG.SALES_EMAIL, subject?: string) => `mailto:${to}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
