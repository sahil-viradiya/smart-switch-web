import type { Cta } from '@/config';
import { ButtonLink } from './ButtonLink';

type Props = Omit<React.ComponentProps<typeof ButtonLink>, 'href' | 'children'> & { cta: Cta };

/** A button whose label and destination come from `config/cta.ts`. */
export function CtaLink({ cta, ...rest }: Props) {
  return <ButtonLink href={cta.href} {...rest}>{cta.label}</ButtonLink>;
}
