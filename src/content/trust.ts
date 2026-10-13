import { APP_CONFIG, ROUTES, SPEC, legalName } from '@/config';

/** How buying works. Matches the Terms: a sale happens only when a quotation or order is confirmed in writing. */
export const HOW_TO_BUY = [
  { title: 'Tell us about your room', text: 'Message us on WhatsApp, call, email or use the enquiry form.' },
  { title: 'We suggest panels', text: 'A series, sizes and functions for each wall.' },
  { title: 'You get a written quotation', text: 'Prices and terms in writing, before you commit to anything.' },
  { title: 'Confirm your order', text: 'The order and the warranty terms are confirmed in writing too.' },
  { title: 'Your electrician fits it', text: 'Installation is done by a licensed electrician.' },
] as const;

/** Things a visitor can check for themselves. Each one is a fact about the site or the business, not a slogan. */
export const ASSURANCES = [
  { title: 'Who sells it', text: `${APP_CONFIG.BRAND_NAME} is sold by ${legalName()}. You can reach a person by phone, WhatsApp or email.`, link: { label: 'Contact us', href: ROUTES.CONTACT } },
  { title: `A ${SPEC.warrantyTerm} warranty`, text: 'On the panels. The terms are confirmed in writing when you order.', link: { label: 'Read the terms', href: ROUTES.TERMS } },
  { title: 'Honest specifications', text: 'Anything we have not confirmed is marked "to be confirmed" instead of guessed.', link: { label: 'See the specifications', href: `${ROUTES.PRODUCT}#specs` } },
  { title: 'No trackers', text: 'This website sets no cookies and loads nothing from other companies. Your details are used only to answer you.', link: { label: 'Cookie policy', href: ROUTES.COOKIES } },
  { title: 'Fitted by a professional', text: 'Smart Switch connects to mains power, so a licensed electrician must fit it. We never ask you to do it yourself.', link: { label: 'How it works', href: ROUTES.HOW_IT_WORKS } },
  { title: 'Your information, your control', text: 'Ask us to show, correct or delete what we hold about you at any time, and tell us if something is wrong.', link: { label: 'Privacy policy', href: ROUTES.PRIVACY } },
] as const;
