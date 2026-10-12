import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight } from '@/components/art/Icons';
import type { Cta } from '@/config';

type Variant = 'gold' | 'ghost' | 'white' | 'dark' | 'outline-dark';

interface Props {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: 'md' | 'sm';
  arrow?: boolean;
  block?: boolean;
  className?: string;
}

export function ButtonLink({ href, children, variant = 'gold', size = 'md', arrow = false, block = false, className = '' }: Props) {
  const cls = ['btn', `btn--${variant}`, size === 'sm' && 'btn--sm', block && 'btn--block', className].filter(Boolean).join(' ');
  return (
    <Link href={href} className={cls}>
      {children}
      {arrow && <ArrowRight className="btn__arrow" />}
    </Link>
  );
}

/** Header-style outlined pill with a gold arrow disc. */
export function PillDiscLink({ cta }: { cta: Cta }) {
  return (
    <Link href={cta.href} className="btn btn--pill-disc">
      {cta.label}
      <span className="disc"><ArrowUpRight /></span>
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-link">
      {children}
      <ArrowRight />
    </Link>
  );
}
