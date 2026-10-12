import { SPEC } from '@/config/specs';

export type FaqCategory = 'WIRING' | 'INSTALLATION' | 'CONNECTIVITY' | 'WARRANTY' | 'AVAILABILITY';

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

export const FAQ_CATEGORIES: readonly { id: 'ALL' | FaqCategory; label: string }[] = [
  { id: 'ALL', label: 'All' },
  { id: 'WIRING', label: 'Wiring' },
  { id: 'INSTALLATION', label: 'Installation' },
  { id: 'CONNECTIVITY', label: 'Connectivity' },
  { id: 'WARRANTY', label: 'Warranty' },
  { id: 'AVAILABILITY', label: 'Availability' },
];

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: 'faq-neutral',
    category: 'WIRING',
    question: 'Does Smart Switch need a neutral wire?',
    answer:
      'Yes. The standard models are designed to need a neutral wire in the switch box. We are looking at a version without that requirement, but it is not available. Ask your electrician to check the box before you order.',
  },
  {
    id: 'faq-diy',
    category: 'INSTALLATION',
    question: 'Can I install it myself?',
    answer:
      'No. It connects to mains voltage, so a certified, licensed electrician has to fit it and follow your local electrical code.',
  },
  {
    id: 'faq-offline',
    category: 'CONNECTIVITY',
    question: 'Does it still work if the Wi-Fi goes down?',
    answer:
      'That is how it is designed. The paddle is meant to switch the circuit directly, so everyday switching does not depend on Wi-Fi or the internet. We will confirm this during hardware testing.',
  },
  {
    id: 'faq-load',
    category: 'WIRING',
    question: 'How much load can each gang take?',
    answer: `The provisional rating is ${SPEC.loadPerGang} per gang at ${SPEC.voltage}. These figures are still to be confirmed by lab testing and electrical code listings, and they may change before release.`,
  },
  {
    id: 'faq-platforms',
    category: 'CONNECTIVITY',
    question: 'Which smart-home platforms will it work with?',
    answer:
      'We are building toward Matter over Wi-Fi, with Bluetooth LE for pairing. We do not claim compatibility with any platform yet. The exact protocols will be confirmed for each regional version.',
  },
  {
    id: 'faq-certs',
    category: 'INSTALLATION',
    question: 'Is it certified?',
    answer:
      'Not yet. Safety and regulatory testing is under way. We will only show a certification mark once we hold the lab certificate.',
  },
  {
    id: 'faq-warranty',
    category: 'WARRANTY',
    question: 'What warranty will it have?',
    answer: `We plan a ${SPEC.warrantyMonths}-month manufacturer warranty for units installed by a licensed electrician. Final terms will be confirmed at launch.`,
  },
  {
    id: 'faq-box',
    category: 'INSTALLATION',
    question: 'How deep does the wall box need to be?',
    answer: `It is designed for standard gang boxes at least ${SPEC.boxDepth} deep. That figure is provisional and will be confirmed for each regional version.`,
  },
  {
    id: 'faq-dimming',
    category: 'WIRING',
    question: 'Can it dim any light?',
    answer:
      'The dimmer is meant for dimmable loads. Which LED drivers and lamps work with it will be confirmed for each version, so share your fittings with your electrician and with us before you order.',
  },
  {
    id: 'faq-multiway',
    category: 'WIRING',
    question: 'Does it work as a two-way switch?',
    answer:
      'Multi-way wiring is planned with your electrician at the design stage. Support for specific multi-way setups will be confirmed for each regional version.',
  },
  {
    id: 'faq-mix',
    category: 'INSTALLATION',
    question: 'Can I use different finishes in one house?',
    answer:
      'Yes. All finishes share the same plate shape, so mixing is a design choice. Some people use one finish per floor. We can help you plan it.',
  },
  {
    id: 'faq-app',
    category: 'CONNECTIVITY',
    question: 'Do I need an app?',
    answer:
      'No. Everyday switching works with the paddle alone. The optional smart features are being developed on open standards, and we have not announced any companion app.',
  },
  {
    id: 'faq-provisional',
    category: 'WARRANTY',
    question: 'What does "provisional" mean on this site?',
    answer:
      'It marks a figure or claim that is still waiting for lab testing, certification or final sourcing. We label these so architects and electricians know what to rely on, and we update them as results come in.',
  },
  {
    id: 'faq-samples',
    category: 'AVAILABILITY',
    question: 'How do I get a spec sheet or finish samples?',
    answer:
      'Use the Book a Demo form and choose the architect option, or contact us directly. We will tell you what printed material and samples are available.',
  },
  {
    id: 'faq-availability',
    category: 'AVAILABILITY',
    question: 'When can I buy it?',
    answer:
      'It is not on sale yet. Regional availability, prices and lead times will be announced once hardware testing and certification are done. You can register your interest through Book a Demo.',
  },
  {
    id: 'faq-internet',
    category: 'CONNECTIVITY',
    question: 'Does it need the internet to be useful?',
    answer:
      'The goal is that basic switching never needs the internet. Network features are optional extras on top of local control.',
  },
];
