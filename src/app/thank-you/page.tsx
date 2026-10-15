import { Suspense } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { pageMeta } from '@/lib/seo';
import { PAGES } from '@/config';
import { ThankYouContent } from './ThankYouContent';

export const metadata = pageMeta('THANK_YOU');

export default function ThankYouPage() {
  return (
    <>
      <PageHero
        eyebrow="Confirmation"
        title={['Thank you']}
        lead="Your enquiry has been successfully recorded."
        crumbs={[{ label: PAGES.THANK_YOU.name }]}
      />
      <section className="sec sec--paper" aria-label="Confirmation details">
        <div className="container">
          <Reveal>
            <Suspense fallback={<div className="form-card" style={{ maxWidth: '38rem', margin: '0 auto', textAlign: 'center', padding: '3rem 0' }}>Loading...</div>}>
              <ThankYouContent />
            </Suspense>
          </Reveal>
        </div>
      </section>
    </>
  );
}
