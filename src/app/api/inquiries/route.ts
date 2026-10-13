import { NextResponse } from 'next/server';
import { fieldErrors } from '@/lib/forms';
import { inquirySchema } from '@/lib/validation';
import { saveInquiry } from '@/server/inquiries';
import { rateLimit } from '@/server/inquiries/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY = 20_000;
const LIMIT = Number(process.env.INQUIRY_RATE_LIMIT ?? 30);
const WINDOW_MS = Number(process.env.INQUIRY_RATE_WINDOW_SEC ?? 600) * 1000;

const reply = (status: number, body: Record<string, unknown>, headers?: Record<string, string>) =>
  NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });

/**
 * POST /api/inquiries -  receives demo requests, contact messages and subscriptions
 * and appends them to the Excel sheet. Same-origin only, size-capped, rate-limited,
 * validated with the shared Zod schema, honeypot-protected.
 */
export async function POST(req: Request) {
  const origin = req.headers.get('origin');
  const host = req.headers.get('host');
  if (origin && host) {
    try { if (new URL(origin).host !== host) return reply(403, { ok: false, error: 'Forbidden' }); } catch { return reply(403, { ok: false, error: 'Forbidden' }); }
  }
  if (!(req.headers.get('content-type') ?? '').includes('application/json')) return reply(415, { ok: false, error: 'Unsupported content type' });

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'local';
  const rl = rateLimit(`inq:${ip}`, LIMIT, WINDOW_MS);
  if (!rl.ok) return reply(429, { ok: false, error: 'Too many requests. Please try again in a few minutes.' }, { 'Retry-After': String(rl.retryAfterSec) });

  const text = await req.text();
  if (text.length > MAX_BODY) return reply(413, { ok: false, error: 'Request too large' });
  let json: unknown;
  try { json = JSON.parse(text); } catch { return reply(400, { ok: false, error: 'Invalid JSON' }); }

  const parsed = inquirySchema.safeParse(json);
  if (!parsed.success) return reply(400, { ok: false, error: 'Please check the highlighted fields.', fieldErrors: fieldErrors(parsed.error) });

  // Honeypot: bots fill the hidden field. Pretend success, store nothing.
  if (parsed.data.website) return reply(200, { ok: true, id: 'OK-0000' });

  try {
    const { id } = await saveInquiry(parsed.data);
    return reply(200, { ok: true, id });
  } catch (err) {
    console.error('[inquiries] POST /api/inquiries failed:', err instanceof Error ? err.stack || err.message : err);
    return reply(500, { ok: false, error: 'We could not save your request right now.' });
  }
}
