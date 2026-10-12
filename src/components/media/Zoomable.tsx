'use client';

import { useState, type ReactNode } from 'react';
import { Expand } from '@/components/art/Icons';
import type { MediaItem } from '@/types';
import { Lightbox } from './Lightbox';

/** Wraps a visual so clicking it opens it large in the lightbox. */
export function Zoomable({ item, group, children, className = '' }: { item: MediaItem; group?: readonly MediaItem[]; children: ReactNode; className?: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const items = group ?? [item];
  const start = Math.max(0, items.findIndex((i) => i.caption === item.caption));
  return (
    <>
      <div className={`zoomable ${className}`.trim()}>
        {children}
        <button type="button" className="zoomable__btn" onClick={() => setIndex(start)} aria-label={`Enlarge image: ${item.caption}`} aria-haspopup="dialog">
          <span className="zoomable__hint"><Expand /> Enlarge</span>
        </button>
      </div>
      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </>
  );
}
