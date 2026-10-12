import type { ReactNode } from 'react';
import { Alert } from '@/components/art/Icons';

export function Notice({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="notice" role="note">
      <Alert />
      <div>
        <strong>{title}</strong>
        <p>{children}</p>
      </div>
    </div>
  );
}
