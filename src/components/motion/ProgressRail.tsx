'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { clamp01 } from '@/lib/scroll';

/** Draws a gold line down a list as the reader scrolls through it. */
export function ProgressRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = clamp01((window.innerHeight * 0.6 - r.top) / r.height);
      el.style.setProperty('--rail', p.toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={ref} className="rail">
      <span className="rail__fill" aria-hidden="true" />
      {children}
    </div>
  );
}
