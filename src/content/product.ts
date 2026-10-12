import type { FinishColor, GangVariant } from '@/types';
import { SPEC } from '@/config/specs';
import { FINISH_COLORS } from '@/theme';

export interface Variant {
  id: GangVariant;
  name: string;
  tagline: string;
  description: string;
  gangs: 1 | 2 | 3;
  dimmer?: boolean;
  chip: string;
}

export const VARIANTS: readonly Variant[] = [
  {
    id: '1_GANG',
    name: '1-Gang',
    tagline: 'One circuit, one clean plate.',
    description: 'A single tactile paddle for a single lighting circuit — the quietest way to finish a wall.',
    gangs: 1,
    chip: '1 circuit',
  },
  {
    id: '2_GANG',
    name: '2-Gang',
    tagline: 'Two circuits, flush and aligned.',
    description: 'Two independent paddles sharing one faceplate for downlights and accent lighting.',
    gangs: 2,
    chip: '2 circuits',
  },
  {
    id: '3_GANG',
    name: '3-Gang',
    tagline: 'A full room on one plate.',
    description: 'Three paddles in one flush console — consolidate a hallway or living room into a single plate.',
    gangs: 3,
    chip: '3 circuits',
  },
  {
    id: 'DIMMER',
    name: 'Dimmer',
    tagline: 'Set the light to the moment.',
    description: 'A paddle paired with a dimming control for dimmable loads. Load compatibility is confirmed per regional SKU.',
    gangs: 1,
    dimmer: true,
    chip: 'Dimmable loads',
  },
];

export interface Finish {
  id: FinishColor;
  name: string;
  /** Swatch colour. Colours live in `theme/art.ts` (FINISH_COLORS). */
  hex: string;
  plate: readonly [string, string];
  paddle: readonly [string, string];
  light: boolean;
}

const finish = (id: FinishColor, name: string): Finish => {
  const c = FINISH_COLORS[id];
  return { id, name, hex: c.swatch, plate: c.plate, paddle: c.paddle, light: c.light };
};

export const FINISHES: readonly Finish[] = [
  finish('MATTE_CHARCOAL', 'Matte Charcoal'),
  finish('ARCHITECTURAL_WHITE', 'Architectural White'),
  finish('BRUSHED_ALUMINUM', 'Brushed Aluminum'),
];

export const KEY_FEATURES = [
  { title: 'Tactile paddles', text: 'Mechanical paddles with a deliberate, satisfying action — designed to be felt, not just seen.', icon: 'paddle' },
  { title: 'Status LED', text: 'A discreet micro-illumination indicator that stays soft in a dark bedroom.', icon: 'led' },
  { title: 'Modular gangs', text: '1, 2 and 3-gang plates plus a dimmer variant that share one visual language.', icon: 'grid' },
  { title: 'Local fail-safe', text: 'Designed so the wall switch keeps working when Wi-Fi or the internet does not.', icon: 'shield' },
  { title: 'Protection by design', text: 'Over-current and surge protection are design goals, pending lab confirmation.', icon: 'bolt' },
] as const;

export interface SpecRow {
  label: string;
  value: string;
  provisional: boolean;
}

export const SPEC_ROWS: readonly SpecRow[] = [
  { label: 'Control', value: 'Mechanical tactile paddles', provisional: false },
  { label: 'Indicator', value: 'Micro-illumination status LED', provisional: false },
  { label: 'Configurations', value: '1-gang, 2-gang, 3-gang, dimmer variant', provisional: false },
  { label: 'Supply voltage', value: SPEC.voltage, provisional: true },
  { label: 'Load per gang', value: SPEC.loadPerGang, provisional: true },
  { label: 'Neutral wire', value: SPEC.neutral, provisional: true },
  { label: 'Wall box', value: `Standard gang boxes, ${SPEC.boxDepth} minimum depth`, provisional: true },
  { label: 'Operating range', value: SPEC.operatingRange, provisional: true },
  { label: 'Connectivity', value: SPEC.connectivity, provisional: true },
  { label: 'Certifications', value: 'In testing — no certification claimed yet', provisional: true },
  { label: 'Warranty', value: `${SPEC.warranty} (terms confirmed at launch)`, provisional: true },
];

export const ELECTRICAL_CHECKLIST = [
  'A neutral wire is present in the switch back-box.',
  `The wall box is a standard gang box, at least ${SPEC.boxDepth} deep.`,
  `Your supply is ${SPEC.voltage}.`,
  'A licensed electrician will perform the installation.',
] as const;

export interface CompareRow { label: string; values: readonly string[]; provisional?: boolean }

/** Columns follow VARIANTS order. */
export const COMPARE_ROWS: readonly CompareRow[] = [
  { label: 'Independent circuits', values: ['1', '2', '3', '1 (dimmed)'] },
  { label: 'Control', values: ['Paddle', 'Paddles', 'Paddles', 'Paddle + dimming control'] },
  { label: 'Status LED', values: ['Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Finishes', values: ['3', '3', '3', '3'] },
  { label: 'Neutral wire', values: ['Required', 'Required', 'Required', 'Required'], provisional: true },
  { label: 'Load', values: [`${SPEC.loadPerGang}`, `${SPEC.loadPerGang} per gang`, `${SPEC.loadPerGang} per gang`, 'Dimmable loads — per SKU'], provisional: true },
  { label: 'Best for', values: ['Single-circuit rooms', 'Rooms with accent lighting', 'Hallways and living rooms', 'Lounges and bedrooms'] },
];

/** Planned package contents — provisional until the retail package is finalised. */
export const INCLUDED = [
  { title: 'Switch module', text: 'Paddles and electronics for your chosen configuration.', icon: 'paddle' },
  { title: 'Faceplate', text: 'In your selected finish.', icon: 'grid' },
  { title: 'Mounting frame & fixings', text: 'For a standard gang box.', icon: 'shield' },
  { title: 'Installation guide', text: 'A brief for your licensed electrician.', icon: 'bolt' },
  { title: 'Quick-start card', text: 'Pairing and first-use steps.', icon: 'led' },
] as const;
