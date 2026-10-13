import type { ReactNode } from 'react';
import { ProvisionalBadge } from './ProvisionalBadge';

/** Shows a legal fact, or a "To be confirmed" badge while the owner has not supplied it (see config/legal.ts). */
export function Fill({ value }: { value?: ReactNode }) {
  return <>{value || <ProvisionalBadge />}</>;
}
