'use client';

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  variant?: 'up' | 'scale' | 'fade' | 'clip';
  className?: string;
}

/**
 * Scroll-reveal wrapper. Hidden state only applies when <html> has `.js`
 * (see layout), and is skipped for reduced motion, so content never stays invisible.
 */
export function Reveal({ children, as: Tag = 'div', delay = 0, variant = 'up', className = '' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const mod = variant === 'scale' ? ' reveal--scale' : variant === 'fade' ? ' reveal--fade' : variant === 'clip' ? ' reveal--clip' : '';
  return (
    <Tag ref={ref} className={`reveal${mod} ${className}`.trim()} style={{ ['--d' as string]: `${delay}s` } as CSSProperties}>
      {children}
    </Tag>
  );
}
