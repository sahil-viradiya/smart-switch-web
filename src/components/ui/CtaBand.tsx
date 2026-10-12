import { ButtonLink } from './ButtonLink';
import { Reveal } from './Reveal';
import { CTA, type Cta } from '@/config';

interface Props {
  eyebrow?: string;
  title: string;
  text?: string;
  primary?: Cta;
  secondary?: Cta;
}

export function CtaBand({
  eyebrow = 'Next step',
  title,
  text,
  primary = CTA.BOOK_DEMO,
  secondary,
}: Props) {
  return (
    <Reveal variant="scale">
      <div className="cta-band">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          {text && <p>{text}</p>}
        </div>
        <div className="cta-band__actions">
          <ButtonLink href={primary.href} variant="white" arrow>{primary.label}</ButtonLink>
          {secondary && <ButtonLink href={secondary.href} variant="ghost">{secondary.label}</ButtonLink>}
        </div>
      </div>
    </Reveal>
  );
}

/** Paper section wrapper that places a CtaBand above the dark footer. */
export function CtaSection(props: Props) {
  return (
    <section className="sec sec--paper sec--tight" aria-label="Get in touch">
      <div className="container"><CtaBand {...props} /></div>
    </section>
  );
}
