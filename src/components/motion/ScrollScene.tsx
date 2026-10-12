'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { clamp01, prefersReducedMotion } from '@/lib/scroll';

interface Props {
  children: ReactNode;
  /** Total scroll distance in viewport-heights (including the pinned viewport). */
  height?: number;
  className?: string;
  id?: string;
  label: string;
  /** Called (rAF-throttled) with progress 0..1. Use for state that must change at thresholds. */
  onProgress?: (p: number) => void;
  /** Receives the scene element, e.g. to scroll to a given progress. */
  sceneRef?: React.MutableRefObject<HTMLElement | null>;
}

/**
 * A pinned, scroll-scrubbed scene. The outer element is tall; the inner stage is
 * `position: sticky`. Progress through the outer element is written to the CSS
 * variable `--p` (0..1) so CSS can scrub transforms with `calc(var(--p) * ...)`.
 * Reduced motion: no pinning, `--p` is fixed at 1 (the finished state).
 */
export function ScrollScene({ children, height = 300, className = '', id, label, onProgress, sceneRef }: Props) {
  const ref = useRef<HTMLElement>(null);
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (sceneRef) sceneRef.current = el;

    if (prefersReducedMotion()) {
      el.classList.add('is-static');
      el.style.setProperty('--p', '1');
      cb.current?.(1);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? clamp01(-r.top / total) : 0;
      el.style.setProperty('--p', p.toFixed(4));
      el.dataset.state = p <= 0 ? 'before' : p >= 1 ? 'after' : 'active';
      cb.current?.(p);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sceneRef]);

  return (
    <section ref={ref} id={id} aria-label={label} className={`scene-pin ${className}`.trim()} style={{ ['--scene-h' as string]: height } as CSSProperties}>
      <div className="scene-pin__sticky">{children}</div>
    </section>
  );
}
