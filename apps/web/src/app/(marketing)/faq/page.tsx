import { Metadata } from 'next';
import Link from 'next/link';
import { ROUTES } from '@smart-switch/shared-config';
import { FaqAccordion } from '../../../components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions & Technical FAQ',
  description:
    'Answers to common questions regarding neutral wire requirements, certified electrical installation, local offline relays, and product warranty.',
};

export default function FaqPage() {
  return (
    <div className="section" style={{ paddingTop: '60px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: '56px' }}>
          <div style={{ display: 'flex', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            <Link href={ROUTES.HOME} style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)' }}>FAQ</span>
          </div>
          <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
            Knowledge Base
          </div>
          <h1 className="heading-h1" style={{ marginBottom: '16px' }}>
            Frequently Asked Questions
          </h1>
          <p className="text-lead">
            Comprehensive answers covering electrical specifications, wiring prerequisites, smart home connectivity, and certified installer standards.
          </p>
        </div>

        {/* Accordion Component */}
        <div style={{ maxWidth: '860px', margin: '0 auto 64px' }}>
          <FaqAccordion />
        </div>

        {/* Have More Questions Card */}
        <div className="card" style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', padding: '48px 32px' }}>
          <h2 className="heading-h2" style={{ marginBottom: '16px' }}>
            Have a Specific Wiring or Architectural Question?
          </h2>
          <p className="text-body" style={{ maxWidth: '600px', margin: '0 auto 28px' }}>
            Our engineering team is readily available to review single-line wiring schematics, conduit drawings, or custom multi-gang layouts.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={ROUTES.CONTACT} className="btn btn-primary">
              Contact Technical Support
            </Link>
            <Link href={ROUTES.REQUEST_DEMO} className="btn btn-outline">
              Request Project Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
