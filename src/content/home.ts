import { ROUTES, SPEC, demoIntentHref } from '@/config';
import type { MediaItem } from '@/types';
import { FINISHES, VARIANTS } from './product';

export const MARQUEE_WORDS = ['Tactile', 'Dimmable', 'Flush', 'Modular', 'Local', 'Open'] as const;

/** Facts taken from the product data, never invented statistics. */
export const STATS = [
  { value: VARIANTS.length, label: 'Configurations', text: '1, 2 and 3-gang plates, plus a dimmer.' },
  { value: FINISHES.length, label: 'Finishes', text: 'Charcoal, White and Brushed Aluminum.' },
  { value: Math.max(...VARIANTS.map((v) => v.gangs)), label: 'Circuits on one plate', text: 'Up to three separate paddles on a single faceplate.' },
  { value: SPEC.warrantyMonths, label: 'Months of warranty', text: 'Planned. Final terms are confirmed at launch.', provisional: true },
] as const;

export const GAUGE = { value: 10, max: 10, unit: ' A', label: 'Resistive load per gang', note: 'Provisional rating, waiting for lab confirmation.' } as const;

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
  { id: 'paddles', x: 81, y: 49, title: 'Tactile paddles', text: 'A real mechanical paddle. It is meant to feel the same whether you press the middle or the edge, and it is easy to find in the dark.', link: { label: 'About the feel', href: ROUTES.FEATURES_SLUG('tactile-precision') } },
  { id: 'dimmer', x: 50, y: 14, title: 'Dimmable lighting', text: 'The dimmer version has a paddle and a dimming control for dimmable loads. Which loads work is confirmed for each version.', link: { label: 'See the dimmer', href: `${ROUTES.PRODUCT}#configure` } },
  { id: 'led', x: 18, y: 46, title: 'Status light', text: 'A small LED shows the state of the switch. It is dim enough that it will not light up a bedroom.', link: { label: 'About the feel', href: ROUTES.FEATURES_SLUG('tactile-precision') } },
  { id: 'local', x: 36, y: 76, title: 'Local-first control', text: 'The paddle is designed to switch the circuit directly, so everyday lighting does not depend on Wi-Fi or the cloud.', link: { label: 'About connectivity', href: ROUTES.FEATURES_SLUG('smart-ecosystem') } },
  { id: 'box', x: 88, y: 64, title: 'Standard wall box', text: `It is made for standard gang boxes at least ${SPEC.boxDepth} deep (provisional), so fitting it to an existing wall is straightforward.`, link: { label: 'How installation works', href: ROUTES.HOW_IT_WORKS } },
];

export const GALLERY: readonly MediaItem[] = [
  { kind: 'scene', scene: 'living', caption: 'Living room, 3-gang plate', alt: 'Living room with a Smart Switch on the wall' },
  { kind: 'switch', variant: '2_GANG', finish: 'MATTE_CHARCOAL', caption: '2-gang in Matte Charcoal', alt: 'Two-gang Smart Switch in Matte Charcoal' },
  { kind: 'scene', scene: 'bedroom', caption: 'Bedroom with the status light', alt: 'Bedroom with a Smart Switch beside the bed' },
  { kind: 'switch', variant: '3_GANG', finish: 'ARCHITECTURAL_WHITE', caption: '3-gang in Architectural White', alt: 'Three-gang Smart Switch in Architectural White' },
  { kind: 'scene', scene: 'studio', caption: 'Studio', alt: 'Studio with a Smart Switch by the shelving' },
  { kind: 'switch', variant: 'DIMMER', finish: 'MATTE_CHARCOAL', caption: 'Dimmer in Matte Charcoal', alt: 'Dimmer Smart Switch in Matte Charcoal' },
  { kind: 'scene', scene: 'hall', caption: 'Hallway', alt: 'Hallway with a Smart Switch' },
  { kind: 'switch', variant: '1_GANG', finish: 'BRUSHED_ALUMINUM', caption: '1-gang in Brushed Aluminum', alt: 'One-gang Smart Switch in Brushed Aluminum' },
  { kind: 'switch', variant: '2_GANG', finish: 'BRUSHED_ALUMINUM', caption: '2-gang in Brushed Aluminum', alt: 'Two-gang Smart Switch in Brushed Aluminum' },
  { kind: 'switch', variant: '3_GANG', finish: 'MATTE_CHARCOAL', caption: '3-gang in Matte Charcoal', alt: 'Three-gang Smart Switch in Matte Charcoal' },
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
    text: 'Matching switches in every room, with a real paddle that works the way you expect.',
    points: ['Pick the plate size and finish for each room', 'A status light that will not glare at night', 'Fitted by your own licensed electrician'],
    cta: { label: 'Plan my home', href: demoIntentHref('homeowner') },
  },
  {
    id: 'architect', title: 'Architects and designers', eyebrow: 'For your specification',
    text: 'One plate across a whole project, three finishes, and specifications that say what is confirmed and what is not.',
    points: ['Ask for a spec kit and finish samples', 'Provisional ratings are marked as provisional', 'Flush multi-gang plates for new builds and renovations'],
    cta: { label: 'Request a spec kit', href: demoIntentHref('architect') },
  },
  {
    id: 'installer', title: 'Electricians', eyebrow: 'For the install',
    text: 'The requirements are listed up front, so what you find on site matches what was planned.',
    points: ['Neutral wire and box depth checklist', 'Standard gang boxes', 'Ask questions before you quote'],
    cta: { label: 'Talk to our team', href: demoIntentHref('installer') },
  },
];

export interface Standard { name: string; role: string; status: string }

/** Connectivity plans. Statuses are deliberately cautious and no platform badge is claimed. */
export const STANDARDS: readonly Standard[] = [
  { name: 'Wi-Fi 2.4 GHz', role: 'Network link for remote control and schedules', status: 'Provisional' },
  { name: 'Bluetooth LE', role: 'Pairing and first-time set-up', status: 'Provisional' },
  { name: 'Matter', role: 'Control from different platforms, over Wi-Fi', status: 'Planned' },
  { name: 'Thread', role: 'Matter over Thread', status: 'Under evaluation' },
  { name: 'Apple Home, Google Home, Alexa', role: 'Intended to work through Matter. No platform badge yet', status: 'Not claimed' },
  { name: 'Local switching', role: 'The paddle works without a network', status: 'Design goal' },
];
