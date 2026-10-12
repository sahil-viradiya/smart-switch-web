'use client';

import { useEffect } from 'react';
import { CtaLink } from '@/components/ui/CtaLink';
import { CTA } from '@/config';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error(error), [error]);
  return (
    <section className="sec sec--dark center-page">
      <div className="container">
        <div>
          <span className="eyebrow eyebrow--mark">Something went wrong</span>
          <h1 className="h-page">Please try again.</h1>
          <p className="lead">An unexpected error occurred while loading this page.</p>
          <div className="row" style={{ justifyContent: 'center' }}>
            <button type="button" className="btn btn--gold" onClick={reset}>Try again</button>
            <CtaLink cta={CTA.BACK_HOME} variant="ghost" />
          </div>
        </div>
      </div>
    </section>
  );
}
