import Link from 'next/link';
import { APP_CONFIG, ROUTES } from '@/config';
import { LOGO_MARK } from './logo-mark';

/** Colours come from CSS variables (set by the theme), so the logo follows theme changes. */
export function LogoMark({ className = 'logo__mark' }: { className?: string }) {
  const p = LOGO_MARK.paddle;
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="37" height="37" rx="11" stroke="currentColor" strokeWidth="1.5" />
      <rect x={p.x} y={p.y} width={p.w} height={p.h} rx="5" stroke="currentColor" strokeWidth="1.5" />
      <path d={LOGO_MARK.top} fill="var(--gold)" />
      <circle cx="20" cy="14" r="1.6" fill="var(--black)" />
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
    <Link href={ROUTES.HOME} className="logo" aria-label={`${APP_CONFIG.BRAND_NAME} — home`}>
      {inner}
    </Link>
  );
}
