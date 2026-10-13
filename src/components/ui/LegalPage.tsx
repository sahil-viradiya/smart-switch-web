import type { ReactNode } from 'react';
import { PageHero } from './PageHero';
import { CtaSection } from './CtaBand';
import { CTA, LEGAL } from '@/config';

export function LegalPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={[title]} lead={intro} crumbs={[{ label: title }]} />
      <section className="sec sec--paper">
        <div className="container--narrow prose">
          <p className="small dim">Last updated {LEGAL.updated}. Draft text for review by qualified counsel before launch.</p>
          {children}
        </div>
      </section>
      <CtaSection title="Questions about this policy?" text="Write to us and we will explain how we handle your information." primary={CTA.CONTACT_US} />
    </>
  );
}
