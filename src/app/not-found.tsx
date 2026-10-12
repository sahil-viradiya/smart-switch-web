import { CtaLink } from '@/components/ui/CtaLink';
import { CTA } from '@/config';

export default function NotFound() {
  return (
    <section className="sec sec--dark center-page">
      <div className="container">
        <div>
          <span className="eyebrow eyebrow--mark">Error 404</span>
          <h1 className="h-page">Page not found.<span className="dim-line">The wall is clear here.</span></h1>
          <p className="lead">The page you were looking for does not exist or has moved.</p>
          <div className="row" style={{ justifyContent: 'center' }}>
            <CtaLink cta={CTA.BACK_HOME} arrow />
            <CtaLink cta={CTA.VIEW_PRODUCT} variant="ghost" />
          </div>
        </div>
      </div>
    </section>
  );
}
