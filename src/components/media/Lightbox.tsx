'use client';

import { useCallback, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Close } from '@/components/art/Icons';
import type { MediaItem } from '@/types';
import { MediaView } from './MediaView';

interface Props {
  items: readonly MediaItem[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}

/**
 * Accessible image viewer built on <dialog>: focus is trapped and restored, Esc closes,
 * ← / → navigate, clicking the backdrop closes.
 */
export function Lightbox({ items, index, onClose, onIndex }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;
  const count = items.length;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) { d.showModal(); document.body.style.overflow = 'hidden'; }
    if (!open && d.open) { d.close(); document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const go = useCallback((d: number) => { if (index !== null) onIndex((index + d + count) % count); }, [index, count, onIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go]);

  const item = index !== null ? items[index] : null;

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={item ? item.caption : 'Image viewer'}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
    >
      {item && (
        <div className="lightbox__body">
          <button type="button" className="lightbox__btn lightbox__close" onClick={onClose} aria-label="Close image viewer"><Close /></button>
          <div className="lightbox__media" key={index}><MediaView item={item} /></div>
          <div className="lightbox__bar">
            <p className="lightbox__caption">{item.caption}</p>
            {count > 1 && (
              <div className="lightbox__nav">
                <button type="button" className="lightbox__btn" onClick={() => go(-1)} aria-label="Previous image"><ArrowLeft /></button>
                <span aria-live="polite">{(index ?? 0) + 1} / {count}</span>
                <button type="button" className="lightbox__btn" onClick={() => go(1)} aria-label="Next image"><ArrowRight /></button>
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
