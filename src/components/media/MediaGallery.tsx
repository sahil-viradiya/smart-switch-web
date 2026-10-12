'use client';

import { useState } from 'react';
import { Expand } from '@/components/art/Icons';
import type { MediaItem } from '@/types';
import { Lightbox } from './Lightbox';
import { MediaView } from './MediaView';

/**
 * Tile size for a four-column mosaic, so the grid always ends on a full row for any number of items:
 * the first tile is large (2x2) and the last few are wide (2x1) just enough to fill the final row.
 */
function tileSize(i: number, count: number): 'big' | 'wide' | 'small' {
  if (count < 4) return 'small';
  const wide = (4 - ((4 + (count - 1)) % 4)) % 4;
  if (i === 0) return 'big';
  return i >= count - wide ? 'wide' : 'small';
}

/** Mosaic of images. Click (or press Enter on) any tile to open it in the lightbox. */
export function MediaGallery({ items }: { items: readonly MediaItem[] }) {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <>
      <ul className="mosaic">
        {items.map((item, i) => (
          <li key={`${item.caption}-${i}`} className={`mosaic__item mosaic__item--${tileSize(i, items.length)}`}>
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
