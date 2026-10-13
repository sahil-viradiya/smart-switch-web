import { ROUTES, SPEC, demoIntentHref } from '@/config';
import { MODULES, SERIES, productsInSeries } from '@/content/catalog';
import type { MediaItem } from '@/types';

export const MARQUEE_WORDS = ['Touch', 'Glass', 'Acrylic', 'Wi-Fi', 'Zigbee', 'Custom'] as const;

/** Facts taken from the product catalogue, never invented statistics. */
export const STATS = [
  { value: SERIES.length, label: 'Series', text: 'Color and Edge, with the same sizes and functions.' },
  { value: MODULES.length, label: 'Panel sizes', text: 'From the compact 2M to the 12M panel.' },
  { value: Math.max(...SERIES.map((s) => productsInSeries(s.id).length)), label: 'Configurations', text: 'In each series. All come in Wi-Fi or Zigbee, and most in glass or acrylic.' },
  { value: SPEC.warrantyYears, label: 'Years of warranty', text: 'On the panels.' },
] as const;

export const GAUGE = { value: 16, max: 16, unit: ' A', label: 'Highest switch and socket rating', note: `Switches and sockets come in ${SPEC.ratings} versions.` } as const;

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  text: string;
  link: { label: string; href: string };
}

/** Clickable points on the living room photo. Coordinates are % of the image. */
export const HOTSPOTS: readonly Hotspot[] = [
  { id: 'icons', x: 54, y: 32, title: 'Backlit touch icons', text: 'Each function has its own icon. Touch it to switch the light or appliance. On the Color series you can change the icon colours.', link: { label: 'About touch control', href: ROUTES.FEATURES_SLUG('touch-control') } },
  { id: 'fan', x: 65.5, y: 33.5, title: 'Fan control', text: 'Many panels include a fan control next to the switches, so the fan and the lights share one panel.', link: { label: 'Sizes and functions', href: ROUTES.FEATURES_SLUG('sizes-and-functions') } },
  { id: 'panel', x: 85, y: 39.5, title: 'Glass or acrylic panel', text: 'The panel is glass or acrylic with a slim border. Some panels, such as sockets, are only offered in acrylic.', link: { label: 'Browse the range', href: ROUTES.CATALOGUE } },
  { id: 'app', x: 48, y: 66, title: 'App control', text: 'Control the panel from an Android or iOS phone or tablet, including when you are away from home.', link: { label: 'App, voice and remote', href: ROUTES.FEATURES_SLUG('app-and-voice') } },
  { id: 'voice', x: 80, y: 62, title: 'Voice control', text: 'Works with voice assistants such as Alexa and Google Home, so you can switch things by speaking.', link: { label: 'App, voice and remote', href: ROUTES.FEATURES_SLUG('app-and-voice') } },
];

export const GALLERY: readonly MediaItem[] = [
  { kind: 'scene', scene: 'living', caption: 'Living room, 8M Color panel', alt: 'Living room with a Color series panel on the wall' },
  { kind: 'product', series: 'color', productId: '2m-4-switch-scene-control', caption: 'Color, 2M scene control', alt: 'Color series 2M panel with four scene buttons' },
  { kind: 'scene', scene: 'bedroom', caption: 'Bedroom, 4M Edge panel', alt: 'Bedroom with an Edge series panel on the wall' },
  { kind: 'product', series: 'edge', productId: '4m-4-switch', caption: 'Edge, 4M with 4 switches', alt: 'Edge series 4M panel with four touch points' },
  { kind: 'scene', scene: 'studio', caption: 'Studio, 6M Edge panel', alt: 'Studio with an Edge series panel on the wall' },
  { kind: 'product', series: 'color', productId: '6m-6-switch-1-fan', caption: 'Color, 6M with a fan control', alt: 'Color series 6M panel with six switches and a fan control' },
  { kind: 'scene', scene: 'hall', caption: 'Hallway, 2M Edge panel', alt: 'Hallway with an Edge series panel on the wall' },
  { kind: 'product', series: 'edge', productId: '12m-12-switch', caption: 'Edge, 12M with 12 switches', alt: 'Edge series 12M panel with twelve touch points' },
  { kind: 'product', series: 'color', productId: '2m-single-curtain-switch', caption: 'Color, 2M curtain control', alt: 'Color series 2M panel with curtain controls' },
  { kind: 'product', series: 'edge', productId: '2m-double-usb-charger-a-type-c-type', caption: 'Edge, 2M USB charger', alt: 'Edge series 2M double USB charger panel' },
];

/** Copy around the product film (the file itself is registered in `config/images.ts`). */
export const FILM_COPY = {
  eyebrow: 'Watch',
  title: ['The range', 'in motion.'] as [string, string],
  lead: 'A short film of Color and Edge panels, on the wall in four rooms and close up. It plays while you watch and pauses when you scroll away. The sound is off until you turn it on.',
  note: 'Panels shown: Color 8M, Edge 4M, Color 4M with a socket, Edge 6M, Color 2M scene control, Edge 2M and Edge 12M. The music was made for this site.',
} as const;

export interface Persona {
  id: string;
  title: string;
  eyebrow: string;
  text: string;
  points: string[];
  cta: { label: string; href: string };
}

export const PERSONAS: readonly Persona[] = [
  {
    id: 'homeowner', title: 'Homeowners', eyebrow: 'For your home',
    text: 'Matching touch panels in every room, controlled from the wall, your phone or your voice.',
    points: ['Choose a size for each room', 'Pick Wi-Fi or Zigbee', 'Fitted by your own licensed electrician'],
    cta: { label: 'Plan my home', href: demoIntentHref('homeowner') },
  },
  {
    id: 'architect', title: 'Architects and designers', eyebrow: 'For your specification',
    text: 'Two series, six sizes and a full list of configurations, so you can specify exactly what each wall needs.',
    points: ['Browse all configurations', 'Ask for specs and samples', 'Custom icons on request'],
    cta: { label: 'Ask for specs and samples', href: demoIntentHref('architect') },
  },
  {
    id: 'installer', title: 'Electricians', eyebrow: 'For the install',
    text: 'The configurations, ratings and versions are listed in full, so you can plan the job before you quote.',
    points: [`${SPEC.ratings} versions`, 'Wi-Fi and Zigbee versions', 'Ask questions before you quote'],
    cta: { label: 'Talk to our team', href: demoIntentHref('installer') },
  },
];

export interface ControlOption { name: string; role: string; status: string }

/** The ways a panel can be controlled and connected, with any condition that applies. */
export const CONTROL_OPTIONS: readonly ControlOption[] = [
  { name: 'Touch', role: 'Touch the icon or touch point on the panel', status: 'All panels' },
  { name: 'App', role: 'Android and iOS phones and tablets', status: 'All panels' },
  { name: 'Voice', role: 'Alexa and Google Home', status: 'All panels' },
  { name: 'Wi-Fi version', role: 'Connects to your home Wi-Fi', status: 'Every configuration' },
  { name: 'Zigbee version', role: 'Connects through a Zigbee gateway', status: 'Gateway needed' },
  { name: 'IR blaster and remote', role: 'Infrared control and a handheld remote', status: 'IR blaster: Wi-Fi only' },
];

