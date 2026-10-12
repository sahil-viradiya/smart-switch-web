import { SPEC } from '@/config/specs';

export interface FeatureFact {
  label: string;
  value: string;
  provisional: boolean;
}

export interface Feature {
  slug: string;
  title: string;
  headline: [string, string?];
  eyebrow: string;
  summary: string;
  overview: string;
  details: { heading: string; description: string }[];
  facts: FeatureFact[];
  related: { slug: string; title: string };
  icon: 'paddle' | 'bolt' | 'grid' | 'orbit';
}

export const FEATURES: readonly Feature[] = [
  {
    slug: 'tactile-precision',
    title: 'Tactile feel',
    headline: ['A switch you', 'can feel.'],
    eyebrow: 'Mechanics',
    summary: 'Mechanical paddles and a small status light, with no touch panel.',
    overview:
      'People press a wall switch thousands of times. Smart Switch keeps a real mechanical paddle for that, and puts the smart parts behind it.',
    details: [
      { heading: 'A paddle you can find in the dark', description: 'The paddles are large and weighted evenly, so a press at the edge feels the same as one in the middle.' },
      { heading: 'A quiet click', description: 'We are tuning the mechanism to keep the click soft. The final sound and feel will be measured in lab testing.' },
      { heading: 'A status light, not a screen', description: 'A small LED shows whether the circuit is on. It is dim enough for a bedroom at night.' },
    ],
    facts: [
      { label: 'Control', value: 'Mechanical paddle', provisional: false },
      { label: 'Indicator', value: 'Small status LED', provisional: false },
      { label: 'Travel, force and life', value: 'To be measured in lab testing', provisional: true },
    ],
    related: { slug: 'modular-design', title: 'Plates and finishes' },
    icon: 'paddle',
  },
  {
    slug: 'electrical-safety',
    title: 'Electrical safety',
    headline: ['Safety comes', 'first.'],
    eyebrow: 'Safety',
    summary: 'Built around protection, and installed only by licensed electricians.',
    overview:
      'Mains voltage leaves no room for shortcuts. Smart Switch is designed around protection and professional installation. Protection ratings and certifications are still being tested, so we do not claim any yet.',
    details: [
      { heading: 'Flame-retardant housing', description: 'The housing is designed around a flame-retardant plastic. We will publish the exact rating once certified testing confirms it.' },
      { heading: 'Over-current and surge protection', description: 'Protecting the load and the electronics from supply faults is a design goal. Lab results are still to come.' },
      { heading: 'Licensed installation only', description: 'A certified, licensed electrician must fit it, following your local electrical code.' },
    ],
    facts: [
      { label: 'Supply', value: SPEC.voltage, provisional: true },
      { label: 'Load per gang', value: SPEC.loadPerGang, provisional: true },
      { label: 'Certifications', value: 'In testing. None claimed yet', provisional: true },
      { label: 'Installation', value: 'Licensed electrician required', provisional: false },
    ],
    related: { slug: 'tactile-precision', title: 'Tactile feel' },
    icon: 'bolt',
  },
  {
    slug: 'modular-design',
    title: 'Plates and finishes',
    headline: ['One system', 'for every wall.'],
    eyebrow: 'Design',
    summary: '1, 2 and 3-gang plates and a dimmer, in three finishes.',
    overview:
      'Rooms differ but the wall should not look different in each one. Every Smart Switch plate shares the same faceplate and finishes, so mixed layouts still match.',
    details: [
      { heading: 'Flush plates', description: 'The faceplate sits flat on the wall and the fixings are hidden.' },
      { heading: 'Standard wall boxes', description: `Made for standard gang boxes at least ${SPEC.boxDepth} deep. The figure is provisional and is confirmed for each regional version.` },
      { heading: 'Three finishes', description: 'Matte Charcoal, Architectural White and Brushed Aluminum, chosen to sit next to door hardware, joinery and fittings.' },
    ],
    facts: [
      { label: 'Configurations', value: '1, 2 and 3-gang, plus dimmer', provisional: false },
      { label: 'Finishes', value: 'Charcoal, White, Aluminum', provisional: false },
      { label: 'Wall box', value: `Standard gang box, ${SPEC.boxDepth} minimum depth`, provisional: true },
    ],
    related: { slug: 'smart-ecosystem', title: 'Connectivity' },
    icon: 'grid',
  },
  {
    slug: 'smart-ecosystem',
    title: 'Connectivity',
    headline: ['Smart features,', 'local switching.'],
    eyebrow: 'Connectivity',
    summary: 'The paddle switches locally. Smart features are optional and use open standards.',
    overview:
      'A light switch should not stop working because the internet does. Smart Switch is designed so the paddle switches the circuit directly, and the network features are an extra on top.',
    details: [
      { heading: 'Local first', description: 'Pressing the paddle is meant to switch the circuit directly, without waiting for the cloud or your router.' },
      { heading: 'Open standards', description: 'We are building toward Matter over Wi-Fi, with Bluetooth LE for pairing. The exact protocols are confirmed for each regional version.' },
      { heading: 'No lock-in', description: 'Everyday switching should never depend on one company\'s cloud.' },
    ],
    facts: [
      { label: 'Radios', value: SPEC.connectivity, provisional: true },
      { label: 'Platform badges', value: 'None claimed yet', provisional: true },
    ],
    related: { slug: 'electrical-safety', title: 'Electrical safety' },
    icon: 'orbit',
  },
];

export const getFeature = (slug: string) => FEATURES.find((f) => f.slug === slug);
