import type { IconName } from '@/components/art/Icons';

export interface Accessory {
  id: string;
  name: string;
  text: string;
  icon: IconName;
  /** List price in rupees, if it has one. */
  price?: number;
  priceNote?: string;
}

/** Add-ons that sit alongside the panels. */
export const ACCESSORIES: readonly Accessory[] = [
  { id: 'ir-blaster', name: 'IR blaster', text: 'Lets a Wi-Fi panel send infrared commands to devices such as air conditioners and TVs. Works with Wi-Fi panels only.', icon: 'orbit', price: 3000 },
  { id: 'zigbee-gateway', name: 'Zigbee gateway', text: 'Connects Zigbee panels to your network. Needed for the Zigbee version. Choose the Ethernet gateway (the round one) or the USB gateway (the square one).', icon: 'connect', price: 5000 },
  { id: 'remote-r1-r2', name: 'Remote R1-R2', text: 'A handheld remote with scene buttons, line buttons (L1 to L16), F1 and F2 keys and all on and all off, for controlling your panels without touching the wall.', icon: 'touch', price: 700 },
];

/** Custom icons for the Color series are charged per icon. */
export const CUSTOM_ICON = { name: 'Custom icon', text: 'Design your own icon and panel layout.', price: 100, priceNote: 'per icon' } as const;
