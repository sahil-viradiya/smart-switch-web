import Link from 'next/link';
import { Logo, LogoMark } from '@/components/art/Logo';
import { Newsletter } from './Newsletter';
import { CompanyFacts } from '@/components/ui/CompanyFacts';
import { ADDRESS_LINES, APP_CONFIG, CTA, FOOTER_COMPANY, FOOTER_EXPLORE, LEGAL_NAV, legalName, mailHref, mapsHref, telHref } from '@/config';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Logo />
            <p className="footer__about">Smart touch switches in glass and acrylic, for homes and studios.</p>
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
            <span className="eyebrow">Contact</span>
            <h2 style={{ marginTop: 14 }}>Get in touch</h2>
          </div>
          <div className="footer__cards">
            <div className="footer__card">
              <small>Email and phone</small>
              <strong>Sales and support</strong>
              <a href={mailHref()}>{APP_CONFIG.SALES_EMAIL}</a>
              <a href={telHref()}>{APP_CONFIG.PHONE}</a>
            </div>
            <div className="footer__card">
              <small>WhatsApp</small>
              <strong>Chat with us</strong>
              <a href={CTA.WHATSAPP.href} target="_blank" rel="noopener noreferrer">{APP_CONFIG.PHONE}</a>
              <p>For quick questions.</p>
            </div>
            {ADDRESS_LINES.length > 0 && (
              <div className="footer__card">
                <LogoMark className="addr__logo" />
                <small>Our address</small>
                <strong>{legalName()}</strong>
                <address style={{ fontStyle: 'normal' }}>{ADDRESS_LINES.map((l) => (<p key={l}>{l}</p>))}</address>
                <a className="addr__map" href={mapsHref()} target="_blank" rel="noopener noreferrer">Get directions</a>
              </div>
            )}
          </div>
        </div>

        <div className="footer__who">
          <p>{APP_CONFIG.BRAND_NAME} is sold by {legalName()}.</p>
          <CompanyFacts inline className="footer__facts" />
        </div>

        <div className="footer__bottom">
          <span>Copyright {APP_CONFIG.COPYRIGHT_YEAR} {legalName()}</span>
          <nav className="footer__legal" aria-label="Legal">
            {LEGAL_NAV.map((l) => (<Link key={l.href} href={l.href}>{l.label}</Link>))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
