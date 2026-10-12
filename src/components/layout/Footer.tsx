import Link from 'next/link';
import { Logo } from '@/components/art/Logo';
import { Newsletter } from './Newsletter';
import { APP_CONFIG, FOOTER_COMPANY, FOOTER_EXPLORE, LEGAL_NAV } from '@/config';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Logo />
            <p className="footer__about">Architectural smart electrical controls — tactile, quietly intelligent and designed to disappear into the wall.</p>
            <Newsletter />
          </div>
          <nav className="footer__col" aria-label="Explore">
            <h2>Explore</h2>
            <ul>{FOOTER_EXPLORE.map((l) => (<li key={l.href}><Link href={l.href}>{l.label}</Link></li>))}</ul>
          </nav>
          <nav className="footer__col" aria-label="Company">
            <h2>Company</h2>
            <ul>{FOOTER_COMPANY.map((l) => (<li key={l.href}><Link href={l.href}>{l.label}</Link></li>))}</ul>
          </nav>
        </div>

        <div className="footer__contact">
          <div>
            <span className="eyebrow">Get in touch</span>
            <h2 style={{ marginTop: 14 }}>Talk to our team.</h2>
          </div>
          <div className="footer__cards">
            <div className="footer__card">
              <small>Sales</small>
              <strong>Project enquiries</strong>
              <a href={`mailto:${APP_CONFIG.SALES_EMAIL}`}>{APP_CONFIG.SALES_EMAIL}</a>
              <a href={`tel:${APP_CONFIG.PHONE.replace(/[^+\d]/g, '')}`}>{APP_CONFIG.PHONE}</a>
            </div>
            <div className="footer__card">
              <small>Support</small>
              <strong>Technical questions</strong>
              <a href={`mailto:${APP_CONFIG.SUPPORT_EMAIL}`}>{APP_CONFIG.SUPPORT_EMAIL}</a>
            </div>
            <div className="footer__card">
              <small>Studio</small>
              <strong>{APP_CONFIG.BRAND_NAME}</strong>
              <address style={{ fontStyle: 'normal' }}>{APP_CONFIG.ADDRESS_LINES.map((l) => (<p key={l}>{l}</p>))}</address>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {APP_CONFIG.COPYRIGHT_YEAR} {APP_CONFIG.LEGAL_COMPANY_NAME}</span>
          <nav className="footer__legal" aria-label="Legal">
            {LEGAL_NAV.map((l) => (<Link key={l.href} href={l.href}>{l.label}</Link>))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
