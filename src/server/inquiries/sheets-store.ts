import 'server-only';
import type { InquiryRow } from './rows';

const FALLBACK_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbzsZgA45-RJOccyT4L9Ffg70IMwdnwrb_cKBBBRrQ1eRHrRnCw8WwUKiuuxSEVlDPxs/exec';
const FALLBACK_SECRET = 'smart-switch-secret-key-123';

/**
 * Appends a row to a Google Sheet through an Apps Script web app (see docs/inquiry-sheet.md).
 * The URL and secret are server-side environment variables and never reach the browser.
 */
export async function appendToGoogleSheet(row: InquiryRow): Promise<void> {
  const url = process.env.INQUIRY_SHEET_WEBHOOK_URL || FALLBACK_WEBHOOK_URL;
  if (!url) throw new Error('INQUIRY_SHEET_WEBHOOK_URL is not set');
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: process.env.INQUIRY_SHEET_SECRET || FALLBACK_SECRET, row }),
    redirect: 'follow',
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Sheet webhook responded ${res.status}`);
  const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
  if (body.ok === false) throw new Error(`Sheet webhook error: ${body.error ?? 'unknown'}`);
}
