import 'server-only';
import { PRICES } from './prices.data';
import { CATALOG } from './products';
import type { ConnectivityId, MaterialId, SeriesId } from '@/types';

/**
 * List prices. SERVER ONLY, so the numbers never reach the browser bundle.
 * Only the catalogue page uses this, and only when `CATALOG_CONFIG.showPrices` is on.
 */

/** List price for a combination, or 0 when it is not offered. */
export function listPrice(id: string, series: SeriesId, connectivity: ConnectivityId, material: MaterialId): number {
  const i = (connectivity === 'wifi' ? 0 : 2) + (material === 'glass' ? 0 : 1);
  return PRICES[id]?.[series]?.[i] ?? 0;
}

/** Lowest list price of each configuration, keyed `${series}:${productId}`, for "From ..." labels. */
export function fromPrices(): Record<string, number> {
  const out: Record<string, number> = {};
  for (const p of CATALOG) {
    for (const series of ['color', 'edge'] as const) {
      const prices = (PRICES[p.id]?.[series] ?? []).filter((v) => v > 0);
      if (prices.length) out[`${series}:${p.id}`] = Math.min(...prices);
    }
  }
  return out;
}
