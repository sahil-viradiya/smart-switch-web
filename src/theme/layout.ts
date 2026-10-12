/** LAYOUT -  spacing, radii, container, header and button sizing. All lengths are rem so they scale with `rootScale`. */
export const layout = {
  /**
   * Content width: at least 78rem, growing to 74% of the viewport on big screens, capped at 100rem.
   * ~1250px at 1440w - 1600px at 1920w - 1890px at 2560w - 2200px (max) from ~3000w.
   */
  container: 'clamp(78rem, 74vw, 100rem)',
  gutter: 'clamp(1.25rem, 4.2vw, 2.25rem)',
  headerHeight: '4.75rem',
  headerHeightMobile: '4.25rem',
  sectionY: 'clamp(4.5rem, 10vw, 7.5rem)',
  sectionYTight: 'clamp(3rem, 7vw, 5rem)',

  /** Small, consistent corners. Circles (dots, icon buttons) use 50% directly. */
  radius: { sm: '0.1875rem', md: '0.25rem', card: '0.375rem', lg: '0.5rem', control: '0.25rem' },

  button: { height: '3rem', heightSm: '2.625rem', padX: '1.625rem', padXSm: '1.25rem', gap: '0.75rem' },

  /**
   * Large-screen scaling. The root font-size is 16px up to `fromWidth`, then grows with the viewport
   * (rate = px of root size per px of width) up to `max`. Every rem-based size -  type, container,
   * spacing -  scales with it, so 1920 / 2560 / ultrawide screens are filled proportionally.
   */
  rootScale: { min: '16px', max: '22px', fromWidth: 1440, rate: 0.0095 },

  /** Viewport breakpoints (px) -  keep in sync with the CSS media queries. */
  breakpoints: { tablet: 1050, mobileNav: 960, phone: 640 },
} as const;
