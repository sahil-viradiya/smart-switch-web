import { ROUTES, SPEC, demoIntentHref } from '@/config';
import type { MediaItem } from '@/types';
import { FINISHES, VARIANTS } from './product';

export const MARQUEE_WORDS = ['Lighting', 'Comfort', 'Safety', 'Control', 'Tactile', 'Quiet'] as const;

/** "By the numbers" — facts derived from the product data, never invented statistics. */
export const STATS = [
  { value: VARIANTS.length, label: 'Configurations', text: '1, 2 and 3-gang plates plus a dimmer variant.' },
  { value: FINISHES.length, label: 'Architectural finishes', text: 'Charcoal, White and Brushed Aluminum.' },
  { value: Math.max(...VARIANTS.map((v) => v.gangs)), label: 'Circuits on one plate', text: 'Up to three independent paddles, flush and aligned.' },
  { value: SPEC.warrantyMonths, label: 'Month planned warranty', text: 'Provisional — final terms confirmed at launch.', provisional: true },
] as const;

export const GAUGE = { value: 10, max: 10, unit: ' A', label: 'Resistive load per gang', note: 'Provisional rating, pending engineering lab confirmation.' } as const;

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  text: string;
  link: { label: string; href: string };
}

/** Clickable points on the room scene. Coordinates are % of the image. */
export const HOTSPOTS: readonly Hotspot[] = [
  { id: 'paddles', x: 81, y: 49, title: 'Tactile paddles', text: 'A real mechanical paddle, designed to feel the same at the centre or the edge — easy to find in the dark.', link: { label: 'Tactile precision', href: ROUTES.FEATURES_SLUG('tactile-precision') } },
  { id: 'dimmer', x: 50, y: 14, title: 'Dimmable lighting', text: 'The dimmer variant pairs a paddle with a dimming control for dimmable loads. Load compatibility is confirmed per SKU.', link: { label: 'See the dimmer', href: `${ROUTES.PRODUCT}#configure` } },
  { id: 'led', x: 18, y: 46, title: 'Soft status LED', text: 'A micro-illumination indicator confirms state without the glare of a screen — gentle enough for a bedroom.', link: { label: 'Why not a touchscreen', href: ROUTES.FEATURES_SLUG('tactile-precision') } },
  { id: 'local', x: 36, y: 76, title: 'Local-first control', text: 'The paddle is designed to switch the circuit directly, so everyday lighting never depends on Wi-Fi or the cloud.', link: { label: 'Open connectivity', href: ROUTES.FEATURES_SLUG('smart-ecosystem') } },
  { id: 'box', x: 88, y: 64, title: 'Standard wall box', text: `Designed for standard gang boxes, ${SPEC.boxDepth} minimum depth (provisional), so retrofits stay simple.`, link: { label: 'How installation works', href: ROUTES.HOW_IT_WORKS } },
];

export const GALLERY: readonly MediaItem[] = [
  { kind: 'scene', scene: 'living', caption: 'Living room — 3-gang console', alt: 'Living room with a Smart Switch on the wall' },
  { kind: 'switch', variant: '2_GANG', finish: 'MATTE_CHARCOAL', caption: '2-Gang · Matte Charcoal', alt: 'Two-gang Smart Switch in Matte Charcoal' },
  { kind: 'scene', scene: 'bedroom', caption: 'Bedroom — soft status LED', alt: 'Bedroom with a Smart Switch beside the bed' },
  { kind: 'switch', variant: '3_GANG', finish: 'ARCHITECTURAL_WHITE', caption: '3-Gang · Architectural White', alt: 'Three-gang Smart Switch in Architectural White' },
  { kind: 'scene', scene: 'studio', caption: 'Studio — consistent control', alt: 'Studio with a Smart Switch by the shelving' },
  { kind: 'switch', variant: 'DIMMER', finish: 'MATTE_CHARCOAL', caption: 'Dimmer · Matte Charcoal', alt: 'Dimmer Smart Switch in Matte Charcoal' },
  { kind: 'scene', scene: 'hall', caption: 'Hallway — flush and aligned', alt: 'Hallway with a Smart Switch' },
  { kind: 'switch', variant: '1_GANG', finish: 'BRUSHED_ALUMINUM', caption: '1-Gang · Brushed Aluminum', alt: 'One-gang Smart Switch in Brushed Aluminum' },
  { kind: 'switch', variant: '2_GANG', finish: 'BRUSHED_ALUMINUM', caption: '2-Gang · Brushed Aluminum', alt: 'Two-gang Smart Switch in Brushed Aluminum' },
  { kind: 'switch', variant: '3_GANG', finish: 'MATTE_CHARCOAL', caption: '3-Gang · Matte Charcoal', alt: 'Three-gang Smart Switch in Matte Charcoal' },
];

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
    text: 'A calm wall, a switch that feels right and works even when the network does not.',
    points: ['Choose gangs and finish to suit each room', 'Soft status LED that will not glare at night', 'Installed by your licensed electrician'],
    cta: { label: 'Plan my home', href: demoIntentHref('homeowner') },
  },
  {
    id: 'architect', title: 'Architects & designers', eyebrow: 'For your specification',
    text: 'One plate language across rooms, three finishes and honest, clearly labelled specifications.',
    points: ['Request a spec kit and finish samples', 'Provisional ratings marked, never overstated', 'Flush multi-gang layouts for renovations and new builds'],
    cta: { label: 'Request a spec kit', href: demoIntentHref('architect') },
  },
  {
    id: 'installer', title: 'Electricians', eyebrow: 'For your install',
    text: 'Clear prerequisites up front so the job on site matches the plan on paper.',
    points: ['Neutral wire and box-depth checklist', 'Standard gang boxes', 'Questions answered before you quote'],
    cta: { label: 'Talk to our team', href: demoIntentHref('installer') },
  },
];

export interface Standard { name: string; role: string; status: string }

/** Connectivity roadmap. Statuses are deliberately conservative; no platform badges are claimed. */
export const STANDARDS: readonly Standard[] = [
  { name: 'Wi-Fi 2.4 GHz', role: 'Network link for remote and scheduled control', status: 'Provisional' },
  { name: 'Bluetooth LE', role: 'Pairing and first-time commissioning', status: 'Provisional' },
  { name: 'Matter', role: 'Cross-platform control — readiness over Wi-Fi', status: 'Readiness only' },
  { name: 'Thread', role: 'Matter-over-Thread support', status: 'Under evaluation' },
  { name: 'Apple Home · Google Home · Alexa', role: 'Intended via Matter. No platform badge is claimed yet', status: 'Not yet claimed' },
  { name: 'Local fail-safe', role: 'Paddle switching without any network', status: 'Design intent' },
];
