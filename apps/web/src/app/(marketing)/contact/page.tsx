import { Metadata } from 'next';
import Link from 'next/link';
import { ROUTES, APP_CONFIG } from '@smart-switch/shared-config';
import { ContactForm } from '../../../components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Engineering & Sales Team',
  description:
    'Get in touch with Smart Switch customer support, technical engineering assistance, and trade partner inquiries.',
};

export default function ContactPage() {
  return (
    <div className="section" style={{ paddingTop: '60px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '780px', marginBottom: '56px' }}>
          <div style={{ display: 'flex', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            <Link href={ROUTES.HOME} style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)' }}>Contact</span>
          </div>
          <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
            Direct Communications
          </div>
          <h1 className="heading-h1" style={{ marginBottom: '16px' }}>
            Connect With Our Team
          </h1>
          <p className="text-lead">
            Whether you have technical wiring questions, specification inquiries, or partner certification requests, we are here to support your project.
          </p>
        </div>

        {/* 2-Column Grid: Form + Direct Details */}
        <div className="grid-2" style={{ gap: '48px', alignItems: 'flex-start' }}>
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Information & Channels */}
          <div>
            <div className="card" style={{ marginBottom: '24px', padding: '32px' }}>
              <h2 className="heading-h3" style={{ marginBottom: '20px' }}>
                Direct Office Channels
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    ✉️
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '0.95rem' }}>Sales & Project Specifications</strong>
                    <a href={`mailto:${APP_CONFIG.SALES_EMAIL}`} style={{ color: 'var(--accent-primary)', fontSize: '0.9rem' }}>{APP_CONFIG.SALES_EMAIL}</a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    🔧
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '0.95rem' }}>Technical & Electrical Support</strong>
                    <a href={`mailto:${APP_CONFIG.SUPPORT_EMAIL}`} style={{ color: 'var(--accent-primary)', fontSize: '0.9rem' }}>{APP_CONFIG.SUPPORT_EMAIL}</a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    📞
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '0.95rem' }}>Telephone Consultation</strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{APP_CONFIG.PHONE}</span>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Monday–Friday, 9:00 AM – 6:00 PM EST</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    📍
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '0.95rem' }}>Engineering Headquarters</strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>
                      {APP_CONFIG.ADDRESS}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Electrical Safety Caution Notice */}
            <div className="notice-box" style={{ padding: '20px' }}>
              <div style={{ fontSize: '1.25rem' }}>⚡</div>
              <div>
                <strong style={{ color: '#FDE68A', display: 'block', marginBottom: '4px' }}>Electrical Emergency Notice:</strong>
                If you suspect a short circuit, smell burning wire insulation, or experience an active electrical hazard, immediately trip your main building circuit breaker and contact your local emergency utility or emergency electrician service.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
