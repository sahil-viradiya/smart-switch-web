'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/art/Logo';
import { PillDiscLink } from '@/components/ui/ButtonLink';
import { CtaLink } from '@/components/ui/CtaLink';
import { PRIMARY_NAV, ROUTES, CTA } from '@/config';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === ROUTES.HOME ? pathname === '/' : pathname.startsWith(href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className={`header${scrolled || open ? ' is-scrolled' : ''}`} style={{ zIndex: 100 }}>
        <div className="container">
          <div className="header__inner">
            <Logo />
            <nav className="header__nav" aria-label="Primary">
              {PRIMARY_NAV.map((l) => (
                <Link key={l.href} href={l.href} className="header__link" aria-current={isActive(l.href) ? 'page' : undefined}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="header__actions">
              <PillDiscLink cta={CTA.BOOK_DEMO} />
              <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((v) => !v)}>
                <span /><span />
              </button>
            </div>
          </div>
          <div className="header__rule" />
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`}>
        <nav className="mobile-menu__nav" aria-label="Mobile">
          {PRIMARY_NAV.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? 'page' : undefined}>{l.label}</Link>
          ))}
        </nav>
        <div className="mobile-menu__cta">
          <CtaLink cta={CTA.BOOK_DEMO} variant="gold" arrow block />
          <CtaLink cta={CTA.READ_FAQ} variant="ghost" block />
        </div>
        <p className="mobile-menu__note">Installation by licensed electricians only.</p>
      </div>
    </>
  );
}
