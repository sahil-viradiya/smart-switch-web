/**
 * ART PALETTE -  colours used inside the SVG placeholder art (switch plates and
 * interior scenes). Product finishes live here too so the swatches, the plate
 * render and the labels always agree. Replace the art with real images via
 * `config/images.ts`; these only apply to the placeholders.
 */
import { colors } from './colors';

export const FINISH_COLORS = {
  MATTE_CHARCOAL: { swatch: '#1c1e1d', plate: ['#2a2c2b', '#121413'], paddle: ['#1f2120', '#0e100f'], light: false },
  ARCHITECTURAL_WHITE: { swatch: '#ebe8e0', plate: ['#f6f3ec', '#d9d5cb'], paddle: ['#f1eee7', '#dcd8ce'], light: true },
  BRUSHED_ALUMINUM: { swatch: '#8d918f', plate: ['#b3b6b4', '#7e8280'], paddle: ['#a9acaa', '#868a88'], light: true },
} as const;

/** Interior scene palette. `warm` varies per scene. */
export const SCENE_COLORS = {
  wallTop: '#1d1812',
  wallBottom: '#0c0b09',
  skyTop: '#1b2a4a',
  skyBottom: '#5c4a5e',
  floorTop: '#1a140d',
  floorBottom: '#070605',
  tvA: '#38284a',
  tvB: '#d1844a',
  tvC: '#2a1c2e',
  tvFrame: '#070605',
  building: '#0e1020',
  windowLight: '#ffd89a',
  mullion: '#0a0907',
  curtain: '#3a2d1f',
  panel: '#241b13',
  panelInset: '#2f2418',
  slat: '#0f0c09',
  sofa: '#3b2a1f',
  sofaBack: '#4a3426',
  cushion: '#6b3f2a',
  plant: '#1d3a2a',
  table: '#120f0b',
  bed: '#2e2219',
  linen: '#d9cdb8',
  pillowA: '#efe6d6',
  pillowB: '#e6dac7',
  wood: '#2a2018',
  woodDark: '#14100c',
  studioWall: '#1a130d',
  paperSheet: '#e8e1d2',
  lampBrass: '#d9b36a',
  switchPlate: '#15130f',
  switchPaddle: '#0b0a09',
  warm: { living: '#f3b868', bedroom: '#e9a35a', studio: '#f1cf92', hall: '#f3b868' },
} as const;

/** Colour helpers for SVG strings (SVG attributes cannot read CSS variables in every context). */
export const svgColors = {
  gold: colors.gold,
  goldLight: colors.goldLight,
  white: colors.white,
  black: colors.black,
} as const;

export function rgba(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}
