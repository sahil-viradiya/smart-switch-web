import Image from 'next/image';
import { IMAGES } from '@/config/images';
import { colors } from '@/theme';
import { SCENE_COLORS as C } from '@/theme/art';
import type { SceneName } from '@/types';

export type { SceneName };

/**
 * Interior scene. Uses a registered photo from `config/images.ts` when present,
 * otherwise a layered SVG placeholder. Purely decorative.
 */
export function SceneArt({ scene, className }: { scene: SceneName; className?: string }) {
  const photo = IMAGES.scenes[scene];
  if (photo) return <Image className="scene-photo" src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} />;

  const id = `sc-${scene}`;
  const warm = C.warm[scene];
  const slats = Array.from({ length: 9 }, (_, i) => 252 + i * 16);
  const skyline = [
    [24, 190, 14, 70], [42, 170, 18, 90], [64, 200, 12, 60], [80, 160, 20, 100], [104, 186, 14, 74], [122, 176, 16, 84],
  ] as const;

  return (
    <svg className={className} viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.wallTop} /><stop offset="1" stopColor={C.wallBottom} /></linearGradient>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.skyTop} /><stop offset="1" stopColor={C.skyBottom} /></linearGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.floorTop} /><stop offset="1" stopColor={C.floorBottom} /></linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0" r="0.8"><stop offset="0" stopColor={warm} stopOpacity="0.55" /><stop offset="1" stopColor={warm} stopOpacity="0" /></radialGradient>
        <linearGradient id={`${id}-tv`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={C.tvA} /><stop offset="0.6" stopColor={C.tvB} /><stop offset="1" stopColor={C.tvC} /></linearGradient>
      </defs>

      <rect width="400" height="500" fill={`url(#${id}-wall)`} />
      <rect width="400" height="260" fill={`url(#${id}-glow)`} />

      {/* ceiling cove light */}
      <rect x="30" y="64" width="340" height="3" rx="1.5" fill={warm} opacity="0.95" />
      <rect x="30" y="64" width="340" height="26" fill={warm} opacity="0.08" />

      {/* window */}
      {scene !== 'studio' && (
        <g>
          <rect x="18" y="120" width="130" height="250" fill={`url(#${id}-sky)`} />
          {skyline.map(([x, y, w, h], i) => (
            <g key={i}>
              <rect x={x} y={y + 90} width={w} height={h} fill={C.building} />
              <rect x={x + 3} y={y + 100} width="2" height="2" fill={C.windowLight} />
              <rect x={x + w - 5} y={y + 116} width="2" height="2" fill={C.windowLight} />
            </g>
          ))}
          <path d="M18 120v250M83 120v250M148 120v250" stroke={C.mullion} strokeWidth="3" />
          <path d="M14 112c10 40 8 190 4 258M148 112c-6 40-4 190 0 258" stroke={C.curtain} strokeWidth="14" opacity="0.5" />
        </g>
      )}

      {/* feature wall */}
      {scene === 'living' && <rect x="170" y="140" width="190" height="104" rx="3" fill={`url(#${id}-tv)`} stroke={C.tvFrame} strokeWidth="4" />}
      {scene === 'bedroom' && (
        <g>
          <rect x="170" y="130" width="190" height="130" rx="4" fill={C.panel} />
          <rect x="182" y="142" width="166" height="106" rx="2" fill={C.panelInset} opacity="0.8" />
        </g>
      )}
      {scene === 'studio' && (
        <g>
          <rect x="40" y="130" width="130" height="150" rx="3" fill={C.wood} />
          <rect x="52" y="142" width="106" height="126" fill={C.studioWall} />
          <circle cx="105" cy="205" r="30" fill="none" stroke={warm} strokeOpacity="0.7" strokeWidth="1.5" />
          <rect x="190" y="150" width="170" height="3" fill={warm} opacity="0.9" />
          <rect x="190" y="150" width="170" height="60" fill={warm} opacity="0.06" />
        </g>
      )}
      {scene === 'hall' && <rect x="180" y="120" width="60" height="250" rx="2" fill={C.panel} />}

      {/* slatted panel */}
      {scene !== 'studio' && slats.map((x) => <rect key={x} x={x} y="270" width="6" height="140" fill={C.slat} opacity="0.7" />)}

      {/* furniture */}
      {scene === 'living' && (
        <g>
          <rect x="60" y="360" width="200" height="60" rx="14" fill={C.sofa} />
          <rect x="52" y="340" width="216" height="40" rx="14" fill={C.sofaBack} />
          <rect x="90" y="350" width="44" height="28" rx="8" fill={C.cushion} />
          <rect x="250" y="400" width="110" height="14" rx="3" fill={C.table} />
          <circle cx="330" cy="390" r="10" fill={C.plant} />
        </g>
      )}
      {scene === 'bedroom' && (
        <g>
          <rect x="60" y="340" width="250" height="70" rx="10" fill={C.bed} />
          <rect x="70" y="326" width="230" height="30" rx="10" fill={C.linen} opacity="0.85" />
          <rect x="86" y="318" width="70" height="20" rx="8" fill={C.pillowA} />
          <rect x="170" y="318" width="70" height="20" rx="8" fill={C.pillowB} />
        </g>
      )}
      {scene === 'studio' && (
        <g>
          <rect x="190" y="330" width="180" height="14" rx="3" fill={C.wood} />
          <path d="M210 344v70M350 344v70" stroke={C.woodDark} strokeWidth="6" />
          <rect x="250" y="300" width="70" height="30" rx="2" fill={C.paperSheet} opacity="0.8" />
          <path d="M120 250 128 340M128 340h30" stroke={C.lampBrass} strokeWidth="3" fill="none" />
        </g>
      )}
      {scene === 'hall' && (
        <g>
          <rect x="260" y="360" width="100" height="10" rx="3" fill={C.wood} />
          <path d="M276 370v50M344 370v50" stroke={C.woodDark} strokeWidth="5" />
          <rect x="290" y="332" width="40" height="28" rx="3" fill={C.sofa} />
        </g>
      )}

      {/* floor */}
      <rect y="410" width="400" height="90" fill={`url(#${id}-floor)`} />
      <rect y="410" width="400" height="1.5" fill={warm} opacity="0.35" />
      <ellipse cx="200" cy="460" rx="150" ry="14" fill={warm} opacity="0.08" />

      {/* the wall switch (product placement) */}
      <g transform="translate(300 226)">
        <rect width="46" height="36" rx="3" fill={C.switchPlate} stroke={colors.gold} strokeOpacity="0.55" strokeWidth="0.8" />
        <rect x="6" y="5" width="15" height="26" rx="2" fill={C.switchPaddle} />
        <rect x="25" y="5" width="15" height="26" rx="2" fill={C.switchPaddle} />
        <circle cx="13.5" cy="9" r="1.1" fill={colors.goldLight} />
        <circle cx="32.5" cy="9" r="1.1" fill={colors.goldLight} />
      </g>
    </svg>
  );
}
