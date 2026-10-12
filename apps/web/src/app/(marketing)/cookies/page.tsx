import { Metadata } from 'next';
import Link from 'next/link';
import { ROUTES } from '@smart-switch/shared-config';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Detailed disclosure of essential and functional cookies utilized across the Smart Switch website.',
};

export default function CookiesPage() {
  return (
    <div className="section" style={{ paddingTop: '60px' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            <Link href={ROUTES.HOME} style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)' }}>Cookies</span>
          </div>
          <h1 className="heading-h1" style={{ marginBottom: '16px' }}>
            Cookie Policy
          </h1>
          <p className="text-muted">
            Last Updated: October 2026
          </p>
        </div>

        <div className="card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '28px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          <div>
            <h2 className="heading-h3" style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>
              What Are Cookies?
            </h2>
            <p>
              Cookies are compact text files stored on your device by your web browser when visiting websites. They facilitate basic session preservation and user preferences.
            </p>
          </div>

          <div>
            <h2 className="heading-h3" style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>
              How Smart Switch Uses Cookies
            </h2>
            <p>
              We utilize strictly essential and functional cookies:
            </p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
              <li><strong>Strictly Essential Cookies:</strong> Required to maintain security tokens, CSRF protection, and trade portal session state.</li>
              <li><strong>Preference Cookies:</strong> Store your interactive switch finish preferences (e.g. Matte Charcoal vs. White) for your session.</li>
              <li><strong>Third-Party Ad Tracking:</strong> We do NOT install invasive third-party ad tracking or cross-site data harvesting pixels.</li>
            </ul>
          </div>

          <div>
            <h2 className="heading-h3" style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>
              Managing Cookie Settings
            </h2>
            <p>
              You may manage or disable cookies via your browser preferences at any time. Disabling essential cookies may impair access to the authenticated trade partner portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
