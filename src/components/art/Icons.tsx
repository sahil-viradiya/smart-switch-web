import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 20, children, ...rest }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      {children}
    </svg>
  );
}

export const ArrowRight = (p: P) => (<Svg size={14} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>);
export const ArrowUpRight = (p: P) => (<Svg size={14} {...p}><path d="M7 17 17 7M8 7h9v9" /></Svg>);
export const ArrowUp = (p: P) => (<Svg size={18} {...p}><path d="M12 19V5M6 11l6-6 6 6" /></Svg>);
export const ArrowLeft = (p: P) => (<Svg size={18} {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></Svg>);
export const Close = (p: P) => (<Svg size={18} {...p}><path d="M6 6l12 12M18 6 6 18" /></Svg>);
export const Expand = (p: P) => (<Svg size={16} {...p}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></Svg>);
export const Check = (p: P) => (<Svg {...p}><path d="m5 12.5 4.5 4.5L19 7" /></Svg>);
export const Search = (p: P) => (<Svg size={16} {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></Svg>);
export const Alert = (p: P) => (<Svg {...p}><path d="M12 3 2.5 20h19z" /><path d="M12 10v4.5M12 17.5v.01" /></Svg>);
export const PaddleIcon = (p: P) => (<Svg {...p}><rect x="7" y="3" width="10" height="18" rx="3.5" /><path d="M7 12h10" /></Svg>);
export const LedIcon = (p: P) => (<Svg {...p}><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" /></Svg>);
export const GridIcon = (p: P) => (<Svg {...p}><rect x="4" y="4" width="7" height="7" rx="2" /><rect x="13" y="4" width="7" height="7" rx="2" /><rect x="4" y="13" width="7" height="7" rx="2" /><rect x="13" y="13" width="7" height="7" rx="2" /></Svg>);
export const ShieldIcon = (p: P) => (<Svg {...p}><path d="M12 3 5 6v5.5c0 4.3 2.8 7.6 7 9.5 4.2-1.9 7-5.2 7-9.5V6z" /><path d="m9 12 2.2 2.2L15.5 10" /></Svg>);
export const BoltIcon = (p: P) => (<Svg {...p}><path d="M13 3 5 13.5h6L10 21l8-10.5h-6z" /></Svg>);
export const OrbitIcon = (p: P) => (<Svg {...p}><circle cx="12" cy="12" r="2.2" /><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-30 12 12)" /></Svg>);
export const WhatsAppIcon = (p: P) => (<Svg {...p}><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3z" /><path d="M9 8.2c.2 2.1 2.5 4.4 4.6 5.2l1.2-1.2 1.8.9c0 1-.8 1.8-1.8 1.8-3.1 0-5.5-2.4-5.5-5.5 0-1 .8-1.8 1.8-1.8z" /></Svg>);
export const Mail = (p: P) => (<Svg {...p}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></Svg>);
export const Phone = (p: P) => (<Svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" /></Svg>);

export const Plus = (p: P) => (<Svg size={16} {...p}><path d="M12 5v14M5 12h14" /></Svg>);

export const ICONS = {
  paddle: PaddleIcon,
  led: LedIcon,
  grid: GridIcon,
  shield: ShieldIcon,
  bolt: BoltIcon,
  orbit: OrbitIcon,
} as const;
export type IconName = keyof typeof ICONS;
