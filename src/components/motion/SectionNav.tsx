'use client';

import { useEffect, useState } from 'react';
import { scrollToId } from '@/lib/scroll';

export interface SectionLink { id: string; label: string }

/** Dot navigation that follows the scroll position and jumps to a section on click. */
export function SectionNav({ sections }: { sections: readonly SectionLink[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0, 0.1, 0.3, 0.6] },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav className="section-nav" aria-label="Page sections">
      <ul>
        {sections.map((s) => (
          <li key={s.id}>
            <button type="button" className={s.id === active ? 'is-active' : ''} aria-current={s.id === active ? 'true' : undefined} onClick={() => scrollToId(s.id)}>
              <span className="section-nav__label">{s.label}</span>
              <span className="section-nav__dot" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
