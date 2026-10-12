import Link from 'next/link';
import { ROUTES } from '@smart-switch/shared-config';

export default function NotFound() {
  return (
    <div className="section" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#FB7185',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '20px',
          }}
        >
          HTTP 404 — Circuit Disconnected
        </div>
        <h1 className="heading-h1" style={{ marginBottom: '16px' }}>
          Requested Page Not Found
        </h1>
        <p className="text-lead" style={{ marginBottom: '32px' }}>
          The URL you navigated to does not correspond to an active resource on the Smart Switch platform.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href={ROUTES.HOME} className="btn btn-primary">
            Return to Homepage
          </Link>
          <Link href={ROUTES.PRODUCT} className="btn btn-secondary">
            View Product Catalog
          </Link>
          <Link href={ROUTES.CONTACT} className="btn btn-outline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
