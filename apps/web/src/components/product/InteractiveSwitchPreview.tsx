'use client';

import { useState } from 'react';
import { GangVariant, FinishColor } from '@smart-switch/shared-types';

interface VariantConfig {
  id: GangVariant;
  name: string;
  gangs: number;
  widthMm: number;
  heightMm: number;
  description: string;
}

const VARIANTS: VariantConfig[] = [
  {
    id: '1_GANG',
    name: '1-Gang Master',
    gangs: 1,
    widthMm: 86,
    heightMm: 86,
    description: 'Single high-load mechanical actuator with centering tactile response and subtle status LED.',
  },
  {
    id: '2_GANG',
    name: '2-Gang Dual',
    gangs: 2,
    widthMm: 86,
    heightMm: 86,
    description: 'Two independent switching channels in a compact single-box standard footprint.',
  },
  {
    id: '3_GANG',
    name: '3-Gang Multi-Way',
    gangs: 3,
    widthMm: 86,
    heightMm: 86,
    description: 'Triple circuit controls ideal for entryways, kitchen lighting, and multi-zone spaces.',
  },
  {
    id: 'DIMMER',
    name: 'Rotary / Touch Dimmer',
    gangs: 1,
    widthMm: 86,
    heightMm: 86,
    description: 'Smooth phase-cut dimming with discrete step memory and micro-LED intensity level ring.',
  },
];

const FINISHES: { id: FinishColor; name: string; bg: string; border: string; buttonBg: string }[] = [
  {
    id: 'MATTE_CHARCOAL',
    name: 'Matte Charcoal',
    bg: '#141A29',
    border: '#27334D',
    buttonBg: '#1A2338',
  },
  {
    id: 'ARCHITECTURAL_WHITE',
    name: 'Architectural White',
    bg: '#F1F5F9',
    border: '#CBD5E1',
    buttonBg: '#FFFFFF',
  },
  {
    id: 'BRUSHED_ALUMINUM',
    name: 'Brushed Aluminum',
    bg: '#252F40',
    border: '#475569',
    buttonBg: '#334155',
  },
];

export function InteractiveSwitchPreview() {
  const [selectedVariant, setSelectedVariant] = useState<GangVariant>('2_GANG');
  const [selectedFinish, setSelectedFinish] = useState<FinishColor>('MATTE_CHARCOAL');
  const [switchStates, setSwitchStates] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: true,
  });

  const currentVariant = VARIANTS.find((v) => v.id === selectedVariant) || VARIANTS[0]!;
  const currentFinish = FINISHES.find((f) => f.id === selectedFinish) || FINISHES[0]!;

  const toggleSwitch = (index: number) => {
    setSwitchStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const isLight = selectedFinish === 'ARCHITECTURAL_WHITE';

  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        padding: '36px',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      {/* Controls Bar: Variants and Finishes */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '36px',
          paddingBottom: '24px',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        {/* Gang Tabs */}
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Gang Configuration
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {VARIANTS.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariant(v.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  background: selectedVariant === v.id ? 'var(--accent-primary)' : 'var(--bg-elevated)',
                  color: selectedVariant === v.id ? '#042116' : 'var(--text-secondary)',
                  borderColor: selectedVariant === v.id ? 'var(--accent-primary)' : 'var(--border-subtle)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>

        {/* Finish Selector */}
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Architectural Finish
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {FINISHES.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFinish(f.id)}
                title={f.name}
                aria-label={`Select ${f.name} finish`}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: f.bg,
                  border: '2px solid',
                  borderColor: selectedFinish === f.id ? 'var(--accent-primary)' : f.border,
                  cursor: 'pointer',
                  boxShadow: selectedFinish === f.id ? '0 0 10px var(--accent-primary-glow)' : 'none',
                  transition: 'all var(--transition-fast)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Switch Display Stage */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '40px',
          alignItems: 'center',
        }}
        className="preview-grid"
      >
        {/* Interactive Wall Switch Plate */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 80%)',
          }}
        >
          {/* Wall Plate Frame */}
          <div
            style={{
              width: '260px',
              height: '260px',
              background: currentFinish.bg,
              border: `2px solid ${currentFinish.border}`,
              borderRadius: '24px',
              padding: '24px',
              boxShadow: `0 25px 50px -12px rgba(0,0,0,0.8), 0 0 0 1px ${currentFinish.border}`,
              display: 'flex',
              gap: '12px',
              position: 'relative',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Gang Buttons */}
            {Array.from({ length: currentVariant.gangs }).map((_, idx) => {
              const isOn = !!switchStates[idx];
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleSwitch(idx)}
                  aria-label={`Toggle gang ${idx + 1}`}
                  aria-pressed={isOn}
                  style={{
                    flex: 1,
                    height: '100%',
                    background: currentFinish.buttonBg,
                    border: `1px solid ${currentFinish.border}`,
                    borderRadius: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 8px',
                    cursor: 'pointer',
                    boxShadow: isOn
                      ? 'inset 0 3px 6px rgba(0,0,0,0.5), 0 1px 2px rgba(255,255,255,0.1)'
                      : '0 4px 10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
                    transform: isOn ? 'translateY(1px)' : 'translateY(0)',
                    transition: 'all 120ms ease-out',
                  }}
                >
                  {/* Subtle top indicator bar */}
                  <span
                    style={{
                      width: '20px',
                      height: '2px',
                      borderRadius: '2px',
                      background: isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)',
                    }}
                  />

                  {/* Micro-illumination LED dot */}
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: isOn ? 'var(--accent-primary)' : isLight ? '#94A3B8' : '#334155',
                      boxShadow: isOn ? '0 0 10px #10B981, 0 0 20px #10B981' : 'none',
                      transition: 'all 150ms ease',
                    }}
                  />

                  {/* Actuator label */}
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      color: isLight ? '#64748B' : '#94A3B8',
                      textTransform: 'uppercase',
                    }}
                  >
                    G{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
            Click actuators to toggle tactile state & LED indicators
          </div>
        </div>

        {/* Technical Data & Active Specs */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: 'var(--radius-full)', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>
            Interactive Hardware Inspection
          </div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
            {currentVariant.name}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
            {currentVariant.description}
          </p>

          {/* Quick Specs Table */}
          <div
            style={{
              background: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Dimensions</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{currentVariant.widthMm}mm × {currentVariant.heightMm}mm × 35mm depth</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Electrical Rating</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>110V–240V AC, 10A max per gang</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Neutral Wire</span>
              <span style={{ fontWeight: 600, color: 'var(--accent-amber)' }}>Required for standard models</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Active Finish</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{currentFinish.name}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
