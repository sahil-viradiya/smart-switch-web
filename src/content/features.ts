import { SPEC } from '@/config/specs';
export interface FeatureFact {
  label: string;
  value: string;
  provisional: boolean;
}

export interface Feature {
  slug: string;
  title: string;
  headline: [string, string];
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
    title: 'Tactile Precision',
    headline: ['Feels as good', 'as it looks.'],
    eyebrow: 'Mechanical design',
    summary: 'Mechanical paddles and a calm status LED — physical feedback instead of glass.',
    overview:
      'A wall switch is touched thousands of times. Smart Switch keeps a real mechanical paddle at the centre of the experience, with the smart layer working quietly behind it.',
    details: [
      { heading: 'A paddle you can find in the dark', description: 'Large, evenly weighted paddles are designed to feel the same whether pressed at the centre or the edge.' },
      { heading: 'Quiet by intent', description: 'Acoustic tuning is a design goal so the click is muted and premium rather than harsh. Final characterisation is pending lab testing.' },
      { heading: 'A soft status indicator', description: 'A micro-illumination LED confirms state without the glare of a screen — gentle enough for bedrooms.' },
    ],
    facts: [
      { label: 'Control', value: 'Mechanical tactile paddle', provisional: false },
      { label: 'Indicator', value: 'Micro-illumination LED', provisional: false },
      { label: 'Travel, force & life', value: 'Pending lab characterisation', provisional: true },
    ],
    related: { slug: 'modular-design', title: 'Modular Design' },
    icon: 'paddle',
  },
  {
    slug: 'electrical-safety',
    title: 'Electrical Safety',
    headline: ['Safety first.', 'Always.'],
    eyebrow: 'Safety engineering',
    summary: 'A protection-first design, installed by licensed electricians only.',
    overview:
      'Mains voltage is not a place for shortcuts. Smart Switch is designed around protection and professional installation. Protection ratings and certifications are still in testing and are not claimed until confirmed.',
    details: [
      { heading: 'Flame-retardant housing', description: 'The housing is designed around a flame-retardant polycarbonate. The formal rating will be published once confirmed by certified testing.' },
      { heading: 'Over-current & surge protection', description: 'Protecting the load and the electronics from supply irregularities is a core design goal, pending engineering lab results.' },
      { heading: 'Licensed installation only', description: 'Installation must be carried out by a certified, licensed electrician in line with local electrical codes.' },
    ],
    facts: [
      { label: 'Supply', value: SPEC.voltage, provisional: true },
      { label: 'Load per gang', value: SPEC.loadPerGang, provisional: true },
      { label: 'Certifications', value: 'In testing — none claimed yet', provisional: true },
      { label: 'Installation', value: 'Licensed electrician required', provisional: false },
    ],
    related: { slug: 'tactile-precision', title: 'Tactile Precision' },
    icon: 'bolt',
  },
  {
    slug: 'modular-design',
    title: 'Modular Design',
    headline: ['One system.', 'Every wall.'],
    eyebrow: 'Form & finish',
    summary: '1, 2 and 3-gang plates and a dimmer variant in three architectural finishes.',
    overview:
      'Rooms differ; the wall should not. Smart Switch is a modular family that shares one plate language, so a hallway, a studio and a bedroom read as a single design.',
    details: [
      { heading: 'Flush, minimal plates', description: 'A clean faceplate with concealed fixings is the design intent, so nothing interrupts the wall.' },
      { heading: 'Standard wall boxes', description: `Designed for standard gang wall boxes with a minimum depth of ${SPEC.boxDepth}. Regional box standards are confirmed per SKU.` },
      { heading: 'Three architectural finishes', description: 'Matte Charcoal, Architectural White and Brushed Aluminum to sit alongside millwork, door hardware and fittings.' },
    ],
    facts: [
      { label: 'Configurations', value: '1, 2, 3-gang + dimmer', provisional: false },
      { label: 'Finishes', value: 'Charcoal, White, Aluminum', provisional: false },
      { label: 'Wall box', value: `Standard gang box, ${SPEC.boxDepth} min. depth`, provisional: true },
    ],
    related: { slug: 'smart-ecosystem', title: 'Open Connectivity' },
    icon: 'grid',
  },
  {
    slug: 'smart-ecosystem',
    title: 'Open Connectivity',
    headline: ['Smart,', 'never dependent.'],
    eyebrow: 'System architecture',
    summary: 'A local-first switch with open connectivity readiness.',
    overview:
      'A smart product should not turn a light switch into a single point of failure. Smart Switch is designed so core switching works locally, with open connectivity layered on top.',
    details: [
      { heading: 'Local first', description: 'Pressing the paddle is designed to switch the circuit directly, without waiting for the cloud or your router.' },
      { heading: 'Built for open standards', description: 'The architecture targets Matter readiness over Wi-Fi with Bluetooth LE pairing. Exact protocols are confirmed per regional hardware revision.' },
      { heading: 'No forced lock-in', description: 'The design goal is that everyday switching and basic control never depend on a proprietary cloud.' },
    ],
    facts: [
      { label: 'Radios', value: SPEC.connectivity, provisional: true },
      { label: 'Standards', value: 'Matter readiness', provisional: true },
      { label: 'Platform badges', value: 'None claimed yet', provisional: true },
    ],
    related: { slug: 'electrical-safety', title: 'Electrical Safety' },
    icon: 'orbit',
  },
];

export const getFeature = (slug: string) => FEATURES.find((f) => f.slug === slug);
