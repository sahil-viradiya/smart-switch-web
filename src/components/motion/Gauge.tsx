'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/scroll';
import { Counter } from './Counter';

interface Props {
  value: number;
  max: number;
  unit: string;
  label: string;
  note?: string;
}

/** Semicircle gauge that sweeps to `value` when scrolled into view. */
export function Gauge({ value, max, unit, label, note }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ratio = Math.min(1, value / max);
  return (
    <div ref={ref} className={`gauge${on ? ' is-on' : ''}`} style={{ ['--gauge' as string]: ratio }}>
      <svg viewBox="0 0 220 130" role="img" aria-label={`${label}: ${value} ${unit} of ${max}`}>
        <path className="gauge__track" pathLength={1} d="M20 110a90 90 0 0 1 180 0" />
        <path className="gauge__fill" pathLength={1} d="M20 110a90 90 0 0 1 180 0" />
      </svg>
      <div className="gauge__read">
        <strong><Counter to={value} />{unit}</strong>
        <span>{label}</span>
      </div>
      <div className="gauge__scale" aria-hidden="true"><span>0</span><span>{max}</span></div>
      {note && <p className="small">{note}</p>}
    </div>
  );
}
