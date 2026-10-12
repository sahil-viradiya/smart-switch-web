'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@smart-switch/shared-config';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { label: 'Product', href: ROUTES.PRODUCT },
    { label: 'Features', href: ROUTES.FEATURES },
    { label: 'How It Works', href: ROUTES.HOW_IT_WORKS },
    { label: 'Use Cases', href: ROUTES.USE_CASES },
    { label: 'FAQ', href: ROUTES.FAQ },
    { label: 'About', href: ROUTES.ABOUT },
    { label: 'Contact', href: ROUTES.CONTACT },
  ];

  return (
    <div style={{ display: 'none' }} className="mobile-menu-wrapper">
      <button
        type="button"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'transparent',
          border: '1px solid var(--border-medium)',
          color: 'var(--text-primary)',
          padding: '8px 12px',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.9rem',
          fontWeight: 600,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </>
          )}
        </svg>
        <span>{isOpen ? 'Close' : 'Menu'}</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
          style={{
            position: 'fixed',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(9, 13, 22, 0.98)',
            backdropFilter: 'blur(20px)',
            zIndex: 100,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: pathname === link.href ? 'var(--accent-primary)' : 'var(--text-primary)',
                  background: pathname === link.href ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                  border: '1px solid',
                  borderColor: pathname === link.href ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div style={{ paddingTop: '24px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href={ROUTES.REQUEST_DEMO} className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
              Request Consultation
            </Link>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link href={ROUTES.LOGIN} className="btn btn-secondary" style={{ flex: 1, textAlign: 'center' }}>
                Sign In
              </Link>
              <Link href={ROUTES.SIGNUP} className="btn btn-outline" style={{ flex: 1, textAlign: 'center' }}>
                Partner Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
