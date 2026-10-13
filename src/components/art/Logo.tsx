import Image from 'next/image';
import Link from 'next/link';
import { APP_CONFIG, IMAGES, IMAGE_QUALITY, ROUTES, legalName } from '@/config';

/** The brand emblem (see `IMAGES.logo`). Decorative: the name next to it carries the meaning. */
export function LogoMark({ className = 'logo__mark', priority = false }: { className?: string; priority?: boolean }) {
  const { src, width, height } = IMAGES.logo;
  return <Image className={className} src={src} alt="" width={width} height={height} sizes="96px" quality={IMAGE_QUALITY} priority={priority} />;
}

export function Logo({ linked = true }: { linked?: boolean }) {
  const inner = (
    <>
      <LogoMark priority />
      <span className="logo__word">
        <strong>{legalName().toUpperCase()}</strong>
        <small>{APP_CONFIG.BRAND_TAGLINE}</small>
      </span>
    </>
  );
  if (!linked) return <span className="logo">{inner}</span>;
  return (
    <Link href={ROUTES.HOME} className="logo">
      {inner}
    </Link>
  );
}
