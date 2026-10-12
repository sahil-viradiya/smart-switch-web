/**
 * Site-wide constants: brand, contact details, SEO defaults.
 *
 * Contact details below are the real ones supplied by the owner.
 * TODO(owner): confirm the email spelling, add a postal address if wanted
 * (leave ADDRESS_LINES empty to hide it) and confirm the legal entity name.
 */
export const APP_CONFIG = {
  BRAND_NAME: 'Smart Switch',
  BRAND_TAGLINE: 'Smart touch switches',
  LEGAL_COMPANY_NAME: 'Smart Switch',
  SUPPORT_EMAIL: 'hell@optimanex.com',
  SALES_EMAIL: 'hell@optimanex.com',
  /** Display format. */
  PHONE: '+91 97255 58828',
  /** E.164, used for tel: links. */
  PHONE_E164: '+919725558828',
  /** Digits only, country code first -  used for wa.me links. */
  WHATSAPP_NUMBER: '919725558828',
  ADDRESS_LINES: [] as readonly string[],
  DEFAULT_META_TITLE: 'Smart Switch | Smart touch switches in glass and acrylic',
  DEFAULT_META_DESCRIPTION:
    'Smart touch switches in glass or acrylic, in two series and six sizes. Control them from the wall, an app, your voice or a remote, with Wi-Fi or Zigbee versions.',
  COPYRIGHT_YEAR: 2026,
} as const;

export const WHATSAPP_DEFAULT_MESSAGE = `Hello ${APP_CONFIG.BRAND_NAME}, I would like to know more about the switch.`;

/** https://wa.me link that opens a WhatsApp chat with an optional pre-filled message. */
export const whatsappHref = (message: string = WHATSAPP_DEFAULT_MESSAGE) => `https://wa.me/${APP_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
export const telHref = () => `tel:${APP_CONFIG.PHONE_E164}`;
export const mailHref = (to: string = APP_CONFIG.SALES_EMAIL, subject?: string) => `mailto:${to}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
