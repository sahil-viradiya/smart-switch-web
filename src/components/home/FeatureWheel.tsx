'use client';

import { useRef, useState } from 'react';
import { ScrollScene } from '@/components/motion/ScrollScene';
import { ICONS, type IconName } from '@/components/art/Icons';
import { scrollToSceneProgress } from '@/lib/scroll';

interface Feature { title: string; text: string; icon: IconName }

/**
 * Pinned feature wheel: scrolling rotates the cards along an arc and updates the detail panel.
 * Clicking a card or a step jumps the page to that point of the scene.
 */
export function FeatureWheel({ features }: { features: readonly Feature[] }) {
  const n = features.length;
  const [active, setActive] = useState(0);
  const sceneRef = useRef<HTMLElement | null>(null);
  const step = 28; // degrees between cards

  const jump = (i: number) => sceneRef.current && scrollToSceneProgress(sceneRef.current, n > 1 ? i / (n - 1) : 0);
  const current = features[active] ?? features[0]!;
  const CurrentIcon = ICONS[current.icon];

  return (
    <ScrollScene id="features" label="Key features" height={100 + n * 85} className="fw" sceneRef={sceneRef} onProgress={(p) => setActive(Math.round(p * (n - 1)))}>
      <div className="container fw__grid" style={{ ['--n1' as string]: n - 1, ['--step' as string]: `${step}deg` } as React.CSSProperties}>
        <div className="fw__copy">
          <span className="eyebrow">Key features</span>
          <h2 className="h-section">Five details. <span className="dim-line">One switch.</span></h2>
          <div className="fw__panel" key={active} aria-live="polite">
            <span className="fw__icon"><CurrentIcon size={26} /></span>
            <p className="fw__count">0{active + 1} / 0{n}</p>
            <h3 className="h-sub">{current.title}</h3>
            <p className="lead">{current.text}</p>
          </div>
          <ol className="fw__steps" aria-label="Features">
            {features.map((f, i) => (
              <li key={f.title}>
                <button type="button" className={i === active ? 'is-active' : ''} aria-current={i === active ? 'true' : undefined} onClick={() => jump(i)}>
                  <span aria-hidden="true">0{i + 1}</span>
                  <span className="fw__step-label">{f.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="fw__wheel" aria-hidden="true">
          <div className="fw__ring">
            {features.map((f, i) => {
              const Icon = ICONS[f.icon];
              return (
                <button type="button" tabIndex={-1} key={f.title} className={`fw__card${i === active ? ' is-active' : ''}`} style={{ ['--i' as string]: i } as React.CSSProperties} onClick={() => jump(i)}>
                  <span className="fw__card-icon"><Icon size={22} /></span>
                  <strong>{f.title}</strong>
                  <span className="fw__card-num">0{i + 1}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </ScrollScene>
  );
}
