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
  { id: 'WIRING', label: 'Functions' },
  { id: 'INSTALLATION', label: 'Installation' },
  { id: 'CONNECTIVITY', label: 'Control' },
  { id: 'WARRANTY', label: 'Warranty' },
  { id: 'AVAILABILITY', label: 'Ordering' },
];

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: 'faq-touch',
    category: 'WIRING',
    question: 'How do the touch panels work?',
    answer:
      'You touch the icon or touch point for each function on a glass or acrylic panel, and it lights up. You can also use the app, a voice assistant or a remote.',
  },
  {
    id: 'faq-ratings',
    category: 'WIRING',
    question: 'What do the ratings mean?',
    answer: `Switches and sockets come in ${SPEC.ratings} versions. Choose the rating to suit the load on each circuit, and ask your electrician if you are not sure.`,
  },
  {
    id: 'faq-fan',
    category: 'WIRING',
    question: 'Can a panel control a fan?',
    answer: 'Yes. Many panels include a fan control, for example 4 switches and 1 fan control, or 6 switches and 2 fan controls.',
  },
  {
    id: 'faq-curtain',
    category: 'WIRING',
    question: 'Can I control curtains?',
    answer: 'Yes. Single and dual curtain controls are available as 2M panels.',
  },
  {
    id: 'faq-dimmer',
    category: 'WIRING',
    question: 'Is there a dimmer?',
    answer:
      'Yes. Phase-cut dimmers come in a 2M panel with two dimmers in both series, and in a 6M panel with four dimmers in the Edge series. Check that your lamps are dimmable.',
  },
  {
    id: 'faq-sockets',
    category: 'WIRING',
    question: 'Can I have sockets and switches on one panel?',
    answer:
      `Yes. Many panels combine one or two sockets with switches and a fan control. Sockets come in ${SPEC.ratings} versions, and panels with sockets are mostly offered with an acrylic panel only.`,
  },
  {
    id: 'faq-diy',
    category: 'INSTALLATION',
    question: 'Can I install it myself?',
    answer: 'No. The panels connect to mains voltage, so a licensed electrician has to install them and follow your local electrical code.',
  },
  {
    id: 'faq-size',
    category: 'INSTALLATION',
    question: 'Which size do I need?',
    answer:
      'It depends on how many controls you want and the size of your wall box. Panels run from 2M to 12M. Browse the catalogue by size, or send us your wall box details and we will suggest one.',
  },
  {
    id: 'faq-material',
    category: 'INSTALLATION',
    question: 'Should I choose glass or acrylic?',
    answer:
      'Both have a slim border and work the same way. Glass costs more than acrylic. A few panels, such as single sockets and the USB charger, are only offered in acrylic.',
  },
  {
    id: 'faq-wifi-zigbee',
    category: 'CONNECTIVITY',
    question: 'Should I choose Wi-Fi or Zigbee?',
    answer:
      'Every panel comes in both. The Wi-Fi version connects to your Wi-Fi. The Zigbee version connects through a Zigbee gateway and usually costs more per panel.',
  },
  {
    id: 'faq-gateway',
    category: 'CONNECTIVITY',
    question: 'Do I need a gateway?',
    answer: 'Only for the Zigbee version. The gateway is sold separately as an Ethernet model or a USB model. The Wi-Fi version does not need one.',
  },
  {
    id: 'faq-app',
    category: 'CONNECTIVITY',
    question: 'Is there an app?',
    answer: 'Yes. You can control the panels from the app on Android and iOS phones and tablets.',
  },
  {
    id: 'faq-voice',
    category: 'CONNECTIVITY',
    question: 'Does it work with voice assistants?',
    answer: 'Yes. The panels work with voice assistants such as Alexa and Google Home.',
  },
  {
    id: 'faq-remote',
    category: 'CONNECTIVITY',
    question: 'Can I use a remote or control infrared devices?',
    answer:
      'A handheld remote (Remote R1-R2) is available as an accessory. An IR blaster is also available to control infrared devices such as air conditioners, and it works with Wi-Fi panels only.',
  },
  {
    id: 'faq-colour',
    category: 'CONNECTIVITY',
    question: 'Can I change the icon colours?',
    answer:
      'On the Color series, yes. You can choose the colour of each icon and adjust its brightness and saturation. The Edge series has round touch points with a fixed look.',
  },
  {
    id: 'faq-warranty',
    category: 'WARRANTY',
    question: 'What warranty do the panels have?',
    answer: `The panels come with a ${SPEC.warrantyTerm} warranty.`,
  },
  {
    id: 'faq-unconfirmed',
    category: 'WARRANTY',
    question: 'What does "to be confirmed" mean on this site?',
    answer:
      'It marks something we have not published yet, such as the supply voltage range or certifications. We only list what we can stand behind, and we will update these as they are confirmed.',
  },
  {
    id: 'faq-quote',
    category: 'AVAILABILITY',
    question: 'How do I get a quote or samples?',
    answer:
      'Use the Book a Demo form and choose the architect option, or contact us directly. Tell us the sizes and series you are interested in and we will reply with a quote and what samples are available.',
  },
  {
    id: 'faq-custom',
    category: 'AVAILABILITY',
    question: 'Can I get custom icons?',
    answer: 'Yes, on the Color series. Custom icons are charged per icon. Ask us when you request a quote.',
  },
];
