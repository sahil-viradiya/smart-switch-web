/**
 * TYPOGRAPHY — font family, weights, sizes, tracking and line-heights.
 *
 * To change the typeface: install the font (e.g. `npm i @fontsource/poppins`),
 * swap the imports in `theme/fonts.ts`, then update `fontFamily` below.
 */
export const typography = {
  fontFamily: "Inter, 'Segoe UI', system-ui, -apple-system, Arial, sans-serif",

  weights: { light: 300, regular: 400, medium: 500, semibold: 600 },

  sizes: {
    display: 'clamp(2.9rem, 7.4vw, 5.6rem)', // home hero
    page: 'clamp(2.5rem, 6vw, 4.6rem)', // page hero h1
    section: 'clamp(2.1rem, 4.6vw, 3.6rem)', // section h2
    sub: 'clamp(1.4rem, 2.4vw, 1.9rem)',
    lead: 'clamp(1rem, 1.5vw, 1.15rem)',
    body: '16px',
    bodyMobile: '15px',
    small: '0.8125rem',
    eyebrow: '11px',
  },

  tracking: {
    display: '-0.035em',
    page: '-0.032em',
    section: '-0.028em',
    sub: '-0.02em',
    eyebrow: '0.22em',
    logo: '0.26em',
  },

  leading: { display: 0.98, page: 1, section: 1.05, body: 1.65, lead: 1.7 },
} as const;
