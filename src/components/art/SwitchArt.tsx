import Image from 'next/image';
import { useId } from 'react';
import { IMAGES } from '@/config/images';
import { FINISHES, type Finish } from '@/content/product';
import { colors } from '@/theme';
import { rgba } from '@/theme/art';

interface SwitchArtProps {
  gangs?: 1 | 2 | 3;
  dimmer?: boolean;
  finish?: Finish;
  className?: string;
  label?: string;
}

const PAD_W = 58;
const PAD_H = 88;
const GAP = 10;
const EDGE = 18;
const PLATE_H = 124;
const SLIDER_W = 34;

/**
 * Product render. Uses a registered real image when one exists in
 * `config/images.ts`; otherwise draws an SVG placeholder (flush plate,
 * mechanical paddles, gold status LED).
 */
export function SwitchArt({ gangs = 2, dimmer = false, finish = FINISHES[0]!, className = 'switch-art', label }: SwitchArtProps) {
  const uid = useId().replace(/:/g, '');

  const variantId = dimmer ? 'DIMMER' : (`${gangs}_GANG` as const);
  const photo = IMAGES.products[variantId]?.[finish.id];
  if (photo) return <Image className={className} src={photo.src} alt={label ?? photo.alt} width={photo.width} height={photo.height} />;

  const paddles = dimmer ? 1 : gangs;
  const width = EDGE * 2 + paddles * PAD_W + (paddles - 1) * GAP + (dimmer ? GAP + SLIDER_W : 0);
  const dark = !finish.light;
  const stroke = dark ? rgba(colors.white, 0.08) : rgba(colors.shadow, 0.14);
  const highlight = dark ? rgba(colors.white, 0.16) : rgba(colors.white, 0.7);
  const y = (PLATE_H - PAD_H) / 2;

  return (
    <svg className={className} viewBox={`0 0 ${width} ${PLATE_H}`} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <defs>
        <linearGradient id={`${uid}p`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={finish.plate[0]} />
          <stop offset="1" stopColor={finish.plate[1]} />
        </linearGradient>
        <linearGradient id={`${uid}k`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={finish.paddle[0]} />
          <stop offset="1" stopColor={finish.paddle[1]} />
        </linearGradient>
        <radialGradient id={`${uid}g`}>
          <stop offset="0" stopColor={colors.goldLight} stopOpacity="0.9" />
          <stop offset="1" stopColor={colors.goldLight} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0.5" y="0.5" width={width - 1} height={PLATE_H - 1} rx="9" fill={`url(#${uid}p)`} stroke={stroke} />
      {dark && <rect x="4" y="4" width={width - 8} height={PLATE_H - 8} rx="6.5" fill="none" stroke={colors.gold} strokeOpacity="0.5" strokeWidth="0.7" />}
      {Array.from({ length: paddles }).map((_, i) => {
        const x = EDGE + i * (PAD_W + GAP);
        return (
          <g key={i}>
            <rect x={x} y={y} width={PAD_W} height={PAD_H} rx="6" fill={`url(#${uid}k)`} stroke={stroke} />
            <path d={`M${x + 5} ${y + 1.5}h${PAD_W - 10}`} stroke={highlight} strokeLinecap="round" />
            <rect x={x + 4} y={y + PAD_H * 0.52} width={PAD_W - 8} height={PAD_H * 0.42} rx="4" fill={rgba(colors.shadow, 0.05)} />
            <circle cx={x + PAD_W / 2} cy={y + 12} r="7" fill={`url(#${uid}g)`} className="led" />
            <circle cx={x + PAD_W / 2} cy={y + 12} r="1.9" fill={colors.goldLight} className="led" />
          </g>
        );
      })}
      {dimmer && (
        <g>
          <rect x={width - EDGE - SLIDER_W} y={y} width={SLIDER_W} height={PAD_H} rx="6" fill={`url(#${uid}k)`} stroke={stroke} />
          <rect x={width - EDGE - SLIDER_W / 2 - 2} y={y + 12} width="4" height={PAD_H - 24} rx="2" fill={rgba(colors.shadow, 0.35)} />
          {[0, 1, 2, 3, 4].map((n) => (
            <circle key={n} cx={width - EDGE - SLIDER_W / 2} cy={y + 14 + n * 15} r="1.5" fill={n < 3 ? colors.goldLight : rgba(colors.white, 0.25)} />
          ))}
        </g>
      )}
    </svg>
  );
}

/** Dark stage with warm light, framing a SwitchArt. */
export function SwitchStage({ className = '', children, glow = true }: { className?: string; children: React.ReactNode; glow?: boolean }) {
  return (
    <div className={`stage stage--wall ${className}`}>
      {glow && <span className="stage__glow" aria-hidden="true" />}
      {children}
    </div>
  );
}
