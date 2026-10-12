'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Check, ArrowRight } from '@/components/art/Icons';
import { CTA } from '@/config';
import type { CheckQuestion } from '@/content/tools';

type Answer = 'yes' | 'no' | 'unsure';

/** Interactive pre-install checklist. A planning aid only — a licensed electrician makes the final call. */
export function WallChecker({ questions }: { questions: readonly CheckQuestion[] }) {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const answered = questions.filter((q) => answers[q.id]).length;
  const complete = answered === questions.length;
  const needsCheck = questions.filter((q) => answers[q.id] && answers[q.id] !== 'yes');
  const pct = Math.round((answered / questions.length) * 100);

  return (
    <div className="wc">
      <div className="wc__bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Checklist progress"><span style={{ width: `${pct}%` }} /></div>
      <ol className="wc__list">
        {questions.map((q, i) => (
          <li key={q.id} className="wc__q">
            <fieldset>
              <legend><span aria-hidden="true">0{i + 1}</span> {q.question}</legend>
              <p className="small">{q.hint}</p>
              <div className="wc__opts">
                {(['yes', 'no', 'unsure'] as const).map((a) => (
                  <label key={a} className={`wc__opt${answers[q.id] === a ? ' is-on' : ''}`}>
                    <input type="radio" name={q.id} value={a} checked={answers[q.id] === a} onChange={() => setAnswers((s) => ({ ...s, [q.id]: a }))} />
                    {a === 'yes' ? 'Yes' : a === 'no' ? 'No' : 'Not sure'}
                  </label>
                ))}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      <div className="wc__result" role="status" aria-live="polite">
        {!complete && <p className="small">Answer all {questions.length} questions to see your result ({answered}/{questions.length}).</p>}
        {complete && needsCheck.length === 0 && (
          <div className="wc__ok">
            <span className="form-success__icon"><Check size={22} /></span>
            <div>
              <h3 className="h-sub">Looks ready to plan.</h3>
              <p className="lead">Share your project and confirm the details with your licensed electrician.</p>
              <Link href={CTA.BOOK_DEMO.href} className="btn btn--gold btn--sm">{CTA.BOOK_DEMO.label} <ArrowRight className="btn__arrow" /></Link>
            </div>
          </div>
        )}
        {complete && needsCheck.length > 0 && (
          <div>
            <h3 className="h-sub">A few things to check first.</h3>
            <ul className="wc__fix">{needsCheck.map((q) => <li key={q.id}><strong>{q.question}</strong><span>{q.fix}</span></li>)}</ul>
            <Link href={CTA.CONTACT_US.href} className="btn btn--outline-dark btn--sm">{CTA.CONTACT_US.label} <ArrowRight className="btn__arrow" /></Link>
          </div>
        )}
        {complete && <button type="button" className="text-link" onClick={() => setAnswers({})}>Start again</button>}
      </div>
    </div>
  );
}
