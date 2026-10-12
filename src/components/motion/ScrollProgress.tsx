'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/scroll';
import { ArrowUp } from '@/components/art/Icons';

/** Thin page-progress line under the header, plus a "back to top" button once scrolled. */
export function ScrollProgress() {
  const bar = useRef<HTMLSpanElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.current?.style.setProperty('--page-p', p.toFixed(4));
      setShowTop(window.scrollY > 700);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <span ref={bar} className="page-progress" aria-hidden="true" />
      <button
        type="button"
        className={`to-top${showTop ? ' is-visible' : ''}`}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })}
      >
        <ArrowUp />
      </button>
    </>
  );
}
