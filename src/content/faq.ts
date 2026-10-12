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
  { id: 'WIRING', label: 'Electrical & wiring' },
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
      'Yes. Standard models are designed to require a neutral wire in the switch back-box. A no-neutral variant is under evaluation and is not available. Please have your electrician check your wall box before you order.',
  },
  {
    id: 'faq-diy',
    category: 'INSTALLATION',
    question: 'Can I install it myself?',
    answer:
      'No. Smart Switch connects to mains voltage and must be installed by a certified, licensed electrician in line with local electrical codes.',
  },
  {
    id: 'faq-offline',
    category: 'CONNECTIVITY',
    question: 'Will it still work if my Wi-Fi goes down?',
    answer:
      'That is the design intent: the paddle is designed to switch the circuit locally, so everyday switching does not depend on Wi-Fi or the internet. Behaviour will be confirmed as part of hardware validation.',
  },
  {
    id: 'faq-load',
    category: 'WIRING',
    question: 'What load can each gang handle?',
    answer:
      `The provisional rating is ${SPEC.loadPerGang} per gang at ${SPEC.voltage}. These figures are pending engineering lab testing and national code listings, and may change before release.`,
  },
  {
    id: 'faq-platforms',
    category: 'CONNECTIVITY',
    question: 'Which smart-home platforms will it work with?',
    answer:
      'Smart Switch is designed for open connectivity with Matter readiness over Wi-Fi, using Bluetooth LE for pairing. We do not yet claim compatibility badges for any platform; exact protocols are confirmed per regional hardware revision.',
  },
  {
    id: 'faq-certs',
    category: 'INSTALLATION',
    question: 'Is Smart Switch certified?',
    answer:
      'Not yet. Safety and regulatory certification is in testing. We will publish certification marks only once accredited lab certificates are in hand.',
  },
  {
    id: 'faq-warranty',
    category: 'WARRANTY',
    question: 'What warranty will it have?',
    answer:
      `We plan a ${SPEC.warrantyMonths}-month manufacturer warranty when installed by a licensed electrician. Final terms will be confirmed at launch.`,
  },
  {
    id: 'faq-box',
    category: 'INSTALLATION',
    question: 'What wall box depth do I need?',
    answer:
      `Smart Switch is designed for standard gang wall boxes with a minimum depth of ${SPEC.boxDepth}. This figure is provisional and confirmed per regional SKU.`,
  },
  {
    id: 'faq-dimming',
    category: 'WIRING',
    question: 'Can it dim any light?',
    answer:
      'The dimmer variant is intended for dimmable loads. Which LED drivers and lamps are compatible will be confirmed per SKU, so please share your fittings with your electrician and with us before ordering.',
  },
  {
    id: 'faq-multiway',
    category: 'WIRING',
    question: 'Does it support multi-way (two-way) switching?',
    answer:
      'Multi-way arrangements are planned with your electrician at the design stage. Support for specific multi-way wiring will be confirmed per regional SKU.',
  },
  {
    id: 'faq-mix',
    category: 'INSTALLATION',
    question: 'Can I mix finishes within one home?',
    answer:
      'Yes — the finishes share one plate language, so mixing is a design choice. Many people keep one finish per floor or per room type. Our team can help you plan a consistent scheme.',
  },
  {
    id: 'faq-app',
    category: 'CONNECTIVITY',
    question: 'Do I need an app to use it?',
    answer:
      'No. Everyday switching is designed to work with the paddle alone. Optional smart features are being developed around open standards; details of any companion app have not been announced.',
  },
  {
    id: 'faq-provisional',
    category: 'WARRANTY',
    question: 'What does "provisional" mean on this site?',
    answer:
      'It marks a specification or claim that is still pending engineering lab testing, certification or final sourcing. We label these openly so architects and electricians can plan with confidence, and we update them as results are confirmed.',
  },
  {
    id: 'faq-samples',
    category: 'AVAILABILITY',
    question: 'How do I get a spec sheet or finish samples?',
    answer:
      'Use the Book a Demo form and choose the architect option, or contact the team directly. Availability of printed material and samples will be confirmed when you get in touch.',
  },
  {
    id: 'faq-availability',
    category: 'AVAILABILITY',
    question: 'When and where can I buy it?',
    answer:
      'Smart Switch is not on sale yet. Regional availability, pricing and lead times will be announced as hardware validation and certification complete. Register your interest through Book a Demo.',
  },
  {
    id: 'faq-privacy',
    category: 'CONNECTIVITY',
    question: 'Does the switch need an internet connection to be useful?',
    answer:
      'The design goal is that core switching never depends on the internet. Network features, where used, are intended to be optional layers on top of local control.',
  },
];
