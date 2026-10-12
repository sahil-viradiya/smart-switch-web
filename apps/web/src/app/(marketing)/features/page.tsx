import { Metadata } from 'next';
import Link from 'next/link';
import { ROUTES } from '@smart-switch/shared-config';

export const metadata: Metadata = {
  title: 'Engineered Features & Mechanical Capabilities',
  description:
    'Detailed overview of tactile mechanical switches, electrical safety architectures, modular multi-gang design, and local offline fail-safe operations.',
};

const FEATURE_CARDS = [
  {
    slug: 'tactile-precision',
    title: 'Tactile Precision & Mechanical Actuation',
    tagline: 'Precision mechanical throw with acoustic micro-relay dampening',
    description:
      'Unlike mushy capacitive touch panels, Smart Switch restores the satisfying tactile feedback of mechanical actuation with a calibrated 1.2mm switch stroke and silent relay response.',
    points: ['100,000+ actuation cycle endurance', 'Zero phantom touch triggers', 'Subtle micro-LED state illumination'],
  },
  {
    slug: 'electrical-safety',
    title: 'Electrical Safety & Circuit Protection',
    tagline: 'V-0 flame-retardant housing and over-voltage suppression',
    description:
      'Safety is the foundation of every circuit. Built with self-extinguishing polycarbonate, integrated varistor surge suppression, and isolated low-voltage logic circuitry.',
    points: ['UL94 V-0 flame-retardant casing', 'Transient voltage clamping', 'Certified electrician screw-clamp blocks'],
  },
  {
    slug: 'modular-design',
    title: 'Modular Multi-Gang Architecture',
    tagline: 'Interchangeable 1-gang, 2-gang, and 3-gang snap-fit plates',
    description:
      'Engineered to harmonize across diverse room layouts. Standardized gang modules fit standard wall cutouts while concealing mounting screws behind an architectural trim plate.',
    points: ['Concealed screwless snap faceplates', 'Matte Charcoal & Aluminum finishes', 'Standard 86mm modular footprint'],
  },
  {
    slug: 'smart-ecosystem',
    title: 'Open Connectivity & Local Fail-Safe',
    tagline: 'Immediate physical control with open connectivity architecture',
    description:
      'A smart switch must never fail when connectivity drops. Dedicated local hardware relays ensure the wall switch operates physically even without Wi-Fi or Internet access.',
    points: ['Local mechanical switching fallback', 'Matter over Wi-Fi open protocol readiness', 'Zero mandatory cloud subscription locks'],
  },
];

export default function FeaturesPage() {
  return (
    <div className="section" style={{ paddingTop: '60px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            <Link href={ROUTES.HOME} style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)' }}>Features</span>
          </div>
          <h1 className="heading-h1" style={{ marginBottom: '16px' }}>
            Engineered Capabilities
          </h1>
          <p className="text-lead" style={{ maxWidth: '720px' }}>
            A rigorous engineering approach to modern electrical controls. Each capability is grounded in physical reliability, electrical safety, and verified technical performance.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid-2" style={{ gap: '32px', marginBottom: '80px' }}>
          {FEATURE_CARDS.map((feat) => (
            <div key={feat.slug} className="card card-highlight" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
                  Hardware Feature
                </div>
                <h2 className="heading-h3" style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>
                  {feat.title}
                </h2>
                <div style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '16px' }}>
                  {feat.tagline}
                </div>
                <p className="text-body" style={{ lineHeight: 1.6, marginBottom: '24px' }}>
                  {feat.description}
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {feat.points.map((pt, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  href={ROUTES.FEATURES_SLUG(feat.slug)}
                  className="btn btn-secondary"
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  Explore Detailed Technical Breakdown →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
          <h2 className="heading-h2" style={{ marginBottom: '16px' }}>
            Looking for Custom Project Specifications?
          </h2>
          <p className="text-body" style={{ maxWidth: '600px', margin: '0 auto 24px' }}>
            Our technical support team assists architects, builders, and electrical contractors with CAD symbols, BIM models, and specification schedules.
          </p>
          <Link href={ROUTES.CONTACT} className="btn btn-primary">
            Contact Technical Team
          </Link>
        </div>
      </div>
    </div>
  );
}
