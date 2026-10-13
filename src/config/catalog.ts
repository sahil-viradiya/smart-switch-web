/**
 * CATALOGUE settings.
 *
 * `showPrices` is OFF. The list prices (2026 price lists) are in `content/catalog/prices.data.ts`, which is
 * server only, so they are not in the browser code either. Turn this on to show "from" prices on the
 * catalogue cards (the catalogue page then passes them to the browser).
 * List prices exclude taxes and any trade discount.
 */
export const CATALOG_CONFIG = {
  showPrices: false,
  currencyPrefix: 'Rs. ',
  priceNote: 'List prices in rupees, excluding taxes.',
  /** Cards shown per page on /catalogue. */
  pageSize: 24,
} as const;

export const formatPrice = (n: number) => `${CATALOG_CONFIG.currencyPrefix}${n.toLocaleString('en-IN')}`;

/** Link to the catalogue with filters applied, e.g. catalogueHref({ series: 'edge', module: '4M' }). */
export function catalogueHref(filters: { series?: string; module?: string; kind?: string; q?: string } = {}): string {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(filters)) if (v) params.set(k, v);
  const qs = params.toString();
  return `/catalogue${qs ? `?${qs}` : ''}`;
}
