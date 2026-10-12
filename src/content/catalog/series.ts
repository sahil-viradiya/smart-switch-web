import type { SeriesId } from '@/types';

export interface SeriesInfo {
  id: SeriesId;
  name: string;
  tagline: string;
  summary: string;
  /** What is different about this series. */
  highlights: string[];
  /** How the panel signals touch points. */
  indicator: string;
}

/** The two product lines. Names and wording live here only. */
export const SERIES: readonly SeriesInfo[] = [
  {
    id: 'color',
    name: 'Color',
    tagline: 'Backlit icons in colours you choose',
    summary:
      'Touch panels with a backlit icon for each control. You can choose the colour of every icon, set its brightness and saturation, and add your own custom icons.',
    highlights: [
      'RGB icon colours that you can change',
      'Adjustable brightness and saturation',
      'Custom icons on request',
      'Glass or acrylic panel with a slim border',
    ],
    indicator: 'Backlit icons',
  },
  {
    id: 'edge',
    name: 'Edge',
    tagline: 'Clean touch points with a precise finish',
    summary:
      'Touch panels with round touch points and a precision-finished border. The same sizes and functions as Color, with a simpler look.',
    highlights: [
      'Round illuminated touch points',
      'Precision-machined border',
      'Several colours and finishes',
      'Glass or acrylic panel',
    ],
    indicator: 'Round touch points',
  },
];

export const getSeries = (id: SeriesId) => SERIES.find((s) => s.id === id)!;
