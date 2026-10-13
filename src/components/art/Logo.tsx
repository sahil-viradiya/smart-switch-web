import Link from 'next/link';
import { APP_CONFIG, ROUTES } from '@/config';
import { LOGO_MARK } from './logo-mark';

/** Colours come from CSS variables (set by the theme), so the logo follows theme changes. */
export function LogoMark({ className = 'logo__mark' }: { className?: string }) {
  const { ring, dot } = LOGO_MARK;
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="37" height="37" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx={ring.cx} cy={ring.cy} r={ring.r} stroke="var(--gold)" strokeWidth="1.5" />
      <circle cx={dot.cx} cy={dot.cy} r={dot.r} fill="var(--gold)" />
    </svg>
  );
}

export function Logo({ linked = true }: { linked?: boolean }) {
  const inner = (
    <>
      <LogoMark />
      <span className="logo__word">
        <strong>{APP_CONFIG.BRAND_NAME.toUpperCase()}</strong>
        <small>{APP_CONFIG.BRAND_TAGLINE}</small>
      </span>
    </>
  );
  if (!linked) return <span className="logo">{inner}</span>;
  return (
    <Link href={ROUTES.HOME} className="logo">
      {inner}
    </Link>
  );
}
