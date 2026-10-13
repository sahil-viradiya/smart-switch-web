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
export const Filter = (p: P) => (<Svg size={16} {...p}><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></Svg>);
export const Play = (p: P) => (<Svg size={16} {...p}><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></Svg>);
export const Pause = (p: P) => (<Svg size={16} {...p}><path d="M8 5v14M16 5v14" strokeWidth="2.4" /></Svg>);
export const Expand = (p: P) => (<Svg size={16} {...p}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></Svg>);
export const Check = (p: P) => (<Svg {...p}><path d="m5 12.5 4.5 4.5L19 7" /></Svg>);
export const Search = (p: P) => (<Svg size={16} {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></Svg>);
export const Alert = (p: P) => (<Svg {...p}><path d="M12 3 2.5 20h19z" /><path d="M12 10v4.5M12 17.5v.01" /></Svg>);
export const GridIcon = (p: P) => (<Svg {...p}><rect x="4" y="4" width="7" height="7" rx="2" /><rect x="13" y="4" width="7" height="7" rx="2" /><rect x="4" y="13" width="7" height="7" rx="2" /><rect x="13" y="13" width="7" height="7" rx="2" /></Svg>);
export const ShieldIcon = (p: P) => (<Svg {...p}><path d="M12 3 5 6v5.5c0 4.3 2.8 7.6 7 9.5 4.2-1.9 7-5.2 7-9.5V6z" /><path d="m9 12 2.2 2.2L15.5 10" /></Svg>);
export const BoltIcon = (p: P) => (<Svg {...p}><path d="M13 3 5 13.5h6L10 21l8-10.5h-6z" /></Svg>);
export const OrbitIcon = (p: P) => (<Svg {...p}><circle cx="12" cy="12" r="2.2" /><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-30 12 12)" /></Svg>);
export const WhatsAppIcon = (p: P) => (<Svg {...p}><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3z" /><path d="M9 8.2c.2 2.1 2.5 4.4 4.6 5.2l1.2-1.2 1.8.9c0 1-.8 1.8-1.8 1.8-3.1 0-5.5-2.4-5.5-5.5 0-1 .8-1.8 1.8-1.8z" /></Svg>);
export const Mail = (p: P) => (<Svg {...p}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></Svg>);
export const Phone = (p: P) => (<Svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" /></Svg>);

export const Plus = (p: P) => (<Svg size={16} {...p}><path d="M12 5v14M5 12h14" /></Svg>);

export const TouchIcon = (p: P) => (<Svg {...p}><path d="M9 11V5.5a1.7 1.7 0 0 1 3.4 0V11" /><path d="M12.4 10.2a1.6 1.6 0 0 1 3.2 0V12a1.6 1.6 0 0 1 3.2 0v3.4c0 3-2.2 5.3-5.2 5.3h-1.2c-1.6 0-2.7-.7-3.6-1.8L6 14.7a1.5 1.5 0 0 1 2.3-1.9L9 13.6" /></Svg>);
export const PaletteIcon = (p: P) => (<Svg {...p}><path d="M12 3a9 9 0 1 0 0 18c1.3 0 2-.8 2-1.7 0-1.3-1.1-1.5-1.1-2.7 0-1 .8-1.6 1.8-1.6h2.1A4.2 4.2 0 0 0 21 12.8C21 7.4 17 3 12 3z" /><circle cx="7.5" cy="11.5" r="1" /><circle cx="10" cy="7.5" r="1" /><circle cx="15" cy="7.5" r="1" /></Svg>);
export const AppIcon = (p: P) => (<Svg {...p}><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 18h2" /></Svg>);
export const ConnectIcon = (p: P) => (<Svg {...p}><path d="M5 12.5a10 10 0 0 1 14 0M8 15.5a6 6 0 0 1 8 0" /><circle cx="12" cy="18.5" r="1" /></Svg>);
export const MicIcon = (p: P) => (<Svg {...p}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0 0 12 0M12 17v4" /></Svg>);

export const ICONS = {
  touch: TouchIcon,
  palette: PaletteIcon,
  app: AppIcon,
  connect: ConnectIcon,
  voice: MicIcon,
  grid: GridIcon,
  shield: ShieldIcon,
  bolt: BoltIcon,
  orbit: OrbitIcon,
} as const;
export type IconName = keyof typeof ICONS;
