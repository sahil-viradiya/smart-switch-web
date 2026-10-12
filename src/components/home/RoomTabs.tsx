'use client';

import Link from 'next/link';
import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { SceneArt } from '@/components/art/SceneArt';
import { ArrowRight } from '@/components/art/Icons';
import { demoIntentHref } from '@/config';
import type { RoomTab } from '@/content/rooms';

/** Room-by-room tabs. Arrow keys move between tabs; the scene cross-fades. */
export function RoomTabs({ rooms }: { rooms: readonly RoomTab[] }) {
  const uid = useId();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + rooms.length) % rooms.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const room = rooms[active]!;

  return (
    <div className="rt">
      <div className="rt__tabs" role="tablist" aria-label="Rooms" onKeyDown={onKey}>
        {rooms.map((r, i) => (
          <button
            key={r.id}
            ref={(el) => { tabs.current[i] = el; }}
            type="button"
            role="tab"
            id={`${uid}-tab-${r.id}`}
            aria-selected={i === active}
            aria-controls={`${uid}-panel`}
            tabIndex={i === active ? 0 : -1}
            className={i === active ? 'is-active' : ''}
            onClick={() => setActive(i)}
          >
            <span aria-hidden="true">0{i + 1}</span> {r.name}
          </button>
        ))}
      </div>

      <div className="rt__panel" role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${room.id}`}>
        <div className="rt__scene">
          {rooms.map((r, i) => (
            <div key={r.id} className={`rt__layer${i === active ? ' is-current' : ''}`} aria-hidden={i !== active}><SceneArt scene={r.scene} /></div>
          ))}
        </div>
        <div className="rt__copy" key={room.id}>
          <h3 className="h-section">{room.headline}</h3>
          <p className="lead">{room.text}</p>
          <dl className="rt__suggest">
            <div><dt>Suggested plate</dt><dd>{room.suggestion.plate}</dd></div>
            <div><dt>Suggested finish</dt><dd>{room.suggestion.finish}</dd></div>
          </dl>
          <ul className="rt__tips">{room.tips.map((t) => <li key={t}>{t}</li>)}</ul>
          <div className="row">
            <Link href={demoIntentHref('homeowner')} className="btn btn--gold btn--sm">Plan this room <ArrowRight className="btn__arrow" /></Link>
            <Link href={room.link.href} className="text-link">{room.link.label} <ArrowRight /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
