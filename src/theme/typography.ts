/**
 * TYPOGRAPHY -  font family, weights, sizes, tracking and line-heights.
 *
 * To change the typeface: install the font (e.g. `npm i @fontsource/poppins`),
 * swap the imports in `theme/fonts.ts`, then update `fontFamily` below.
 */
export const typography = {
  /**
   * SF Pro on Apple devices (iOS, iPadOS, macOS) via the system font -  Apple's licence does not allow
   * self-hosting SF on the web. Everywhere else it falls back to Inter (self-hosted, visually very close).
   */
  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', Inter, 'Segoe UI', system-ui, Roboto, Arial, sans-serif",
  /** Used only for outlined (stroked) text, where variable system fonts show overlapping contours. */
  fontFamilyOutline: "Inter, 'Segoe UI', system-ui, Arial, sans-serif",

  weights: { light: 300, regular: 400, medium: 500, semibold: 600 },

  sizes: {
    display: 'clamp(2.9rem, 7.4vw, 5.6rem)', // home hero
    page: 'clamp(2.5rem, 6vw, 4.6rem)', // page hero h1
    section: 'clamp(2.1rem, 4.6vw, 3.6rem)', // section h2
    sub: 'clamp(1.4rem, 2.4vw, 1.9rem)',
    lead: 'clamp(1rem, 1.5vw, 1.15rem)',
    body: '1rem',
    bodyMobile: '0.9375rem',
    small: '0.8125rem',
    eyebrow: '0.6875rem',
  },

  tracking: {
    display: '-0.022em',
    page: '-0.02em',
    section: '-0.016em',
    sub: '-0.012em',
    eyebrow: '0.22em',
    logo: '0.26em',
  },

  leading: { display: 0.98, page: 1, section: 1.05, body: 1.65, lead: 1.7 },
} as const;
