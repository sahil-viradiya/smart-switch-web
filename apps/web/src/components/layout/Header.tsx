import Link from 'next/link';
import { ROUTES } from '@smart-switch/shared-config';
import { MobileMenu } from './MobileMenu';

export function Header() {
  return (
    <header className="header-glass">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
        {/* Brand Logo */}
        <Link href={ROUTES.HOME} style={{ display: 'flex', alignItems: 'center', gap: '10px' }} aria-label="Smart Switch Homepage">
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)',
            }}
          >
            {/* Minimalist Switch icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#090D16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="3" width="14" height="18" rx="3" />
              <circle cx="12" cy="9" r="2" fill="#090D16" />
              <line x1="12" y1="13" x2="12" y2="17" />
            </svg>
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            SMART<span style={{ color: 'var(--accent-primary)' }}>SWITCH</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          className="desktop-nav"
          aria-label="Primary Navigation"
        >
          <Link href={ROUTES.PRODUCT} className="nav-link">
            Product
          </Link>
          <Link href={ROUTES.FEATURES} className="nav-link">
            Features
          </Link>
          <Link href={ROUTES.HOW_IT_WORKS} className="nav-link">
            How It Works
          </Link>
          <Link href={ROUTES.USE_CASES} className="nav-link">
            Use Cases
          </Link>
          <Link href={ROUTES.FAQ} className="nav-link">
            FAQ
          </Link>
          <Link href={ROUTES.ABOUT} className="nav-link">
            About
          </Link>
          <Link href={ROUTES.CONTACT} className="nav-link">
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="desktop-actions">
          <Link href={ROUTES.LOGIN} className="btn btn-outline btn-sm">
            Portal
          </Link>
          <Link href={ROUTES.REQUEST_DEMO} className="btn btn-primary btn-sm">
            Request Demo
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <MobileMenu />
      </div>

    </header>
  );
}
