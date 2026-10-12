/**
 * COLOURS — the single source of truth for every colour on the site.
 *
 * Change a value here and it updates the CSS, the SVG art, the favicon, the
 * web-manifest and the browser theme-colour. Nothing else in `src/` may contain
 * a colour literal (enforced by `npm run check:theme`).
 *
 * Each key becomes a CSS variable: `blackSoft` -> `--black-soft` (hex) and
 * `--black-soft-rgb` ("9 11 10", for `rgb(var(--black-soft-rgb) / .4)`).
 */
export const colors = {
  /* Brand */
  black: '#090b0a', // dark foundation
  blackSoft: '#111310', // alternate dark section
  cardDark: '#161816', // cards on dark
  gold: '#c99c49', // accent
  goldLight: '#d8ad5c', // accent hover / LED glow
  goldDeep: '#7a5a1c', // accent text on light backgrounds (AA contrast)
  paper: '#f5f2eb', // warm light section
  ivory: '#f4f1e9',
  white: '#ffffff',

  /* Text on light surfaces */
  ink: '#0c0e0d',
  inkMuted: '#5b605a',
  inkDim: '#8b8f88',
  inkFaint: '#7b7f78',
  placeholder: '#9a9d96',

  /* Feedback */
  error: '#b3261e',
  success: '#1f6b45',

  /* Surfaces & gradients */
  fieldBg: '#fbfaf7', // form inputs
  stageStart: '#1b1914', // product "stage" gradient
  stageEnd: '#0b0c0b',
  ctaStart: '#14120d', // CTA band gradient
  ctaEnd: '#0a0b0a',
  coreStart: '#26231b', // orbit centre
  buttonDarkHover: '#1b1e1c',

  /* Light & shadow */
  glow: '#ffd58c', // warm cove light
  glowStrong: '#ffbe5a',
  shadow: '#000000',
} as const;

export type ColorKey = keyof typeof colors;

/** Opacity used to derive translucent tokens (text-on-dark, hairlines). */
export const alphas = {
  onDarkMuted: 0.64,
  onDarkDim: 0.42,
  lineDark: 0.1,
  lineLight: 0.11,
  goldLine: 0.32,
} as const;
