/**
 * CTA -  every reusable button/link label with its destination.
 * Change a label or target here and every button using it updates.
 * Render with <CtaLink cta={CTA.BOOK_DEMO} />.
 */
import { ROUTES } from './routes';
import { whatsappHref } from './site';

export interface Cta {
  label: string;
  href: string;
}

export const CTA = {
  BOOK_DEMO: { label: 'Book a Demo', href: ROUTES.REQUEST_DEMO },
  CONTACT_US: { label: 'Contact us', href: ROUTES.CONTACT },
  CONTACT_SHORT: { label: 'Contact', href: ROUTES.CONTACT },
  EXPLORE_SWITCH: { label: 'Explore the switch', href: ROUTES.PRODUCT },
  VIEW_PRODUCT: { label: 'View the product', href: ROUTES.PRODUCT },
  EXPLORE_CONFIGS: { label: 'Explore configurations', href: `${ROUTES.PRODUCT}#configure` },
  ASK_PRODUCT: { label: 'Ask about this product', href: ROUTES.REQUEST_DEMO },
  SPEC_KIT: { label: 'Request a spec kit', href: `${ROUTES.REQUEST_DEMO}?intent=architect` },
  PLAN_SPACE: { label: 'Plan this space', href: ROUTES.REQUEST_DEMO },
  READ_FAQ: { label: 'Read the FAQ', href: ROUTES.FAQ },
  HOW_INSTALL: { label: 'See how installation works', href: ROUTES.HOW_IT_WORKS },
  WHATSAPP: { label: 'WhatsApp', href: whatsappHref() },
  BACK_HOME: { label: 'Back to home', href: ROUTES.HOME },
} as const satisfies Record<string, Cta>;

/** Enquiry intents understood by /request-demo?intent=... */
export const demoIntentHref = (intent: 'architect' | 'installer' | 'homeowner') => `${ROUTES.REQUEST_DEMO}?intent=${intent}`;
