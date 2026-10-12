import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ROUTES } from '@smart-switch/shared-config';

interface FeatureDetail {
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  overview: string;
  engineeringDetails: {
    heading: string;
    description: string;
  }[];
  specSheet: {
    label: string;
    value: string;
  }[];
  relatedFeature: {
    slug: string;
    title: string;
  };
}

const FEATURE_DATA: Record<string, FeatureDetail> = {
  'tactile-precision': {
    slug: 'tactile-precision',
    title: 'Tactile Precision & Mechanical Actuation',
    subtitle: 'Calibrated mechanical throw with acoustic micro-relay dampening',
    badge: 'Mechanical Engineering',
    overview:
      'In an era dominated by imprecise capacitive touch screens and glass slabs, the Smart Switch celebrates the visceral satisfaction of physical mechanical feedback. Every actuator utilizes industrial-grade micro-switches calibrated with a crisp 1.2mm stroke.',
    engineeringDetails: [
      {
        heading: 'Balanced Spring-Return Mechanism',
        description:
          'A proprietary torsion-spring rocker assembly ensures uniform force resistance whether pressed at the center or the extreme edge of the switch paddle.',
      },
      {
        heading: 'Acoustic Relay Tuning',
        description:
          'High-voltage relays often emit harsh metallic clicks. Smart Switch cushions contact actuation using an elastomeric sub-frame, transforming sharp clatter into a muted, premium thud.',
      },
      {
        heading: 'Subtle Micro-Illumination LED',
        description:
          'A precision optical light guide channels a 0.2W micro-LED status dot to the front bezel. Soft emerald illumination confirms active circuit power without producing disruptive bedroom glare.',
      },
    ],
    specSheet: [
      { label: 'Switch Travel Stroke', value: '1.2 mm ± 0.1 mm' },
      { label: 'Actuation Force', value: '1.8 Newtons' },
      { label: 'Mechanical Life Expectancy', value: '100,000 Cycles Minimum' },
      { label: 'Paddle Material', value: 'Polycarbonate V-0 with Matte Finish' },
    ],
    relatedFeature: {
      slug: 'modular-design',
      title: 'Modular Multi-Gang Architecture',
    },
  },
  'electrical-safety': {
    slug: 'electrical-safety',
    title: 'Electrical Safety & Circuit Protection',
    subtitle: 'UL94 V-0 flame-retardant housing and transient over-voltage clamping',
    badge: 'Safety & Compliance',
    overview:
      'Behind the refined exterior lies an electrical safety architecture designed to withstand mains voltage surges, thermal cycling, and continuous heavy lighting loads. Electrical safety is never compromised for aesthetics.',
    engineeringDetails: [
      {
        heading: 'V-0 Flame-Retardant Polymer',
        description:
          'The entire rear housing enclosure is molded from high-grade UL94 V-0 polycarbonate, which self-extinguishes within 10 seconds of an ignition source without flaming drips.',
      },
      {
        heading: 'Over-Current & Surge Suppression',
        description:
          'Dual metal-oxide varistors (MOVs) clamp transient line voltage spikes (up to 2kV), protecting sensitive LED drivers and low-voltage control microchips from grid irregularities.',
      },
      {
        heading: 'Heavy-Gauge Terminal Block',
        description:
          'Industrial brass screw-clamp terminals accommodate up to 2.5mm² (14–12 AWG) solid or stranded copper conductors, ensuring vibration-proof wire retention.',
      },
    ],
    specSheet: [
      { label: 'Casing Flammability Rating', value: 'UL94 V-0 Certified Resin' },
      { label: 'Surge Suppression Clamping', value: '2 kV Transient Voltage Spike' },
      { label: 'Terminal Wire Gauge', value: '1.5 mm² to 2.5 mm² (14-12 AWG)' },
      { label: 'Isolation Voltage', value: '3,000V AC Dielectric Withstand' },
    ],
    relatedFeature: {
      slug: 'tactile-precision',
      title: 'Tactile Precision & Actuation',
    },
  },
  'modular-design': {
    slug: 'modular-design',
    title: 'Modular Multi-Gang Architecture',
    subtitle: 'Standardized 1-gang, 2-gang, and 3-gang snap-fit configurations',
    badge: 'Form Factor & Design',
    overview:
      'Architecture requires visual consistency across varied room layouts. Smart Switch features an interchangeable modular chassis that allows 1-gang, 2-gang, and 3-gang configurations to share identical plate profiles and depth.',
    engineeringDetails: [
      {
        heading: 'Screwless Snap Faceplates',
        description:
          'Concealed sub-frames screw securely into standard wall boxes, while the decorative architectural faceplate snaps cleanly into place with zero visible mounting hardware.',
      },
      {
        heading: 'Standard European & North American Cutouts',
        description:
          'Engineered to mount directly into standard 86mm square and rectangular junction boxes with a minimum internal cavity depth of 35mm.',
      },
      {
        heading: 'Curated Architectural Finishes',
        description:
          'Available in Matte Charcoal, Architectural White, and Brushed Aluminum to match high-end plumbing, millwork hardware, and door trims.',
      },
    ],
    specSheet: [
      { label: 'Standard Plate Width', value: '86 mm' },
      { label: 'Standard Plate Height', value: '86 mm' },
      { label: 'Wall Box Cavity Depth', value: '35 mm Minimum (47 mm Recommended)' },
      { label: 'Mounting Screw Centers', value: '60.3 mm Standard Spacing' },
    ],
    relatedFeature: {
      slug: 'smart-ecosystem',
      title: 'Open Smart Ecosystem & Connectivity',
    },
  },
  'smart-ecosystem': {
    slug: 'smart-ecosystem',
    title: 'Open Connectivity & Local Fail-Safe',
    subtitle: 'Autonomous local switching with open cross-platform smart home readiness',
    badge: 'System Architecture',
    overview:
      'A smart home product should never introduce single points of failure. Smart Switch combines physical relay autonomy with open connectivity protocols, ensuring uninterrupted operation regardless of network status.',
    engineeringDetails: [
      {
        heading: 'Local Isolated Micro-Relay',
        description:
          'The physical switch rocker actuates the electrical relay directly on the circuit board without routing through cloud servers or home Wi-Fi. Lights always turn on instantly.',
      },
      {
        heading: 'Matter Protocol Vision',
        description:
          'Engineered for the Matter smart home standard, enabling direct local communication across Apple Home, Google Home, and Amazon Alexa without proprietary bridges.',
      },
      {
        heading: 'No Forced Cloud Lock-In',
        description:
          'Full physical functionality and basic scheduling remain accessible locally. We never require paid monthly subscriptions to toggle a light switch on your wall.',
      },
    ],
    specSheet: [
      { label: 'Local Switching Latency', value: '< 25 milliseconds' },
      { label: 'Wireless Protocol Readiness', value: 'Matter over Wi-Fi / BLE Commissioning' },
      { label: 'Firmware Update Delivery', value: 'Secure Encrypted Local OTA' },
      { label: 'Cloud Dependency', value: 'None (100% Local Fail-Safe)' },
    ],
    relatedFeature: {
      slug: 'electrical-safety',
      title: 'Electrical Safety & Protection',
    },
  },
};

export function generateStaticParams() {
  return Object.keys(FEATURE_DATA).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const feat = FEATURE_DATA[params.slug];
  if (!feat) return { title: 'Feature Not Found' };
  return {
    title: `${feat.title} — Smart Switch`,
    description: feat.subtitle,
  };
}

export default function FeatureSlugPage({ params }: { params: { slug: string } }) {
  const feature = FEATURE_DATA[params.slug];

  if (!feature) {
    notFound();
  }

  return (
    <div className="section" style={{ paddingTop: '60px' }}>
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            <Link href={ROUTES.HOME} style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <span>/</span>
            <Link href={ROUTES.FEATURES} style={{ color: 'var(--text-secondary)' }}>Features</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)' }}>{feature.title}</span>
          </div>

          <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
            {feature.badge}
          </div>
          <h1 className="heading-h1" style={{ marginBottom: '16px' }}>
            {feature.title}
          </h1>
          <p className="text-lead" style={{ maxWidth: '780px' }}>
            {feature.subtitle}
          </p>
        </div>

        {/* Feature Overview Callout */}
        <div className="card" style={{ padding: '36px', marginBottom: '56px', background: 'var(--bg-surface)' }}>
          <h2 className="heading-h3" style={{ marginBottom: '12px', color: 'var(--accent-primary)' }}>
            Engineering Intent
          </h2>
          <p className="text-body" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
            {feature.overview}
          </p>
        </div>

        {/* Deep Dive Pillars */}
        <div style={{ marginBottom: '64px' }}>
          <h2 className="heading-h2" style={{ marginBottom: '32px' }}>
            Key Engineering Pillars
          </h2>
          <div className="grid-3">
            {feature.engineeringDetails.map((pillar, idx) => (
              <div key={idx} className="card">
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '12px' }}>
                  0{idx + 1}
                </div>
                <h3 className="heading-h3" style={{ marginBottom: '12px' }}>
                  {pillar.heading}
                </h3>
                <p className="text-body" style={{ fontSize: '0.925rem', lineHeight: 1.6 }}>
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Data Sheet */}
        <div style={{ marginBottom: '64px' }}>
          <h2 className="heading-h2" style={{ marginBottom: '24px' }}>
            Technical Tolerances & Parameters
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
            {feature.specSheet.map((spec, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '16px 24px',
                  borderBottom: idx === feature.specSheet.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                  fontSize: '0.925rem',
                }}
              >
                <span style={{ color: 'var(--text-secondary)' }}>{spec.label}</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation & CTA */}
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
              Next Feature Deep Dive
            </span>
            <Link
              href={ROUTES.FEATURES_SLUG(feature.relatedFeature.slug)}
              style={{ color: 'var(--accent-primary)', fontWeight: 700, fontSize: '1.05rem' }}
            >
              {feature.relatedFeature.title} →
            </Link>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href={ROUTES.REQUEST_DEMO} className="btn btn-primary">
              Request Hardware Demo
            </Link>
            <Link href={ROUTES.FEATURES} className="btn btn-outline">
              Back to All Features
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
