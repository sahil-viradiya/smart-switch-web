import type { SeriesId } from '@/types';

export interface UseCase {
  slug: string;
  title: string;
  headline: [string, string?];
  category: string;
  summary: string;
  /** Search result title and description. Lead with the phrase people search for. */
  seo: { title: string; description: string };
  overview: string;
  solutions: { title: string; description: string }[];
  recommendations: { label: string; value: string }[];
  scene: 'living' | 'hall' | 'studio';
  /** Product shown beside the recommendations. */
  product: { series: SeriesId; id: string };
  next: { slug: string; title: string };
}

export const USE_CASES: readonly UseCase[] = [
  {
    slug: 'residential-homes',
    title: 'Family homes',
    headline: ['One panel', 'for the whole room.'],
    category: 'Homes',
    summary: 'Lights and fan on one panel, with curtain and dimmer panels to match, in the same styling for every room.',
    seo: {
      title: 'Smart Switches for Home: Lights and Fan',
      description: 'Put the lights and fan on one smart touch panel, add a 2M scene control, and match curtain and dimmer panels in the same styling in every room.',
    },
    overview:
      'A living room often has a bank of separate switches for lights and a fan. A 6M or 8M panel can hold all of them on one touch panel, and curtain or dimmer panels in the same styling sit beside it.',
    solutions: [
      { title: 'Lights and fan together', description: 'Panels such as "6 switches + 1 fan control" put the room lights and the fan on one panel.' },
      { title: 'Scenes', description: 'A 2M panel with four scene buttons gives you one-touch settings for the room.' },
      { title: 'Curtains and dimming', description: 'Single and dual curtain controls and phase-cut dimmers come in 2M panels.' },
    ],
    recommendations: [
      { label: 'Series', value: 'Color or Edge' },
      { label: 'Sizes', value: '6M or 8M for living rooms, 2M for scenes' },
      { label: 'Version', value: 'Wi-Fi or Zigbee, whichever suits you' },
      { label: 'Installer', value: 'Licensed electrician' },
    ],
    scene: 'living',
    product: { series: 'color', id: '8m-6-switch-1-fan' },
    next: { slug: 'architectural-renovations', title: 'Renovations' },
  },
  {
    slug: 'architectural-renovations',
    title: 'Renovations',
    headline: ['New control,', 'same wall.'],
    category: 'Renovation',
    summary: 'Replace a row of old switches with one matching panel.',
    seo: {
      title: 'Replace Old Switch Boards with Touch Panels',
      description: 'Replace a row of old switches and sockets with one flat glass or acrylic touch panel, with two-way switching for hallways. Check the wiring first.',
    },
    overview:
      'When you renovate, you often want to keep the wall and change the controls. Smart Switch panels replace separate switches and sockets with a single, flat panel.',
    solutions: [
      { title: 'Two-way switching', description: 'A 2M panel with a two-way switch handles lights that are controlled from two places, such as a hallway.' },
      { title: 'Sockets on the same panel', description: 'Panels such as "1 socket (6A) + 2 switches" combine a socket and switches, so the wall has fewer plates.' },
      { title: 'Choose the finish', description: 'Both series come in glass or acrylic with a slim border, in several colours and finishes. Ask us for the current options.' },
    ],
    recommendations: [
      { label: 'Series', value: 'Edge for a simple look' },
      { label: 'Sizes', value: '2M to 6M for most walls' },
      { label: 'Before ordering', value: 'Have the wiring checked' },
      { label: 'Installer', value: 'Licensed electrician' },
    ],
    scene: 'hall',
    product: { series: 'edge', id: '2m-2-switch-1-2way' },
    next: { slug: 'commercial-studios', title: 'Studios and offices' },
  },
  {
    slug: 'commercial-studios',
    title: 'Studios and offices',
    headline: ['The same panel', 'in every room.'],
    category: 'Studios and offices',
    summary: 'A consistent control panel for studios, galleries and small offices.',
    seo: {
      title: 'Smart Switches for Offices and Studios',
      description: 'One smart touch switch standard for offices, studios and galleries: matching sizes and finishes, sockets, USB-A/USB-C charging and app control.',
    },
    overview:
      'Offices and studios want the same controls in every room. The same sizes and styling are available throughout, and you can control everything from the app.',
    solutions: [
      { title: 'One standard for many rooms', description: 'Use the same series and finish in every space so the interior stays consistent.' },
      { title: 'Sockets and USB charging', description: 'Panels with sockets and a double USB charger (A-type and C-type) are available.' },
      { title: 'Control from the app', description: 'Manage lights and appliances from an Android or iOS phone or tablet.' },
    ],
    recommendations: [
      { label: 'Series', value: 'Edge or Color' },
      { label: 'Sizes', value: '4M to 12M, depending on the number of controls' },
      { label: 'Ratings', value: '6A or 16A to suit each load' },
      { label: 'Installer', value: 'Licensed electrician' },
    ],
    scene: 'studio',
    product: { series: 'edge', id: '6m-6-switch' },
    next: { slug: 'residential-homes', title: 'Family homes' },
  },
];

export const getUseCase = (slug: string) => USE_CASES.find((u) => u.slug === slug);
