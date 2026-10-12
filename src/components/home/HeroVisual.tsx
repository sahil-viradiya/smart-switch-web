'use client';

import { useEffect, useRef, useState } from 'react';
import { SceneArt, type SceneName } from '@/components/art/SceneArt';
import { motion } from '@/theme';
import { Lightbox } from '@/components/media/Lightbox';
import { GALLERY } from '@/content/home';
import type { MediaItem } from '@/types';

const HERO_MEDIA = GALLERY.filter((g): g is Extract<MediaItem, { kind: 'scene' }> => g.kind === 'scene');

const SCENES: { name: SceneName; label: string }[] = [
  { name: 'living', label: 'Living Room' },
  { name: 'bedroom', label: 'Bedroom' },
  { name: 'studio', label: 'Studio' },
];

/**
 * Hero visual: house outline that draws itself, arched frame with cross-fading
 * placeholder scenes, pulsing hotspots and glass caption chips. Rotation pauses
 * when the tab is hidden, the hero is off-screen, or reduced motion is requested.
 */
export function HeroVisual() {
  const [index, setIndex] = useState(0);
  const [boxIndex, setBoxIndex] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true;
    let timer: ReturnType<typeof setInterval> | undefined;

    const stop = () => { if (timer) clearInterval(timer); timer = undefined; };
    const start = () => {
      stop();
      if (reduce.matches || document.hidden || !visible) return;
      timer = setInterval(() => setIndex((i) => (i + 1) % SCENES.length), motion.heroHoldMs);
    };

    const io = new IntersectionObserver(([entry]) => { visible = !!entry?.isIntersecting; start(); });
    if (rootRef.current) io.observe(rootRef.current);
    document.addEventListener('visibilitychange', start);
    reduce.addEventListener('change', start);
    start();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', start);
      reduce.removeEventListener('change', start);
    };
  }, []);

  const current = SCENES[index]!;

  const onPointer = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };
  const openBox = () => { const i = HERO_MEDIA.findIndex((m) => m.scene === current.name); setBoxIndex(i < 0 ? 0 : i); };

  return (
    <div className="hero__visual" ref={rootRef} onPointerMove={onPointer}>
      <svg className="hero__house" viewBox="0 0 100 112" preserveAspectRatio="none" aria-hidden="true">
        <path pathLength="1" d="M6 104V58L50 6l44 52v46" />
        <path pathLength="1" d="M72 26V12h10v26" />
      </svg>

      <div className="hero__arch" role="button" tabIndex={0} aria-haspopup="dialog" aria-label={`Enlarge scene: ${current.label}`} onClick={openBox} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openBox(); } }}>
        {SCENES.map((s, i) => (
          <div key={s.name} className={`scene${i === index ? ' is-current' : ''}`} aria-hidden={i !== index}>
            <SceneArt scene={s.name} />
          </div>
        ))}
        <span className="hotspot" style={{ left: '55%', top: '15%' }}>
          <span className="hotspot__dot" />
          <span className="hotspot__label">Dimmable lighting</span>
        </span>
        <span className="hotspot hotspot--left" style={{ left: '82%', top: '49%' }}>
          <span className="hotspot__dot" />
          <span className="hotspot__label">Tactile paddles</span>
        </span>
        <span className="hotspot" style={{ left: '30%', top: '73%' }}>
          <span className="hotspot__dot" />
          <span className="hotspot__label">Local fail-safe</span>
        </span>
      </div>

      <div className="hero__chip hero__chip--status glass-chip">
        <small>Smart Switch</small>
        <strong>Flush with the wall</strong>
      </div>
      <div className="hero__chip hero__chip--scene glass-chip" aria-live="polite">
        <small>Showing</small>
        <strong>{current.label}</strong>
      </div>
      <Lightbox items={HERO_MEDIA} index={boxIndex} onClose={() => setBoxIndex(null)} onIndex={setBoxIndex} />
    </div>
  );
}
