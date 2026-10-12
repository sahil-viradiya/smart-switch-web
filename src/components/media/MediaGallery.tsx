'use client';

import { useState } from 'react';
import { Expand } from '@/components/art/Icons';
import type { MediaItem } from '@/types';
import { Lightbox } from './Lightbox';
import { MediaView } from './MediaView';

/** Mosaic of images. Click (or press Enter on) any tile to open it in the lightbox. */
export function MediaGallery({ items }: { items: readonly MediaItem[] }) {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <>
      <ul className="mosaic">
        {items.map((item, i) => (
          <li key={`${item.caption}-${i}`} className={`mosaic__item mosaic__item--${(i % 6) + 1}`}>
            <button type="button" className="mosaic__btn" onClick={() => setIndex(i)} aria-label={`Open image: ${item.caption}`} aria-haspopup="dialog">
              <MediaView item={item} thumb />
              <span className="mosaic__cap"><span>{item.caption}</span><Expand /></span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </>
  );
}
