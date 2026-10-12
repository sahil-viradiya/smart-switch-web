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
  { id: 'zigbee-gateway-ethernet', name: 'Zigbee gateway (Ethernet)', text: 'Connects Zigbee panels to your network by Ethernet cable. Needed for the Zigbee version.', icon: 'connect', price: 5000 },
  { id: 'zigbee-gateway-usb', name: 'Zigbee gateway (USB)', text: 'A USB-powered gateway for Zigbee panels. Needed for the Zigbee version.', icon: 'bolt', price: 5000 },
  { id: 'remote-r1-r2', name: 'Remote R1-R2', text: 'A handheld remote with all on and all off buttons, for controlling your panels without touching the wall.', icon: 'touch', price: 700 },
];

/** Custom icons for the Color series are charged per icon. */
export const CUSTOM_ICON = { name: 'Custom icon', text: 'Design your own icon and panel layout for the Color series.', price: 100, priceNote: 'per icon' } as const;
