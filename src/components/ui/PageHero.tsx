import Link from 'next/link';
import type { ReactNode } from 'react';
import { ROUTES } from '@/config';

interface Crumb { label: string; href?: string }

interface Props {
  eyebrow: string;
  title: [string, string?];
  lead?: string;
  crumbs?: Crumb[];
  actions?: ReactNode;
  art?: ReactNode;
}

export function PageHero({ eyebrow, title, lead, crumbs, actions, art }: Props) {
  return (
    <section className="sec sec--dark page-hero">
      <div className={`container page-hero__grid${art ? '' : ' page-hero__grid--single'}`}>
        <div className="page-hero__copy">
          {crumbs && (
            <nav aria-label="Breadcrumb">
              <ol className="breadcrumb">
                <li><Link href={ROUTES.HOME}>Home</Link></li>
                {crumbs.map((c, i) => (
                  <li key={c.label} aria-current={i === crumbs.length - 1 ? 'page' : undefined}>
                    <span aria-hidden="true">/ </span>
                    {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <span className="eyebrow eyebrow--mark">{eyebrow}</span>
          <h1 className="h-page">
            {title[0]}
            {title[1] && <span className="dim-line">{title[1]}</span>}
          </h1>
          {lead && <p className="lead">{lead}</p>}
          {actions && <div className="row">{actions}</div>}
        </div>
        {art && <div className="page-hero__art">{art}</div>}
      </div>
    </section>
  );
}
