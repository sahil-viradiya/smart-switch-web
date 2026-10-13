import { SPEC } from '@/config/specs';
import type { ConnectivityId, MaterialId, ModuleId, ProductKind } from '@/types';

/** Shared labels for every product option. Change a label here and the whole site follows. */

export interface ModuleInfo { id: ModuleId; label: string; blurb: string }

export const MODULES: readonly ModuleInfo[] = [
  { id: '2M', label: '2 module', blurb: 'The smallest panel. One to four controls, a socket or a doorbell.' },
  { id: '3M', label: '3 module', blurb: 'A slightly wider panel for two or four switches, or a doorbell.' },
  { id: '4M', label: '4 module', blurb: 'Four to six controls, or a socket with switches.' },
  { id: '6M', label: '6 module', blurb: 'Up to eight controls, with fan control or one or two sockets.' },
  { id: '8M', label: '8 module', blurb: 'Up to ten controls, with sockets and fan control.' },
  { id: '12M', label: '12 module', blurb: 'The largest panel. Up to sixteen controls with sockets and fans.' },
];

export const MATERIALS: readonly { id: MaterialId; label: string; blurb: string }[] = [
  { id: 'glass', label: 'Glass', blurb: 'A glass front panel.' },
  { id: 'acrylic', label: 'Acrylic', blurb: 'An acrylic front panel, at a lower price.' },
];

export const CONNECTIVITY: readonly { id: ConnectivityId; label: string; blurb: string }[] = [
  { id: 'wifi', label: 'Wi-Fi', blurb: 'Connects straight to your Wi-Fi. Works with the IR blaster.' },
  { id: 'zigbee', label: 'Zigbee', blurb: 'Needs a Zigbee gateway (Ethernet or USB).' },
];

/** `blurb` and `art` (a panel id shown as the example) are used by the "Pick by function" cards. */
export const PRODUCT_KINDS: readonly { id: ProductKind; label: string; blurb: string; art: string }[] = [
  { id: 'switch', label: 'Switches', blurb: `Touch switches for lights and appliances, with ${SPEC.ratings} versions.`, art: '4m-4-switch' },
  { id: 'socket', label: 'Sockets', blurb: 'A 6A or 16A socket on the panel, alone or beside switches and a fan control.', art: '4m-1-socket-16a-1-switch-16a' },
  { id: 'fan', label: 'Fan control', blurb: 'A fan control on the same panel as your switches.', art: '6m-6-switch-1-fan' },
  { id: 'scene', label: 'Scene control', blurb: 'Four scene buttons on one compact panel. A touch runs a scene you set up.', art: '2m-4-switch-scene-control' },
  { id: 'curtain', label: 'Curtain control', blurb: 'Open and close buttons for one curtain or for two.', art: '2m-dual-curtain-switch' },
  { id: 'dimmer', label: 'Dimmers', blurb: 'Raise and lower the brightness of a light. Phase cut dimmers.', art: '2m-2-dimmer-phase-cut' },
  { id: 'usb', label: 'USB charger', blurb: 'A double charger with one A-type and one C-type port.', art: '2m-double-usb-charger-a-type-c-type' },
  { id: 'doorbell', label: 'Doorbell', blurb: 'A doorbell button panel that rings the bell from the wall.', art: '2m-1-doorbell' },
];

/** How you can control a panel. */
export const CONTROL_METHODS = [
  { id: 'touch', label: 'Touch', text: 'Light touch on the glass or acrylic panel.' },
  { id: 'app', label: 'App', text: 'Control from Android and iOS phones and tablets.' },
  { id: 'voice', label: 'Voice', text: 'Works with voice assistants such as Alexa and Google Home.' },
  { id: 'remote', label: 'IR remote', text: 'Control with a handheld remote.' },
] as const;

/** Representative product used for the size cards and the configurator preview. */
export const REPRESENTATIVE: Record<ModuleId, string> = {
  '2M': '2m-4-switch-scene-control',
  '3M': '3m-2-switch',
  '4M': '4m-4-switch-1-fan',
  '6M': '6m-6-switch-1-fan',
  '8M': '8m-8-switch',
  '12M': '12m-12-switch',
};

