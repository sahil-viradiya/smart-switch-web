import { Metadata } from 'next';
import Link from 'next/link';
import { ROUTES } from '@smart-switch/shared-config';

export const metadata: Metadata = {
  title: 'Real-World Applications & Architectural Use Cases',
  description:
    'Explore verified architectural applications for Smart Switch across modern luxury residences, historic renovations, and commercial design studios.',
};

const USE_CASE_ITEMS = [
  {
    slug: 'residential-homes',
    title: 'Modern Residential Living',
    tagline: 'Tailored for living rooms, master suites, and multi-way corridors',
    description:
      'Seamlessly integrates into contemporary homes where wall clutter is minimized and tactile switch aesthetics complement minimalist millwork and architectural lighting.',
    benefits: [
      'Multi-gang central hallway controls',
      'Soft micro-LED status dots that do not disrupt sleep in bedrooms',
      'Instant local actuation for reliable daily family use',
    ],
  },
  {
    slug: 'architectural-renovations',
    title: 'Architectural & Historic Restorations',
    tagline: 'Preserving heritage wall surfaces with standard back-box retrofits',
    description:
      'Preserve historic plaster, brick, and millwork surfaces without cutting destructive oversized cavities. Standard 86mm modular frames install into existing conduits.',
    benefits: [
      'Concealed screwless snap faceplates match classic and transitional trims',
      'Flush mounting eliminates clumsy surface protrusions',
      'Matte Charcoal and Brushed Aluminum finishes complement heritage materials',
    ],
  },
  {
    slug: 'commercial-studios',
    title: 'Commercial Studios & Executive Offices',
    tagline: 'Durable architectural switching for design practices and boutique suites',
    description:
      'Engineered for professional environments requiring heavy daily switching duty cycles, crisp tactile feedback, and restrained architectural beauty.',
    benefits: [
      '10A rated industrial contacts support heavy LED lighting loads',
      'Zero mandatory cloud subscription dependencies for building managers',
      'V-0 flame-retardant enclosures compliant with commercial electrical safety codes',
    ],
  },
];

export default function UseCasesPage() {
  return (
    <div className="section" style={{ paddingTop: '60px' }}>
      <div className="container">
        {/* Breadcrumb & Header */}
        <div style={{ maxWidth: '820px', marginBottom: '56px' }}>
          <div style={{ display: 'flex', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            <Link href={ROUTES.HOME} style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)' }}>Use Cases</span>
          </div>
          <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
            Application Profiles
          </div>
          <h1 className="heading-h1" style={{ marginBottom: '20px' }}>
            Engineered for Spaces That Value Form & Reliability
          </h1>
          <p className="text-lead">
            Discover how homeowners, interior designers, and commercial architects deploy Smart Switch across luxury residential builds, sensitive restorations, and commercial creative studios.
          </p>
        </div>

        {/* Use Cases Cards */}
        <div className="grid-3" style={{ gap: '32px', marginBottom: '80px' }}>
          {USE_CASE_ITEMS.map((item) => (
            <div key={item.slug} className="card card-highlight" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-primary)', letterSpacing: '0.05em', marginBottom: '12px' }}>
                  Application Study
                </div>
                <h2 className="heading-h3" style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>
                  {item.title}
                </h2>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '16px' }}>
                  {item.tagline}
                </div>
                <p className="text-body" style={{ lineHeight: 1.6, marginBottom: '24px' }}>
                  {item.description}
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {item.benefits.map((b, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '10px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  href={ROUTES.USE_CASES_SLUG(item.slug)}
                  className="btn btn-secondary"
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  View Application Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Consultation Banner */}
        <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
          <h2 className="heading-h2" style={{ marginBottom: '16px' }}>
            Designing a Bespoke Project?
          </h2>
          <p className="text-body" style={{ maxWidth: '640px', margin: '0 auto 24px' }}>
            Speak directly with our architectural specification team to arrange physical hardware sample kits, electrical gang schedules, or trade partner pricing.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={ROUTES.REQUEST_DEMO} className="btn btn-primary">
              Request Project Consultation
            </Link>
            <Link href={ROUTES.CONTACT} className="btn btn-outline">
              Contact Sales Engineering
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
