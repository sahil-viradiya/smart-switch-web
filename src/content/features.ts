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
  icon: 'touch' | 'app' | 'connect' | 'grid';
  /** Product shown beside the heading. */
  art: { series: 'color' | 'edge'; id: string };
}

export const FEATURES: readonly Feature[] = [
  {
    slug: 'touch-control',
    title: 'Touch control',
    headline: ['Control the light', 'with a touch.'],
    eyebrow: 'Touch',
    summary: 'A glass or acrylic panel with a light-touch control for every function.',
    overview:
      'Smart Switch panels have no buttons to press. You touch the icon or touch point for each function, and the panel lights it up so you can see what is on.',
    details: [
      { heading: 'One touch per function', description: 'Each switch, fan control, dimmer or curtain control has its own icon or touch point on the panel.' },
      { heading: 'Glass or acrylic', description: 'Both materials have a slim border. A few panels, such as single sockets and the USB charger, are only offered in acrylic.' },
      { heading: 'Two looks', description: 'Color has backlit icons with colours you can change. Edge has round touch points and a precise finish.' },
    ],
    facts: [
      { label: 'Control', value: 'Touch', provisional: false },
      { label: 'Panel', value: 'Glass or acrylic', provisional: false },
      { label: 'Series', value: 'Color and Edge', provisional: false },
    ],
    related: { slug: 'app-and-voice', title: 'App, voice and remote' },
    icon: 'touch',
    art: { series: 'color', id: '2m-4-switch-scene-control' },
  },
  {
    slug: 'app-and-voice',
    title: 'App, voice and remote',
    headline: ['Control it from', 'anywhere.'],
    eyebrow: 'Control',
    summary: 'Use the app, a voice assistant or a handheld remote as well as the panel.',
    overview:
      'You can switch things from the wall, but you do not have to. The panels also work from a phone or tablet, with voice assistants and with a remote.',
    details: [
      { heading: 'App', description: 'Control your lights and appliances from an Android or iOS phone or tablet, including when you are away from home.' },
      { heading: 'Voice', description: 'Works with voice assistants such as Alexa and Google Home, so you can switch things on and off by speaking.' },
      { heading: 'Remote and IR', description: 'A handheld remote (R1-R2) is available. An IR blaster lets a Wi-Fi panel send infrared commands to devices such as air conditioners.' },
    ],
    facts: [
      { label: 'App', value: 'Android and iOS', provisional: false },
      { label: 'Voice', value: 'Alexa and Google Home', provisional: false },
      { label: 'Remote', value: 'Remote R1-R2 (accessory)', provisional: false },
      { label: 'IR blaster', value: 'Wi-Fi panels only', provisional: false },
    ],
    related: { slug: 'wifi-and-zigbee', title: 'Wi-Fi and Zigbee' },
    icon: 'app',
    art: { series: 'color', id: '6m-6-switch-1-fan' },
  },
  {
    slug: 'wifi-and-zigbee',
    title: 'Wi-Fi and Zigbee',
    headline: ['Two versions,', 'one panel.'],
    eyebrow: 'Connectivity',
    summary: 'Choose a Wi-Fi panel or a Zigbee panel. Every configuration comes in both.',
    overview:
      'Each configuration is offered as a Wi-Fi version and a Zigbee version. They look the same on the wall and differ in how they connect.',
    details: [
      { heading: 'Wi-Fi version', description: 'Connects to your home Wi-Fi. It works with the IR blaster.' },
      { heading: 'Zigbee version', description: 'Connects through a Zigbee gateway, which you buy separately. The gateway comes as an Ethernet or a USB model.' },
      { heading: 'Price', description: 'The Zigbee version usually costs more per panel than the Wi-Fi version.' },
    ],
    facts: [
      { label: 'Versions', value: 'Wi-Fi or Zigbee', provisional: false },
      { label: 'Gateway', value: 'Zigbee only (Ethernet or USB)', provisional: false },
      { label: 'IR blaster', value: 'Wi-Fi only', provisional: false },
    ],
    related: { slug: 'sizes-and-functions', title: 'Sizes and functions' },
    icon: 'connect',
    art: { series: 'edge', id: '4m-4-switch' },
  },
  {
    slug: 'sizes-and-functions',
    title: 'Sizes and functions',
    headline: ['Six sizes,', 'many functions.'],
    eyebrow: 'Range',
    summary: 'Panels from 2M to 12M with switches, sockets, fan control and more.',
    overview:
      `There are six panel sizes, ${SPEC.moduleSizes}. Larger panels hold more controls, and you can combine switches with sockets and a fan control on the same panel.`,
    details: [
      { heading: 'What the range covers', description: 'Switches, sockets, fan control, curtain control, dimmers, a 4-button scene control, a USB charger and a doorbell. Curtain control, the scene control and the USB charger are 2M panels. Dimmers come in 2M and 6M, and the doorbell in 2M and 3M.' },
      { heading: 'Ratings', description: `Switches and sockets come in ${SPEC.ratings} versions. Choose the rating to suit the load on each circuit.` },
      { heading: 'Matching panels', description: 'Every size uses the same styling, so a bedroom, a hallway and a living room can all match.' },
    ],
    facts: [
      { label: 'Sizes', value: SPEC.moduleSizes, provisional: false },
      { label: 'Ratings', value: SPEC.ratings, provisional: false },
      { label: 'Installation', value: 'Licensed electrician required', provisional: false },
    ],
    related: { slug: 'touch-control', title: 'Touch control' },
    icon: 'grid',
    art: { series: 'edge', id: '12m-12-switch' },
  },
];

export const getFeature = (slug: string) => FEATURES.find((f) => f.slug === slug);
