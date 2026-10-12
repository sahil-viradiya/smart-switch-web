import { CtaLink } from '@/components/ui/CtaLink';
import { CTA } from '@/config';

export default function NotFound() {
  return (
    <section className="sec sec--dark center-page">
      <div className="container">
        <div>
          <span className="eyebrow eyebrow--mark">Error 404</span>
          <h1 className="h-page">We could not find that page</h1>
          <p className="lead">It may have moved, or the address may be wrong.</p>
          <div className="row" style={{ justifyContent: 'center' }}>
            <CtaLink cta={CTA.BACK_HOME} arrow />
            <CtaLink cta={CTA.VIEW_PRODUCT} variant="ghost" />
          </div>
        </div>
      </div>
    </section>
  );
}
