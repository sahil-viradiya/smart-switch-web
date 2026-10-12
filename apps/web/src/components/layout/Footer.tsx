import Link from 'next/link';
import { ROUTES, APP_CONFIG, VERIFIED_SPECS } from '@smart-switch/shared-config';

export function Footer() {
  return (
    <footer
      style={{
        background: '#060910',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '64px',
        paddingBottom: '40px',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr',
            gap: '40px',
            marginBottom: '48px',
          }}
          className="footer-grid"
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#090D16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="3" width="14" height="18" rx="3" />
                  <circle cx="12" cy="9" r="2" fill="#090D16" />
                  <line x1="12" y1="13" x2="12" y2="17" />
                </svg>
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                SMART<span style={{ color: 'var(--accent-primary)' }}>SWITCH</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px', maxWidth: '340px' }}>
              Architectural electrical controls engineered for luxury residences, historic renovations, and modern spaces. Built with mechanical tactile switches and certified electrical safety.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: 'var(--radius-full)', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'inline-block' }}></span>
              Standard {VERIFIED_SPECS.VOLTAGE_RANGE}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Product
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li><Link href={ROUTES.PRODUCT} className="nav-link" style={{ padding: 0 }}>Overview & Specs</Link></li>
              <li><Link href={ROUTES.FEATURES} className="nav-link" style={{ padding: 0 }}>Engineered Features</Link></li>
              <li><Link href={ROUTES.FEATURES_SLUG('tactile-precision')} className="nav-link" style={{ padding: 0 }}>Tactile Precision</Link></li>
              <li><Link href={ROUTES.FEATURES_SLUG('electrical-safety')} className="nav-link" style={{ padding: 0 }}>Electrical Safety</Link></li>
              <li><Link href={ROUTES.FEATURES_SLUG('modular-design')} className="nav-link" style={{ padding: 0 }}>Multi-Gang Form</Link></li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Solutions
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li><Link href={ROUTES.HOW_IT_WORKS} className="nav-link" style={{ padding: 0 }}>Certified Installation</Link></li>
              <li><Link href={ROUTES.USE_CASES} className="nav-link" style={{ padding: 0 }}>All Applications</Link></li>
              <li><Link href={ROUTES.USE_CASES_SLUG('residential-homes')} className="nav-link" style={{ padding: 0 }}>Residential Homes</Link></li>
              <li><Link href={ROUTES.USE_CASES_SLUG('architectural-renovations')} className="nav-link" style={{ padding: 0 }}>Renovations</Link></li>
              <li><Link href={ROUTES.USE_CASES_SLUG('commercial-studios')} className="nav-link" style={{ padding: 0 }}>Commercial Spaces</Link></li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Company
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li><Link href={ROUTES.ABOUT} className="nav-link" style={{ padding: 0 }}>About Our Team</Link></li>
              <li><Link href={ROUTES.FAQ} className="nav-link" style={{ padding: 0 }}>Technical FAQ</Link></li>
              <li><Link href={ROUTES.CONTACT} className="nav-link" style={{ padding: 0 }}>Contact Support</Link></li>
              <li><Link href={ROUTES.SIGNUP} className="nav-link" style={{ padding: 0 }}>Installer Network</Link></li>
              <li><Link href={ROUTES.LOGIN} className="nav-link" style={{ padding: 0 }}>Partner Portal</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Contact & Inquiries
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '8px' }}>
              <strong>Sales & Projects:</strong><br />
              <a href={`mailto:${APP_CONFIG.SALES_EMAIL}`} style={{ color: 'var(--accent-primary)' }}>{APP_CONFIG.SALES_EMAIL}</a>
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              <strong>Phone Consultation:</strong><br />
              {APP_CONFIG.PHONE}
            </p>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-sm)', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              ⚠️ Electrical notice: Always consult a licensed electrical contractor before installation.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © {APP_CONFIG.COPYRIGHT_YEAR} {APP_CONFIG.LEGAL_COMPANY_NAME}. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Link href={ROUTES.PRIVACY} className="nav-link" style={{ padding: 0 }}>Privacy Policy</Link>
            <Link href={ROUTES.TERMS} className="nav-link" style={{ padding: 0 }}>Terms & Conditions</Link>
            <Link href={ROUTES.COOKIES} className="nav-link" style={{ padding: 0 }}>Cookie Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
