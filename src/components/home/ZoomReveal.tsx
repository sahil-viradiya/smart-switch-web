import type { ReactNode } from 'react';
import { ScrollScene } from '@/components/motion/ScrollScene';
import { MediaView } from '@/components/media/MediaView';
import type { MediaItem } from '@/types';

/**
 * Pinned scroll scene: a diamond of images rotates and zooms through the viewport
 * while the headline resolves behind it (scrubbed by scroll position).
 */
export function ZoomReveal({ items, children }: { items: readonly MediaItem[]; children: ReactNode }) {
  return (
    <ScrollScene id="reveal" label="Scroll to explore the collection" height={320} className="zoom">
      <div className="zoom__stage">
        <ul className="zoom__tiles" aria-hidden="true">
          {items.slice(0, 4).map((item) => (
            <li className="zoom__tile" key={item.caption}><MediaView item={item} thumb /></li>
          ))}
        </ul>
        <div className="zoom__copy">{children}</div>
        <span className="zoom__hint" aria-hidden="true">Scroll</span>
      </div>
    </ScrollScene>
  );
}
