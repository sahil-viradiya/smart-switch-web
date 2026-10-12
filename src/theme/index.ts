import { alphas, colors } from './colors';
import { layout } from './layout';
import { motion } from './motion';
import { typography } from './typography';

export { colors, alphas, typography, layout, motion };
export * from './art';
export const theme = { colors, alphas, typography, layout, motion } as const;

const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

function rgbTriplet(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

/** Serialises the theme into a `:root { --token: value }` stylesheet (injected once in the root layout). */
export function themeCss(): string {
  const v: string[] = [];

  for (const [k, hex] of Object.entries(colors)) {
    v.push(`--${kebab(k)}:${hex}`, `--${kebab(k)}-rgb:${rgbTriplet(hex)}`);
  }
  // Semantic aliases & translucent tokens
  v.push(
    `--on-dark:var(--white)`,
    `--on-dark-muted:rgb(var(--white-rgb) / ${alphas.onDarkMuted})`,
    `--on-dark-dim:rgb(var(--white-rgb) / ${alphas.onDarkDim})`,
    `--line-dark:rgb(var(--white-rgb) / ${alphas.lineDark})`,
    `--line-light:rgb(var(--ink-rgb) / ${alphas.lineLight})`,
    `--gold-line:rgb(var(--gold-rgb) / ${alphas.goldLine})`,
    `--chevron:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%23${colors.ink.slice(1)}' stroke-width='1.6' stroke-linecap='round'%3E%3Cpath d='m1 1.5 5 5 5-5'/%3E%3C/svg%3E")`,
  );

  const t = typography;
  v.push(`--font:${t.fontFamily}`, `--font-outline:${t.fontFamilyOutline}`);
  for (const [k, w] of Object.entries(t.weights)) v.push(`--fw-${k}:${w}`);
  for (const [k, s] of Object.entries(t.sizes)) v.push(`--fs-${kebab(k)}:${s}`);
  for (const [k, s] of Object.entries(t.tracking)) v.push(`--ls-${k}:${s}`);
  for (const [k, s] of Object.entries(t.leading)) v.push(`--lh-${k}:${s}`);

  const l = layout;
  v.push(
    `--container:${l.container}`,
    `--gutter:${l.gutter}`,
    `--header-h:${l.headerHeight}`,
    `--section-y:${l.sectionY}`,
    `--section-y-tight:${l.sectionYTight}`,
    `--btn-h:${l.button.height}`,
    `--btn-h-sm:${l.button.heightSm}`,
    `--btn-px:${l.button.padX}`,
    `--btn-px-sm:${l.button.padXSm}`,
    `--btn-gap:${l.button.gap}`,
  );
  for (const [k, r] of Object.entries(l.radius)) v.push(`--radius-${k}:${r}`);

  const m = motion;
  v.push(`--ease-out:${m.easeOut}`, `--ease-soft:${m.easeSoft}`, `--ease-camera:${m.easeCamera}`, `--intro-duration:${m.introMs}ms`, `--marquee-duration:${m.marqueeSeconds}s`);
  for (const [k, d] of Object.entries(m.durations)) v.push(`--dur-${k}:${d}`);

  const rs = l.rootScale;
  const root = `html{font-size:clamp(${rs.min},calc(${rs.min} + (100vw - ${rs.fromWidth}px) * ${rs.rate}),${rs.max})}`;
  return `${root}:root{${v.join(';')}}@media (max-width:${l.breakpoints.phone}px){:root{--header-h:${l.headerHeightMobile};--fs-body:${t.sizes.bodyMobile}}}`;
}
