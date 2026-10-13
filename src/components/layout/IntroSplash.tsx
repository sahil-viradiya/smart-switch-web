'use client';

import { useEffect, useState } from 'react';
import { LogoMark } from '@/components/art/Logo';
import { STORAGE_KEYS, legalName } from '@/config';
import { motion } from '@/theme';

const KEY = STORAGE_KEYS.introSeen;

/**
 * One-time brand intro. Safeguards (mirroring good practice from the reference study):
 * home page only, once per session, never for reduced motion, skipped on reloads /
 * hash links, dismissible by any input, and a hard timeout so it can never trap the page.
 */
export function IntroSplash() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (window.location.pathname !== '/') return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      if (sessionStorage.getItem(KEY) || window.location.hash || (nav && nav.type !== 'navigate')) return;
      sessionStorage.setItem(KEY, '1');
    } catch {
      return;
    }
    setShow(true);
    const hide = () => setShow(false);
    const timer = setTimeout(hide, motion.introMs + 100);
    window.addEventListener('keydown', hide, { once: true });
    window.addEventListener('pointerdown', hide, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', hide);
      window.removeEventListener('pointerdown', hide);
    };
  }, []);

  if (!show) return null;
  return (
    <div className="intro" aria-hidden="true">
      <span className="intro__ring" />
      <div className="intro__brand">
        <LogoMark />
        <p>{legalName()}</p>
      </div>
    </div>
  );
}
