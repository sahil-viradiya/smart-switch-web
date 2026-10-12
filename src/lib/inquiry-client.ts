import type { InquiryPayload } from '@/lib/validation';

export class InquiryError extends Error {
  constructor(message: string, public status: number, public fieldErrors?: Record<string, string>) {
    super(message);
  }
}

/** Sends an inquiry to /api/inquiries (stored in the Excel sheet). Throws InquiryError on failure. */
export async function submitInquiry(payload: InquiryPayload): Promise<{ id: string }> {
  let res: Response;
  try {
    res = await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  } catch {
    throw new InquiryError('We could not reach the server. Please check your connection.', 0);
  }
  const data = (await res.json().catch(() => ({}))) as { ok?: boolean; id?: string; error?: string; fieldErrors?: Record<string, string> };
  if (!res.ok || !data.ok || !data.id) throw new InquiryError(data.error ?? 'Something went wrong while sending your request.', res.status, data.fieldErrors);
  return { id: data.id };
}

/** Where the visitor submitted from, for the "Source page" column. */
export const currentSource = () => (typeof window === 'undefined' ? '' : `${window.location.pathname}${window.location.search}`.slice(0, 200));
