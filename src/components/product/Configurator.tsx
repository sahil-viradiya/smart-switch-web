'use client';

import { useState } from 'react';
import { SwitchArt, SwitchStage } from '@/components/art/SwitchArt';
import { FINISHES, VARIANTS } from '@/content/product';
import { ProvisionalBadge } from '@/components/ui/ProvisionalBadge';
import { CtaLink } from '@/components/ui/CtaLink';
import { CTA } from '@/config';

/** Variant + finish chooser (module chooser pattern from the reference). */
export function Configurator() {
  const [variantId, setVariantId] = useState(VARIANTS[1]!.id);
  const [finishId, setFinishId] = useState(FINISHES[0]!.id);

  const variant = VARIANTS.find((v) => v.id === variantId)!;
  const finish = FINISHES.find((f) => f.id === finishId)!;

  return (
    <div className="cfg">
      <div className="cfg__stage">
        <SwitchStage className="stage--wide">
          <SwitchArt key={`${variant.id}-${finish.id}`} gangs={variant.gangs} dimmer={variant.dimmer} finish={finish} label={`${variant.name} Smart Switch in ${finish.name}`} />
          <div className="stage__caption glass-chip" aria-live="polite">
            <small>Your selection</small>
            <strong>{variant.name}, {finish.name}</strong>
          </div>
        </SwitchStage>
        <p className="small" style={{ marginTop: 14 }}>Illustration. Final dimensions and finishes are confirmed for each regional version.</p>
      </div>

      <div className="cfg__panel">
        <div className="cfg__group" role="radiogroup" aria-labelledby="cfg-variant">
          <h3 id="cfg-variant">Configuration</h3>
          <p className="h-sub">Choose a plate</p>
          <div className="opt-grid">
            {VARIANTS.map((v) => (
              <button key={v.id} type="button" role="radio" aria-checked={variantId === v.id} className="opt" onClick={() => setVariantId(v.id)}>
                <SwitchStage className="" glow={false}>
                  <SwitchArt gangs={v.gangs} dimmer={v.dimmer} finish={finish} />
                </SwitchStage>
                <strong>{v.name}</strong>
                <span className="small">{v.tagline}</span>
              </button>
            ))}
          </div>
          <p className="small" style={{ marginTop: 14 }}>{variant.description}</p>
        </div>

        <div className="cfg__group" role="radiogroup" aria-labelledby="cfg-finish">
          <h3 id="cfg-finish">Available finishes</h3>
          <p className="h-sub">Choose a finish</p>
          <div className="swatches">
            {FINISHES.map((f) => (
              <button key={f.id} type="button" role="radio" aria-checked={finishId === f.id} className="swatch" onClick={() => setFinishId(f.id)}>
                <span className="swatch__dot" style={{ background: f.hex }} />
                {f.name}
              </button>
            ))}
          </div>
        </div>

        <div className="row">
          <CtaLink cta={CTA.SPEC_KIT} variant="dark" arrow />
          <ProvisionalBadge label="Specs provisional" />
        </div>
      </div>
    </div>
  );
}
