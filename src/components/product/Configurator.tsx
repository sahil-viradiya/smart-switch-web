'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ProductImage, ProductStage } from '@/components/art/ProductImage';
import { ArrowRight } from '@/components/art/Icons';
import { CtaLink } from '@/components/ui/CtaLink';
import { CATALOG_CONFIG, CTA, catalogueHref } from '@/config';
import { CONNECTIVITY, MATERIALS, MODULES, REPRESENTATIVE, SERIES, productsInModule } from '@/content/catalog';
import type { ModuleId, SeriesId } from '@/types';

/** Series and size chooser. Shows the real panel and how many configurations exist for the choice. */
export function Configurator() {
  const [seriesId, setSeriesId] = useState<SeriesId>('color');
  const [moduleId, setModuleId] = useState<ModuleId>('4M');

  const series = SERIES.find((s) => s.id === seriesId)!;
  const module = MODULES.find((m) => m.id === moduleId)!;
  const list = productsInModule(moduleId, seriesId);
  const materials = MATERIALS.filter((m) => list.some((p) => p.series[seriesId]?.materials.includes(m.id)));
  const versions = CONNECTIVITY.filter((c) => list.some((p) => p.series[seriesId]?.connectivity.includes(c.id)));

  return (
    <div className="cfg">
      <div className="cfg__stage">
        <ProductStage className="stage--wide">
          <ProductImage key={`${seriesId}-${moduleId}`} series={seriesId} productId={REPRESENTATIVE[moduleId]} sizes="(max-width: 1050px) 90vw, 620px" />
          <div className="stage__caption glass-chip" aria-live="polite">
            <small>Your selection</small>
            <strong>{series.name}, {module.id}</strong>
          </div>
        </ProductStage>
        <p className="small" style={{ marginTop: 14 }}>The panel shown is an example from this size. Each configuration has its own icons.</p>
      </div>

      <div className="cfg__panel">
        <div className="cfg__group" role="radiogroup" aria-labelledby="cfg-series">
          <h3 id="cfg-series">Series</h3>
          <p className="h-sub">Choose a series</p>
          <div className="opt-grid">
            {SERIES.map((s) => (
              <button key={s.id} type="button" role="radio" aria-checked={seriesId === s.id} className="opt opt--text" onClick={() => setSeriesId(s.id)}>
                <strong>{s.name}</strong>
                <span className="small">{s.tagline}</span>
              </button>
            ))}
          </div>
          <p className="small" style={{ marginTop: 14 }}>{series.summary}</p>
        </div>

        <div className="cfg__group" role="radiogroup" aria-labelledby="cfg-size">
          <h3 id="cfg-size">Size</h3>
          <p className="h-sub">Choose a size</p>
          <div className="opt-grid opt-grid--3">
            {MODULES.map((m) => (
              <button key={m.id} type="button" role="radio" aria-checked={moduleId === m.id} className="opt" onClick={() => setModuleId(m.id)}>
                <ProductStage glow={false}>
                  <ProductImage series={seriesId} productId={REPRESENTATIVE[m.id]} sizes="160px" />
                </ProductStage>
                <strong>{m.id}</strong>
              </button>
            ))}
          </div>
          <p className="small" style={{ marginTop: 14 }}>{module.blurb}</p>
        </div>

        <div className="cfg__group">
          <h3>This choice</h3>
          <p className="h-sub">{list.length} {list.length === 1 ? 'configuration' : 'configurations'}</p>
          <ul className="chips" aria-label="Available as">
            {materials.map((m) => (<li key={m.id} className="chip">{m.label}</li>))}
            {versions.map((c) => (<li key={c.id} className="chip">{c.label}</li>))}
          </ul>
          <div className="row" style={{ marginTop: 14 }}>
            <Link className="btn btn--dark" href={catalogueHref({ series: seriesId, module: moduleId })}>See these configurations <ArrowRight className="btn__arrow" /></Link>
            <CtaLink cta={CTA.SPEC_KIT} variant="outline-dark" />
          </div>
          {CATALOG_CONFIG.showPrices && <p className="small">{CATALOG_CONFIG.priceNote}</p>}
        </div>
      </div>
    </div>
  );
}
