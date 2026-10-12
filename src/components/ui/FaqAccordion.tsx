'use client';

import { useId, useMemo, useState } from 'react';
import { FAQ_CATEGORIES, FAQ_ITEMS, type FaqItem } from '@/content/faq';
import { Search } from '@/components/art/Icons';

interface Props {
  items?: readonly FaqItem[];
  filterable?: boolean;
}

export function FaqAccordion({ items = FAQ_ITEMS, filterable = true }: Props) {
  const uid = useId();
  const [category, setCategory] = useState<string>('ALL');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (i) => (category === 'ALL' || i.category === category) && (!q || i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q)),
    );
  }, [items, category, query]);

  return (
    <div>
      {filterable && (
        <div className="faq-tools">
          <div className="pills" role="group" aria-label="Filter questions by category">
            {FAQ_CATEGORIES.map((c) => (
              <button key={c.id} type="button" className="pill" aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>
                {c.label}
              </button>
            ))}
          </div>
          <div className="faq-search">
            <Search />
            <label htmlFor={`${uid}-q`} className="sr-only">Search questions</label>
            <input id={`${uid}-q`} className="input" type="search" placeholder="Search questions" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </div>
      )}

      <div className="accordion">
        {visible.map((item) => {
          const isOpen = open === item.id;
          return (
            <div className="accordion__item" key={item.id}>
              <h3>
                <button type="button" className="accordion__trigger" aria-expanded={isOpen} aria-controls={`${uid}-${item.id}`} id={`${uid}-${item.id}-t`} onClick={() => setOpen(isOpen ? null : item.id)}>
                  {item.question}
                  <span className="accordion__icon" aria-hidden="true" />
                </button>
              </h3>
              <div className={`accordion__panel${isOpen ? ' is-open' : ''}`} id={`${uid}-${item.id}`} role="region" aria-labelledby={`${uid}-${item.id}-t`}>
                <div><p>{item.answer}</p></div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">{visible.length} questions shown</p>
      {visible.length === 0 && <p className="faq-empty">No questions match your search. Try another term or contact us.</p>}
    </div>
  );
}
