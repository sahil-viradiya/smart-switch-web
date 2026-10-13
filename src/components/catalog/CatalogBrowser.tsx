'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ProductImage, ProductStage } from '@/components/art/ProductImage';
import { Filter, Search } from '@/components/art/Icons';
import { Zoomable } from '@/components/media/Zoomable';
import { CATALOG_CONFIG, ROUTES, formatPrice } from '@/config';
import { CATALOG, CONNECTIVITY, MATERIALS, MODULES, PRODUCT_KINDS, SERIES, productAlt } from '@/content/catalog';
import type { CatalogProduct, ConnectivityId, MaterialId, MediaItem, ModuleId, ProductKind, SeriesId } from '@/types';

interface Filters { series: SeriesId; module: 'ALL' | ModuleId; kind: 'ALL' | ProductKind; material: 'ANY' | MaterialId; version: 'ANY' | ConnectivityId; q: string }

const DEFAULTS: Filters = { series: 'color', module: 'ALL', kind: 'ALL', material: 'ANY', version: 'ANY', q: '' };
const has = <T extends string>(list: readonly { id: T }[], v: string | null): v is T => !!v && list.some((x) => x.id === v);

function fromQuery(search: string): Filters {
  const p = new URLSearchParams(search);
  const series = p.get('series'); const module = p.get('module')?.toUpperCase() ?? null; const kind = p.get('kind');
  return {
    ...DEFAULTS,
    series: has(SERIES, series) ? series : DEFAULTS.series,
    module: has(MODULES, module) ? module : 'ALL',
    kind: has(PRODUCT_KINDS, kind) ? kind : 'ALL',
    material: has(MATERIALS, p.get('material')) ? (p.get('material') as MaterialId) : 'ANY',
    version: has(CONNECTIVITY, p.get('version')) ? (p.get('version') as ConnectivityId) : 'ANY',
    q: p.get('q') ?? '',
  };
}

function toQuery(f: Filters): string {
  const p = new URLSearchParams();
  if (f.series !== DEFAULTS.series) p.set('series', f.series);
  if (f.module !== 'ALL') p.set('module', f.module);
  if (f.kind !== 'ALL') p.set('kind', f.kind);
  if (f.material !== 'ANY') p.set('material', f.material);
  if (f.version !== 'ANY') p.set('version', f.version);
  if (f.q.trim()) p.set('q', f.q.trim());
  const s = p.toString();
  return s ? `?${s}` : '';
}

function matches(p: CatalogProduct, f: Filters): boolean {
  const offer = p.series[f.series];
  if (!offer) return false;
  if (f.module !== 'ALL' && p.module !== f.module) return false;
  if (f.kind !== 'ALL' && !p.kinds.includes(f.kind)) return false;
  if (f.material !== 'ANY' && !offer.materials.includes(f.material)) return false;
  if (f.version !== 'ANY' && !offer.connectivity.includes(f.version)) return false;
  const q = f.q.trim().toLowerCase();
  return !q || q.split(/\s+/).every((w) => p.searchText.includes(w));
}

/** Filterable grid of every configuration. Filters are kept in the URL so a filtered view can be shared. */
export function CatalogBrowser({ fromPrices }: { /** Lowest price per `${series}:${id}`. Only passed by the page when prices are switched on. */ fromPrices?: Readonly<Record<string, number>> }) {
  const [f, setF] = useState<Filters>(DEFAULTS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [shown, setShown] = useState<number>(CATALOG_CONFIG.pageSize);
  const [ready, setReady] = useState(false);

  useEffect(() => { setF(fromQuery(window.location.search)); setReady(true); }, []);
  useEffect(() => {
    if (!ready) return;
    try { history.replaceState(null, '', `${window.location.pathname}${toQuery(f)}`); } catch { /* ignore */ }
  }, [f, ready]);

  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => { setF((x) => ({ ...x, [k]: v })); setShown(CATALOG_CONFIG.pageSize); };
  const results = useMemo(() => CATALOG.filter((p) => matches(p, f)), [f]);
  const visible = results.slice(0, shown);
  const series = SERIES.find((s) => s.id === f.series)!;
  const group = useMemo<MediaItem[]>(() => results.map((p) => ({ kind: 'product', series: f.series, productId: p.id, caption: `${p.module}: ${p.title}`, alt: productAlt(p, f.series) })), [results, f.series]);
  const filterCount = [f.module !== 'ALL', f.kind !== 'ALL', f.material !== 'ANY', f.version !== 'ANY'].filter(Boolean).length;
  const active = f.module !== 'ALL' || f.kind !== 'ALL' || f.material !== 'ANY' || f.version !== 'ANY' || f.q.trim() !== '';

  const pills = <T extends string>(label: string, value: string, options: readonly { id: T; label: string }[], onChange: (v: T) => void) => (
    <div className="filter">
      <span className="filter__label" id={`flt-${label}`}>{label}</span>
      <div className="pills" role="group" aria-labelledby={`flt-${label}`}>
        {options.map((o) => (<button key={o.id} type="button" className="pill" aria-pressed={value === o.id} onClick={() => onChange(o.id)}>{o.label}</button>))}
      </div>
    </div>
  );

  return (
    <div className="cat">
      <div className="cat__tools">
        <div className="cat__head">
          <div className="filter">
            <span className="filter__label" id="flt-series">Series</span>
            <div className="seg" role="group" aria-labelledby="flt-series">
              {SERIES.map((s) => (<button key={s.id} type="button" className="seg__btn" aria-pressed={f.series === s.id} onClick={() => set('series', s.id)}>{s.name}</button>))}
            </div>
          </div>
          <div className="faq-search cat__search">
            <Search />
            <label htmlFor="cat-q" className="sr-only">Search the catalogue</label>
            <input id="cat-q" className="input" type="search" placeholder="Search, e.g. fan, socket, 4M" value={f.q} onChange={(e) => set('q', e.target.value)} />
          </div>
          <button type="button" className="cat__toggle" aria-expanded={filtersOpen} aria-controls="cat-filters" onClick={() => setFiltersOpen((v) => !v)}>
            <Filter /> Filters{filterCount > 0 ? ` (${filterCount})` : ''}
          </button>
        </div>
        <div id="cat-filters" className={`cat__filters${filtersOpen ? ' is-open' : ''}`}>
          {pills('Size', f.module, [{ id: 'ALL', label: 'All' }, ...MODULES.map((m) => ({ id: m.id, label: m.id }))] as const, (v) => set('module', v))}
          {pills('Function', f.kind, [{ id: 'ALL', label: 'All' }, ...PRODUCT_KINDS] as const, (v) => set('kind', v))}
          <div className="cat__row">
            {pills('Panel', f.material, [{ id: 'ANY', label: 'Any' }, ...MATERIALS.map((m) => ({ id: m.id, label: m.label }))] as const, (v) => set('material', v))}
            {pills('Version', f.version, [{ id: 'ANY', label: 'Any' }, ...CONNECTIVITY.map((c) => ({ id: c.id, label: c.label }))] as const, (v) => set('version', v))}
          </div>
        </div>
      </div>

      <div className="cat__bar">
        <p aria-live="polite"><strong>{results.length}</strong> {results.length === 1 ? 'configuration' : 'configurations'} in the {series.name} series</p>
        {active && <button type="button" className="text-link" onClick={() => { setF({ ...DEFAULTS, series: f.series }); setShown(CATALOG_CONFIG.pageSize); }}>Clear filters</button>}
      </div>

      {results.length === 0 ? (
        <p className="faq-empty">Nothing matches those filters. Try fewer filters or a different search.</p>
      ) : (
        <ul className="cat__grid">
          {visible.map((p) => {
            const offer = p.series[f.series]!;
            const from = fromPrices?.[`${f.series}:${p.id}`] ?? 0;
            return (
              <li key={p.id}>
                <article className="card pcard">
                  <Zoomable item={group.find((g) => g.kind === 'product' && g.productId === p.id)!} group={group}>
                    <ProductStage className="stage--card" glow={false}>
                      <ProductImage series={f.series} productId={p.id} sizes="(max-width: 640px) 45vw, 260px" />
                    </ProductStage>
                  </Zoomable>
                  <div className="card__body">
                    <span className="card__eyebrow">{p.module}</span>
                    <h3 className="card__title">{p.title}</h3>
                    <ul className="chips" aria-label="Available as">
                      {offer.materials.map((m) => (<li key={m} className="chip">{MATERIALS.find((x) => x.id === m)!.label}</li>))}
                      {offer.connectivity.map((c) => (<li key={c} className="chip">{CONNECTIVITY.find((x) => x.id === c)!.label}</li>))}
                    </ul>
                    {CATALOG_CONFIG.showPrices && from > 0 && <p className="card__text">From {formatPrice(from)}</p>}
                    <Link className="text-link" href={`${ROUTES.REQUEST_DEMO}?intent=architect&product=${p.id}&series=${f.series}`}>Ask about this panel</Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}

      {visible.length < results.length && (
        <div className="cat__more">
          <button type="button" className="btn btn--outline-dark" onClick={() => setShown((n) => n + CATALOG_CONFIG.pageSize)}>
            Show more ({results.length - visible.length} left)
          </button>
        </div>
      )}
      {CATALOG_CONFIG.showPrices && <p className="small">{CATALOG_CONFIG.priceNote}</p>}
    </div>
  );
}
