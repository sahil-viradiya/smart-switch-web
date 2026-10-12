import type { CatalogProduct, CatalogRow, ConnectivityId, MaterialId, ModuleId, ProductKind, SeriesId, SeriesOffer } from '@/types';
import { IMAGE_SIZES } from './images.data';
import { CATALOG_ROWS } from './products.data';

/** Wording for the rating notes that appear in brackets in the price list. */
const NOTE_TEXT: Record<string, string> = {
  'All 6A': 'all 6A',
  'All 16A': 'all 16A',
  '1-16A': '1 at 16A',
  '2-16A': 'both 16A',
  '1-2way': '1 two-way',
  '2-2way': 'both two-way',
};

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

function describe(rawLabel: string) {
  const label = rawLabel.replace(/^\d+M\s+/, ''); // the price list has a few "2M 4 Switch" typos
  const kinds = new Set<ProductKind>();
  const counts = { switches: 0, sockets: 0, fans: 0, dimmers: 0 };

  if (/doorbell/i.test(label)) return { title: 'Doorbell', kinds: ['doorbell'] as ProductKind[], counts };
  if (/scene/i.test(label)) return { title: '4-button scene control', kinds: ['scene'] as ProductKind[], counts: { ...counts, switches: 4 } };
  if (/curtain/i.test(label)) return { title: /single/i.test(label) ? 'Single curtain control' : 'Dual curtain control', kinds: ['curtain'] as ProductKind[], counts };
  if (/usb/i.test(label)) return { title: 'Double USB charger (A-type and C-type)', kinds: ['usb'] as ProductKind[], counts };
  const dim = label.match(/(\d+)\s*Dimmer/i);
  if (dim) return { title: `${plural(Number(dim[1]), 'dimmer', 'dimmers')} (phase cut)`, kinds: ['dimmer'] as ProductKind[], counts: { ...counts, dimmers: Number(dim[1]) } };

  const parts: string[] = [];
  for (const m of label.matchAll(/(\d+)\s*(Socket\s*\((\d+A)\)|Switch|Fan)((?:\s*\([^)]+\))*)/gi)) {
    const n = Number(m[1]);
    const type = m[2]!.toLowerCase();
    if (type.startsWith('socket')) {
      counts.sockets += n; kinds.add('socket');
      parts.push(`${plural(n, 'socket', 'sockets')} (${m[3]})`);
    } else if (type === 'switch') {
      counts.switches += n; kinds.add('switch');
      const note = [...(m[4] ?? '').matchAll(/\(([^)]+)\)/g)].map((n) => NOTE_TEXT[n[1]!] ?? n[1]).join(', ');
      parts.push(`${plural(n, 'switch', 'switches')}${note ? ` (${note})` : ''}`);
    } else {
      counts.fans += n; kinds.add('fan');
      parts.push(plural(n, 'fan control', 'fan controls'));
    }
  }
  return { title: parts.join(' + ') || label, kinds: [...kinds], counts };
}

const MATERIAL_ORDER: MaterialId[] = ['glass', 'acrylic'];

function offer(series: SeriesId, id: string, prices: readonly [number, number, number, number]): SeriesOffer {
  const [wg, wa, zg, za] = prices;
  const materials = MATERIAL_ORDER.filter((m) => (m === 'glass' ? wg || zg : wa || za));
  const connectivity: ConnectivityId[] = [];
  if (wg || wa) connectivity.push('wifi');
  if (zg || za) connectivity.push('zigbee');
  return { prices, materials, connectivity, image: `/images/catalog/${series}/${id}.webp`, size: IMAGE_SIZES[`${series}/${id}`] ?? [600, 540] };
}

function build(rows: readonly CatalogRow[]): CatalogProduct[] {
  const seen = new Map<string, number>();
  const total = new Map<string, number>();
  for (const r of rows) total.set(`${r.module}|${r.label}`, (total.get(`${r.module}|${r.label}`) ?? 0) + 1);

  return rows.map((r) => {
    const key = `${r.module}|${r.label}`;
    const idx = (seen.get(key) ?? 0) + 1;
    seen.set(key, idx);
    const variant = (total.get(key) ?? 1) > 1 ? String.fromCharCode(64 + idx) : undefined; // A, B
    const d = describe(r.label);
    const series: CatalogProduct['series'] = {};
    if (r.color) series.color = offer('color', r.id, r.color);
    if (r.edge) series.edge = offer('edge', r.id, r.edge);
    const title = variant ? `${d.title}, style ${variant}` : d.title;
    return {
      id: r.id,
      module: r.module as ModuleId,
      label: r.label,
      title,
      kinds: d.kinds,
      counts: d.counts,
      variant,
      series,
      searchText: `${r.module} ${title} ${r.label}`.toLowerCase(),
    };
  });
}

/** Every configuration, in price-list order (grouped by module size). */
export const CATALOG: readonly CatalogProduct[] = build(CATALOG_ROWS);

export const getProduct = (id: string) => CATALOG.find((p) => p.id === id);
export const productsInSeries = (series: SeriesId) => CATALOG.filter((p) => p.series[series]);
export const productsInModule = (module: ModuleId, series?: SeriesId) => CATALOG.filter((p) => p.module === module && (!series || p.series[series]));

/** List price for a combination, or 0 when it is not offered. */
export function listPrice(p: CatalogProduct, series: SeriesId, connectivity: ConnectivityId, material: MaterialId): number {
  const prices = p.series[series]?.prices;
  if (!prices) return 0;
  const i = (connectivity === 'wifi' ? 0 : 2) + (material === 'glass' ? 0 : 1);
  return prices[i] ?? 0;
}

/** Lowest list price across the options this product is offered in (for "from" prices). */
export function fromPrice(p: CatalogProduct, series: SeriesId): number {
  const prices = (p.series[series]?.prices ?? []).filter((v) => v > 0);
  return prices.length ? Math.min(...prices) : 0;
}

/** Alt text for a product render. */
export const productAlt = (p: CatalogProduct, series: SeriesId) => `${series === 'color' ? 'Color' : 'Edge'} series ${p.module} panel with ${p.title}`;

