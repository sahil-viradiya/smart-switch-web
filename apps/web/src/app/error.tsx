'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ROUTES } from '@smart-switch/shared-config';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Application Render Error]:', error);
  }, [error]);

  return (
    <div className="section" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '580px' }}>
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
          Circuit Fault Detected
        </div>
        <h1 className="heading-h1" style={{ marginBottom: '16px' }}>
          An Unexpected Error Occurred
        </h1>
        <p className="text-body" style={{ marginBottom: '32px' }}>
          Our engineering monitoring systems have logged this issue. You may attempt to recover the page or return to the main product directory.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button type="button" onClick={() => reset()} className="btn btn-primary">
            Reset Circuit & Retry
          </button>
          <Link href={ROUTES.HOME} className="btn btn-secondary">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
