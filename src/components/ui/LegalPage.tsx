import type { ReactNode } from 'react';
import { PageHero } from './PageHero';
import { CtaSection } from './CtaBand';
import { CTA } from '@/config';

export function LegalPage({ title, updated, intro, children }: { title: string; updated: string; intro: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={[title]} lead={intro} crumbs={[{ label: title }]} />
      <section className="sec sec--paper">
        <div className="container--narrow prose">
          <p className="small dim">Last updated {updated}. Draft text for review by qualified counsel before launch.</p>
          {children}
        </div>
      </section>
      <CtaSection title="Questions about this policy?" text="We are happy to explain how we handle your information." primary={CTA.CONTACT_US} />
    </>
  );
}
