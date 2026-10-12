import { Metadata } from 'next';
import Link from 'next/link';
import { ROUTES, VERIFIED_SPECS } from '@smart-switch/shared-config';
import { InteractiveSwitchPreview } from '../../../components/product/InteractiveSwitchPreview';

export const metadata: Metadata = {
  title: 'Product Overview & Technical Specifications',
  description:
    'Comprehensive dimensions, electrical ratings, modular gang form factors, and wiring prerequisites for Smart Switch hardware.',
};

export default function ProductPage() {
  return (
    <div className="section" style={{ paddingTop: '60px' }}>
      <div className="container">
        {/* Breadcrumb & Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            <Link href={ROUTES.HOME} style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)' }}>Product</span>
          </div>
          <h1 className="heading-h1" style={{ marginBottom: '16px' }}>
            Hardware Engineering & Specifications
          </h1>
          <p className="text-lead" style={{ maxWidth: '780px' }}>
            Explore dimensional tolerances, modular gang configurations, and verified electrical ratings engineered for reliable architectural installations.
          </p>
        </div>

        {/* Interactive Simulator */}
        <div style={{ marginBottom: '80px' }}>
          <InteractiveSwitchPreview />
        </div>

        {/* Form Factor Comparison Matrix */}
        <div style={{ marginBottom: '80px' }}>
          <h2 className="heading-h2" style={{ marginBottom: '24px' }}>
            Modular Form Factor Matrix
          </h2>

          <div className="grid-3">
            <div className="card">
              <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
                1-Gang Master
              </div>
              <h3 className="heading-h3" style={{ marginBottom: '12px' }}>
                Single Circuit Rocker
              </h3>
              <p className="text-body" style={{ fontSize: '0.925rem', marginBottom: '20px', lineHeight: 1.6 }}>
                Ideal for primary room illumination and dedicated accent lighting. Single large tactile plate with balanced mechanical actuation.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <li><strong>Plate Dimensions:</strong> 86 × 86 × 9 mm</li>
                <li><strong>Back-Box Depth:</strong> Min 35 mm</li>
                <li><strong>Max Load:</strong> 10A Resistive</li>
              </ul>
            </div>

            <div className="card">
              <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
                2-Gang Dual
              </div>
              <h3 className="heading-h3" style={{ marginBottom: '12px' }}>
                Dual Circuit Control
              </h3>
              <p className="text-body" style={{ fontSize: '0.925rem', marginBottom: '20px', lineHeight: 1.6 }}>
                Two independent switching channels engineered into a standard single wall box footprint. Ideal for ceiling + cove lighting splits.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <li><strong>Plate Dimensions:</strong> 86 × 86 × 9 mm</li>
                <li><strong>Back-Box Depth:</strong> Min 35 mm</li>
                <li><strong>Max Load:</strong> 10A per channel</li>
              </ul>
            </div>

            <div className="card">
              <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
                3-Gang Multi-Way
              </div>
              <h3 className="heading-h3" style={{ marginBottom: '12px' }}>
                Triple Zone Switch
              </h3>
              <p className="text-body" style={{ fontSize: '0.925rem', marginBottom: '20px', lineHeight: 1.6 }}>
                Engineered for foyer entrances and multi-zone open plan spaces requiring dense circuit switching without multiple wall cutouts.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <li><strong>Plate Dimensions:</strong> 86 × 86 × 9 mm</li>
                <li><strong>Back-Box Depth:</strong> Min 40 mm (recommended)</li>
                <li><strong>Max Load:</strong> 10A per channel</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Safety Callout Box */}
        <div className="notice-box" style={{ marginBottom: '80px', padding: '24px' }}>
          <div style={{ fontSize: '1.5rem' }}>⚠️</div>
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '6px', color: '#FDE68A' }}>
              Electrical Prerequisite Notice
            </h4>
            <p style={{ fontSize: '0.925rem', lineHeight: 1.6, color: '#FEF3C7' }}>
              Standard Smart Switch architectural hardware requires a dedicated <strong>neutral wire</strong> in the switch box to maintain continuous micro-controller standby power and relay state preservation. Always have an accredited, licensed electrician evaluate your wall-box wiring prior to specification.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="card card-highlight" style={{ textAlign: 'center', padding: '56px 32px' }}>
          <h2 className="heading-h2" style={{ marginBottom: '16px' }}>
            Ready to Specify Smart Switch for Your Project?
          </h2>
          <p className="text-lead" style={{ maxWidth: '640px', margin: '0 auto 32px' }}>
            Our architectural sales team provides custom project take-offs, gang layout schedules, and direct installer support.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={ROUTES.REQUEST_DEMO} className="btn btn-primary btn-lg">
              Request Project Consultation
            </Link>
            <Link href={ROUTES.CONTACT} className="btn btn-secondary btn-lg">
              Contact Engineering Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
