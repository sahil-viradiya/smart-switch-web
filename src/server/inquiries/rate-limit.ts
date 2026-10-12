import 'server-only';

const hits = new Map<string, number[]>();

/**
 * Sliding-window limiter (per server instance, in memory). Fine for a single Node process;
 * put a shared limiter (Redis, edge firewall) in front if you scale horizontally.
 */
export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return { ok: false, retryAfterSec: Math.ceil((windowMs - (now - recent[0]!)) / 1000) };
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  return { ok: true, retryAfterSec: 0 };
}
