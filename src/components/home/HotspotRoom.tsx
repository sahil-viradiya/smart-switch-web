'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SceneArt } from '@/components/art/SceneArt';
import { ArrowRight } from '@/components/art/Icons';
import type { Hotspot } from '@/content/home';

/** Click a point on the room to see what it shows. Fully keyboard accessible. */
export function HotspotRoom({ hotspots }: { hotspots: readonly Hotspot[] }) {
  const [activeId, setActiveId] = useState(hotspots[0]?.id);
  const active = hotspots.find((h) => h.id === activeId) ?? hotspots[0]!;

  return (
    <div className="hr">
      <div className="hr__stage">
        <SceneArt scene="living" />
        {hotspots.map((h) => (
          <button
            type="button"
            key={h.id}
            className={`hr__dot${h.id === active.id ? ' is-active' : ''}`}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            aria-pressed={h.id === active.id}
            aria-label={h.title}
            onClick={() => setActiveId(h.id)}
          >
            <span className="hr__pulse" />
          </button>
        ))}
      </div>

      <div className="hr__info" aria-live="polite">
        <ul className="hr__list" role="list">
          {hotspots.map((h, i) => (
            <li key={h.id}>
              <button type="button" className={h.id === active.id ? 'is-active' : ''} onClick={() => setActiveId(h.id)}>
                <span aria-hidden="true">0{i + 1}</span> {h.title}
              </button>
            </li>
          ))}
        </ul>
        <div className="hr__card" key={active.id}>
          <h3 className="h-sub">{active.title}</h3>
          <p className="lead">{active.text}</p>
          <Link href={active.link.href} className="text-link">{active.link.label} <ArrowRight /></Link>
        </div>
      </div>
    </div>
  );
}
