'use client';

import { useRef, type ReactNode } from 'react';
import { motion } from '@/theme';
import { prefersReducedMotion } from '@/lib/scroll';

/** Gentle 3D tilt that follows the pointer (fine pointers only, never with reduced motion). */
export function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse' || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${(x * motion.tiltMaxDeg * 2).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(-y * motion.tiltMaxDeg * 2).toFixed(2)}deg`);
    el.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`);
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div ref={ref} className={`tilt ${className}`.trim()} onPointerMove={move} onPointerLeave={leave}>
      <div className="tilt__inner">{children}</div>
    </div>
  );
}
