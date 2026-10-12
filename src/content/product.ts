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
    tagline: 'One circuit, one plate.',
    description: 'A single paddle for a single lighting circuit.',
    gangs: 1,
    chip: '1 circuit',
  },
  {
    id: '2_GANG',
    name: '2-Gang',
    tagline: 'Two circuits on one plate.',
    description: 'Two separate paddles sharing one faceplate, for example downlights and a wall light.',
    gangs: 2,
    chip: '2 circuits',
  },
  {
    id: '3_GANG',
    name: '3-Gang',
    tagline: 'Three circuits on one plate.',
    description: 'Three paddles in one faceplate. Good for a hallway or living room that now has three separate switches.',
    gangs: 3,
    chip: '3 circuits',
  },
  {
    id: 'DIMMER',
    name: 'Dimmer',
    tagline: 'Dim the light.',
    description: 'A paddle with a dimming control, for dimmable loads. Which loads work is confirmed for each regional version.',
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
  { title: 'Tactile paddles', text: 'Mechanical paddles that you press like any normal switch.', icon: 'paddle' },
  { title: 'Status LED', text: 'A small light shows the switch state without lighting up the room.', icon: 'led' },
  { title: 'Modular plates', text: '1, 2 and 3-gang plates and a dimmer, all with the same faceplate.', icon: 'grid' },
  { title: 'Local fail-safe', text: 'Switching is designed to keep working when Wi-Fi or the internet does not.', icon: 'shield' },
  { title: 'Built-in protection', text: 'Over-current and surge protection are design goals. Lab testing has not confirmed them yet.', icon: 'bolt' },
] as const;

export interface SpecRow {
  label: string;
  value: string;
  provisional: boolean;
}

export const SPEC_ROWS: readonly SpecRow[] = [
  { label: 'Control', value: 'Mechanical paddles', provisional: false },
  { label: 'Indicator', value: 'Status LED', provisional: false },
  { label: 'Configurations', value: '1, 2 and 3-gang, and a dimmer', provisional: false },
  { label: 'Supply voltage', value: SPEC.voltage, provisional: true },
  { label: 'Load per gang', value: SPEC.loadPerGang, provisional: true },
  { label: 'Neutral wire', value: SPEC.neutral, provisional: true },
  { label: 'Wall box', value: `Standard gang boxes, ${SPEC.boxDepth} minimum depth`, provisional: true },
  { label: 'Operating range', value: SPEC.operatingRange, provisional: true },
  { label: 'Connectivity', value: SPEC.connectivity, provisional: true },
  { label: 'Certifications', value: 'In testing. None claimed yet', provisional: true },
  { label: 'Warranty', value: `${SPEC.warranty}, terms confirmed at launch`, provisional: true },
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
  { label: 'Control', values: ['Paddle', 'Paddles', 'Paddles', 'Paddle and dimming control'] },
  { label: 'Status LED', values: ['Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Finishes', values: ['3', '3', '3', '3'] },
  { label: 'Neutral wire', values: ['Required', 'Required', 'Required', 'Required'], provisional: true },
  { label: 'Load', values: [`${SPEC.loadPerGang}`, `${SPEC.loadPerGang} per gang`, `${SPEC.loadPerGang} per gang`, 'Dimmable loads, confirmed per version'], provisional: true },
  { label: 'Good for', values: ['Rooms with one light circuit', 'Rooms with a second light', 'Hallways and living rooms', 'Lounges and bedrooms'] },
];

/** Planned package contents -  provisional until the retail package is finalised. */
export const INCLUDED = [
  { title: 'Switch module', text: 'The paddles and electronics for your configuration.', icon: 'paddle' },
  { title: 'Faceplate', text: 'In the finish you chose.', icon: 'grid' },
  { title: 'Mounting frame and fixings', text: 'For a standard gang box.', icon: 'shield' },
  { title: 'Installation guide', text: 'Instructions for your electrician.', icon: 'bolt' },
  { title: 'Quick-start card', text: 'Pairing and first-use steps.', icon: 'led' },
] as const;
