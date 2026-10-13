import { CONTROL_METHODS, MODULES, MATERIALS, CONNECTIVITY, SERIES, productsInSeries } from '@/content/catalog';
import { SPEC, UNPUBLISHED_SPECS } from '@/config/specs';
import type { IconName } from '@/components/art/Icons';
import type { SeriesId } from '@/types';

/** `art` is the panel render shown on the feature's wheel card. */
export const KEY_FEATURES: readonly { title: string; text: string; icon: IconName; art: { series: SeriesId; id: string } }[] = [
  { title: 'Touch control', text: 'Light touch on a glass or acrylic panel. Each control has its own icon or touch point.', icon: 'touch', art: { series: 'edge', id: '4m-4-switch' } },
  { title: 'Colour and custom icons', text: 'On the Color series you can pick icon colours, set brightness and saturation, and add your own icons.', icon: 'palette', art: { series: 'color', id: '2m-4-switch-scene-control' } },
  { title: 'App and voice', text: 'Control the panels from the Android and iOS app, or with voice assistants such as Alexa and Google Home.', icon: 'app', art: { series: 'color', id: '8m-6-switch-1-fan' } },
  { title: 'Six sizes', text: 'From 2M to 12M, with switches, sockets, fan control, curtain control, dimmers and more.', icon: 'grid', art: { series: 'edge', id: '12m-12-switch' } },
  { title: 'Wi-Fi or Zigbee', text: 'Pick the version that suits your home. Zigbee panels use a gateway.', icon: 'connect', art: { series: 'color', id: '6m-6-switch-1-fan' } },
];

export interface SpecRow {
  label: string;
  value: string;
  provisional: boolean;
}

const rows = (items: readonly { label: string; value: string }[], provisional: boolean): SpecRow[] => items.map((i) => ({ ...i, provisional }));

export const SPEC_ROWS: readonly SpecRow[] = [
  ...rows(
    [
      { label: 'Series', value: SERIES.map((s) => s.name).join(' and ') },
      { label: 'Panel material', value: MATERIALS.map((m, i) => (i ? m.label.toLowerCase() : m.label)).join(' or ') },
      { label: 'Module sizes', value: MODULES.map((m) => m.id).join(', ') },
      { label: 'Configurations', value: `${Math.max(...SERIES.map((s) => productsInSeries(s.id).length))} in each series` },
      { label: 'Versions', value: CONNECTIVITY.map((c) => c.label).join(' or ') },
      { label: 'Control', value: CONTROL_METHODS.map((c) => c.label).join(', ') },
      { label: 'Switch and socket ratings', value: `${SPEC.ratings} versions` },
      { label: 'Warranty', value: SPEC.warranty },
    ],
    false,
  ),
  ...rows(UNPUBLISHED_SPECS, true),
];

export interface CompareRow { label: string; values: readonly string[] }

/** Columns follow SERIES order (Color, Edge). */
export const COMPARE_ROWS: readonly CompareRow[] = [
  { label: 'Touch indicators', values: ['Backlit icons', 'Round touch points'] },
  { label: 'Icon colour', values: ['RGB, adjustable', 'Ask us'] },
  { label: 'Brightness and saturation', values: ['Adjustable', 'Ask us'] },
  { label: 'Custom icons', values: ['Yes, charged per icon', 'Yes, charged per icon'] },
  { label: 'Panel material', values: ['Glass or acrylic', 'Glass or acrylic'] },
  { label: 'Module sizes', values: ['2M to 12M', '2M to 12M'] },
  { label: 'Versions', values: ['Wi-Fi or Zigbee', 'Wi-Fi or Zigbee'] },
  { label: 'Configurations', values: SERIES.map((s) => `${productsInSeries(s.id).length}`) },
];

export const WALL_CHECKLIST = [
  'A licensed electrician will do the installation.',
  'Your electrician has checked the wiring in each wall box.',
  'You have chosen the module size that fits each wall box.',
  'Switch and socket ratings (6A or 16A) suit the loads you will connect.',
  'You have picked the Wi-Fi or Zigbee version. Zigbee panels need a gateway.',
] as const;
