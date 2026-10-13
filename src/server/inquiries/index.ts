import 'server-only';
import type { InquiryPayload } from '@/lib/validation';
import { newReference } from './ids';
import { toRow, type InquiryRow } from './rows';
import { appendToGoogleSheet } from './sheets-store';
import { appendToBackup, appendToXlsx } from './xlsx-store';

type Mode = 'xlsx' | 'sheets' | 'both';

/** INQUIRY_STORAGE = xlsx (default, or sheets when a webhook URL is set / on Vercel) | sheets | both. */
export function storageMode(): Mode {
  const m = process.env.INQUIRY_STORAGE;
  if (m === 'xlsx' || m === 'sheets' || m === 'both') return m;
  if (process.env.VERCEL || process.env.INQUIRY_SHEET_WEBHOOK_URL) return 'sheets';
  return 'xlsx';
}

/**
 * Saves an inquiry. Succeeds if at least one destination accepted it, so a locked Excel file
 * never loses a lead (the append-only backup keeps it). Throws only when everything failed.
 */
export async function saveInquiry(payload: InquiryPayload): Promise<{ id: string; row: InquiryRow }> {
  const id = newReference(payload.type);
  const row = toRow(payload, id, new Date());
  const mode = storageMode();
  const isVercel = Boolean(process.env.VERCEL);

  const jobs: [string, Promise<void>][] = [];
  if (mode === 'xlsx' || mode === 'both') jobs.push(['xlsx', appendToXlsx(row)]);
  if (mode === 'sheets' || mode === 'both') jobs.push(['google-sheet', appendToGoogleSheet(row)]);
  // Skip local disk backup on Vercel serverless where filesystem is read-only
  if (!isVercel && process.env.INQUIRY_BACKUP !== 'off') jobs.push(['backup', appendToBackup(row)]);

  const settled = await Promise.allSettled(jobs.map(([, p]) => p));
  settled.forEach((r, i) => { if (r.status === 'rejected') console.error(`[inquiries] ${jobs[i]![0]} failed:`, r.reason instanceof Error ? r.reason.message : r.reason); });
  if (!settled.some((r) => r.status === 'fulfilled')) throw new Error('All inquiry destinations failed');
  return { id, row };
}
