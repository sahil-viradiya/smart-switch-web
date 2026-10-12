import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ROUTES } from '@smart-switch/shared-config';

interface UseCaseDetail {
  slug: string;
  title: string;
  category: string;
  heroText: string;
  overview: string;
  solutions: {
    title: string;
    description: string;
  }[];
  specNotes: {
    label: string;
    value: string;
  }[];
  nextCase: {
    slug: string;
    title: string;
  };
}

const USE_CASE_DATA: Record<string, UseCaseDetail> = {
  'residential-homes': {
    slug: 'residential-homes',
    title: 'Modern Residential Living',
    category: 'Residential Architecture',
    heroText: 'Refined wall switch controls for living rooms, master bedrooms, and multi-way hallways.',
    overview:
      'Contemporary homes demand clean sightlines and understated luxury. Smart Switch replaces unsightly mismatched toggle banks with a flush, modular plate that delivers satisfying mechanical clicks and subtle micro-LED indicators that never disturb ambient room lighting.',
    solutions: [
      {
        title: 'Master Hallway Multi-Gang Consoles',
        description:
          'Consolidate up to three independent lighting circuits (downlights, accent pendants, wall sconces) onto a single standardized 86mm faceplate.',
      },
      {
        title: 'Sleep-Friendly Bedroom Illumination',
        description:
          'Unlike touchscreens that cast bright blue light across dark rooms, Smart Switch micro-LED dots emit soft emerald glow calibrated to remain discreet in low ambient conditions.',
      },
      {
        title: 'Multi-Way Corridor Switching',
        description:
          'Seamless physical multi-way switching allows controlling stairwell and corridor lights from opposite ends of the hallway without relying on complex cloud logic.',
      },
    ],
    specNotes: [
      { label: 'Recommended Finish', value: 'Architectural White or Matte Charcoal' },
      { label: 'Gang Recommendations', value: '2-Gang and 3-Gang Multi-Way' },
      { label: 'Wiring Requirement', value: 'Neutral wire in switch back-box' },
      { label: 'Electrical Contractor', value: 'Licensed Electrician Required' },
    ],
    nextCase: {
      slug: 'architectural-renovations',
      title: 'Architectural & Historic Restorations',
    },
  },
  'architectural-renovations': {
    slug: 'architectural-renovations',
    title: 'Architectural & Historic Restorations',
    category: 'Heritage & Renovation',
    heroText: 'Non-destructive retrofit installation preserving delicate plaster and historic wall planes.',
    overview:
      'Renovating period properties often presents challenges: shallow wall boxes, brittle lath and plaster, and strict aesthetic guidelines. Smart Switch’s 86mm modular frame fits standard junction cutouts with zero masonry enlargement required.',
    solutions: [
      {
        title: 'Concealed Screwless Sub-Frame',
        description:
          'Steel sub-mounting frame anchors securely into older electrical boxes while the decorative faceplate snaps flush, concealing uneven wall cutout borders.',
      },
      {
        title: 'Harmonious Metal Finishes',
        description:
          'Brushed Aluminum and Matte Charcoal options complement period brass, bronze door furniture, and fine timber millwork.',
      },
      {
        title: 'Local Standalone Operation',
        description:
          'Thick plaster and stone walls often attenuate Wi-Fi signals. Smart Switch switches lights mechanically and locally at the wall with zero network dependency.',
      },
    ],
    specNotes: [
      { label: 'Recommended Finish', value: 'Brushed Aluminum / Matte Charcoal' },
      { label: 'Back-Box Compatibility', value: 'Standard depth (min 35mm)' },
      { label: 'Faceplate Mounting', value: 'Magnetic detent screwless snap' },
      { label: 'Flame Safety', value: 'UL94 V-0 self-extinguishing core' },
    ],
    nextCase: {
      slug: 'commercial-studios',
      title: 'Commercial Studios & Executive Offices',
    },
  },
  'commercial-studios': {
    slug: 'commercial-studios',
    title: 'Commercial Studios & Executive Offices',
    category: 'Commercial & Creative Spaces',
    heroText: 'High-durability electrical controls for design practices, galleries, and executive suites.',
    overview:
      'Commercial environments demand high duty cycles, commercial electrical safety, and architectural restraint. Smart Switch delivers heavy-duty 10A micro-acoustic relays capable of handling high inrush currents from modern commercial LED drivers.',
    solutions: [
      {
        title: '10A Industrial Relay Contacts',
        description:
          'Engineered to withstand inductive lighting loads, magnetic ballasts, and high-wattage linear architectural LED runs without contact welding.',
      },
      {
        title: 'Zero Forced Software Subscriptions',
        description:
          'Facilities managers enjoy clean physical switching with no ongoing SaaS licensing costs or proprietary cloud broker maintenance fees.',
      },
      {
        title: 'Standardized Commercial Spacing',
        description:
          'Identical visual and tactile experience throughout conference suites, executive offices, and gallery exhibition spaces.',
      },
    ],
    specNotes: [
      { label: 'Current Rating', value: '10A Resistive / 5A Inductive per gang' },
      { label: 'Cycle Endurance', value: '100,000+ mechanical actuations' },
      { label: 'Operating Temp', value: '-10°C to +45°C' },
      { label: 'Trade Pricing', value: 'Available through Certified Partner Portal' },
    ],
    nextCase: {
      slug: 'residential-homes',
      title: 'Modern Residential Living',
    },
  },
};

export function generateStaticParams() {
  return Object.keys(USE_CASE_DATA).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = USE_CASE_DATA[params.slug];
  if (!item) return { title: 'Use Case Not Found' };
  return {
    title: `${item.title} — Smart Switch Applications`,
    description: item.heroText,
  };
}

export default function UseCaseSlugPage({ params }: { params: { slug: string } }) {
  const data = USE_CASE_DATA[params.slug];

  if (!data) {
    notFound();
  }

  return (
    <div className="section" style={{ paddingTop: '60px' }}>
      <div className="container">
        {/* Breadcrumb & Title */}
        <div style={{ maxWidth: '820px', marginBottom: '48px' }}>
          <div style={{ display: 'flex', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            <Link href={ROUTES.HOME} style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <span>/</span>
            <Link href={ROUTES.USE_CASES} style={{ color: 'var(--text-secondary)' }}>Use Cases</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)' }}>{data.title}</span>
          </div>

          <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
            {data.category}
          </div>
          <h1 className="heading-h1" style={{ marginBottom: '16px' }}>
            {data.title}
          </h1>
          <p className="text-lead">
            {data.heroText}
          </p>
        </div>

        {/* Narrative Overview */}
        <div className="card" style={{ padding: '36px', marginBottom: '56px', background: 'var(--bg-surface)' }}>
          <h2 className="heading-h3" style={{ marginBottom: '12px', color: 'var(--accent-primary)' }}>
            Application Context & Design Challenge
          </h2>
          <p className="text-body" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
            {data.overview}
          </p>
        </div>

        {/* Solution Pillars */}
        <div style={{ marginBottom: '64px' }}>
          <h2 className="heading-h2" style={{ marginBottom: '32px' }}>
            Tailored Architectural Solutions
          </h2>
          <div className="grid-3">
            {data.solutions.map((sol, idx) => (
              <div key={idx} className="card">
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '12px' }}>
                  0{idx + 1}
                </div>
                <h3 className="heading-h3" style={{ marginBottom: '12px' }}>
                  {sol.title}
                </h3>
                <p className="text-body" style={{ fontSize: '0.925rem', lineHeight: 1.6 }}>
                  {sol.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Specification Recommendations Table */}
        <div style={{ marginBottom: '64px' }}>
          <h2 className="heading-h2" style={{ marginBottom: '24px' }}>
            Application Specification Guidelines
          </h2>
          <div
            style={{
              maxWidth: '800px',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
            }}
          >
            {data.specNotes.map((note, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '16px 24px',
                  borderBottom: idx === data.specNotes.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                  fontSize: '0.925rem',
                }}
              >
                <span style={{ color: 'var(--text-secondary)' }}>{note.label}</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{note.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
            paddingTop: '40px',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Explore Next Application Study
            </span>
            <Link
              href={ROUTES.USE_CASES_SLUG(data.nextCase.slug)}
              style={{ color: 'var(--accent-primary)', fontWeight: 700, fontSize: '1.05rem' }}
            >
              {data.nextCase.title} →
            </Link>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href={ROUTES.REQUEST_DEMO} className="btn btn-primary">
              Request Project Consultation
            </Link>
            <Link href={ROUTES.USE_CASES} className="btn btn-outline">
              All Use Cases
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
