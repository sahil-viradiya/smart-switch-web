/** LAYOUT — spacing, radii, container, header and button sizing. */
export const layout = {
  container: '1200px',
  gutter: 'clamp(20px, 4.2vw, 36px)',
  headerHeight: '76px',
  headerHeightMobile: '68px',
  sectionY: 'clamp(72px, 10vw, 120px)',
  sectionYTight: 'clamp(48px, 7vw, 80px)',

  radius: { sm: '10px', md: '14px', card: '18px', lg: '24px', pill: '999px' },

  button: { height: '48px', heightSm: '42px', padX: '26px', padXSm: '20px', gap: '12px' },

  /** Breakpoint (px) at which the header collapses to the mobile menu — keep in sync with CSS media queries. */
  breakpoints: { tablet: 1050, mobileNav: 960, phone: 640 },
} as const;
