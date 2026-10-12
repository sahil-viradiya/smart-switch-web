'use client';

import { useRef, useState } from 'react';
import { ScrollScene } from '@/components/motion/ScrollScene';
import { scrollToSceneProgress } from '@/lib/scroll';
import type { Layer } from '@/content/layers';

/**
 * Pinned scroll scene: the switch separates into its layers as you scroll.
 * Illustrative only. Click a layer name to jump to it.
 */
export function ExplodedView({ layers }: { layers: readonly Layer[] }) {
  const n = layers.length;
  const [active, setActive] = useState(0);
  const sceneRef = useRef<HTMLElement | null>(null);

  const jump = (i: number) => sceneRef.current && scrollToSceneProgress(sceneRef.current, (i + 0.5) / n);
  const layer = layers[active] ?? layers[0]!;

  return (
    <ScrollScene id="construction" label="Exploded view of the Smart Switch" height={300} className="xv" sceneRef={sceneRef} onProgress={(p) => setActive(Math.min(n - 1, Math.floor(p * n)))}>
      <div className="container xv__grid" style={{ ['--n' as string]: n } as React.CSSProperties}>
        <div className="xv__copy">
          <span className="eyebrow">Construction</span>
          <h2 className="h-section">What is inside</h2>
          <div className="xv__panel" key={layer.id} aria-live="polite">
            <p className="fw__count">0{active + 1} / 0{n}</p>
            <h3 className="h-sub">{layer.name}</h3>
            <p className="lead">{layer.text}</p>
          </div>
          <ol className="fw__steps" aria-label="Layers">
            {layers.map((l, i) => (
              <li key={l.id}>
                <button type="button" className={i === active ? 'is-active' : ''} aria-current={i === active ? 'true' : undefined} onClick={() => jump(i)}>
                  <span aria-hidden="true">0{i + 1}</span><span className="fw__step-label">{l.name}</span>
                </button>
              </li>
            ))}
          </ol>
          <p className="small">Illustration only. See the catalogue for the real panels.</p>
        </div>

        <div className="xv__visual" aria-hidden="true">
          <div className="xv__iso">
            {layers.map((l, i) => (
              <div key={l.id} className={`xv__layer xv__layer--${l.id}${i === active ? ' is-active' : ''}`} style={{ ['--i' as string]: i } as React.CSSProperties}>
                {l.id === 'touch' && (<><span className="xv__pad" /><span className="xv__pad" /><span className="xv__pad" /><span className="xv__pad" /></>)}
                {l.id === 'module' && <span className="xv__trace" />}
                {l.id === 'frame' && (<><span className="xv__screw xv__screw--a" /><span className="xv__screw xv__screw--b" /></>)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollScene>
  );
}
