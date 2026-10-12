import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface Props {
  eyebrow?: string;
  title: [string, string?];
  lead?: string;
  action?: ReactNode;
  center?: boolean;
  as?: 'h1' | 'h2';
}

/** Splits a line into words so each can slide up in turn (pure CSS, triggered by <Reveal/>). */
export function Words({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span className="word" key={`${w}-${i}`} style={{ ['--w' as string]: start + i }}>
          <span>{w}{'\u00a0'}</span>
        </span>
      ))}
    </>
  );
}

export function SectionHead({ eyebrow, title, lead, action, center = false, as: H = 'h2' }: Props) {
  const first = title[0].split(' ').length;
  return (
    <Reveal className={`sec-head${center ? ' sec-head--center' : ''}`}>
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <H className="h-section" aria-label={[title[0], title[1]].filter(Boolean).join(' ')}>
          <span aria-hidden="true">
            <Words text={title[0]} />
            {title[1] && <span className="dim-line"><Words text={title[1]} start={first} /></span>}
          </span>
        </H>
        {lead && <p className="lead">{lead}</p>}
      </div>
      {action}
    </Reveal>
  );
}
