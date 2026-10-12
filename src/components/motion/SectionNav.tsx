'use client';

import { useEffect, useState } from 'react';
import { scrollToId } from '@/lib/scroll';

export interface SectionLink { id: string; label: string }

/**
 * Dot navigation that follows the scroll position and jumps to a section on click.
 * The active section is the last one whose top has passed 40% of the viewport height.
 */
export function SectionNav({ sections }: { sections: readonly SectionLink[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let current = sections[0]?.id ?? '';
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      setActive(current);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
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
