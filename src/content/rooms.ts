import { ROUTES } from '@/config';
import type { SceneName, SeriesId } from '@/types';

export interface RoomTab {
  id: string;
  name: string;
  scene: SceneName;
  headline: string;
  text: string;
  suggestion: { panel: string; series: string };
  tips: string[];
  link: { label: string; href: string };
  product: { series: SeriesId; id: string };
}

export const ROOM_TABS: readonly RoomTab[] = [
  {
    id: 'living', name: 'Living room', scene: 'living', headline: 'Lights and fan on one panel',
    text: 'A large panel can hold the room lights, a fan control and a socket, so the wall has one panel instead of several.',
    suggestion: { panel: '8M, for example 6 switches + 1 fan control', series: 'Color' },
    tips: ['Choose icon colours (Color series)', 'Pick 6A or 16A switches to suit each load', 'Wi-Fi or Zigbee, whichever suits your home'],
    link: { label: 'Family homes', href: ROUTES.USE_CASES_SLUG('residential-homes') },
    product: { series: 'color', id: '8m-6-switch-1-fan' },
  },
  {
    id: 'bedroom', name: 'Bedroom', scene: 'bedroom', headline: 'Lights, dimming and curtains',
    text: 'Use a 4M panel for the main lights, or a 2M panel with dimmers or a curtain control next to the bed.',
    suggestion: { panel: '4M with 4 switches, or 2M dimmer', series: 'Edge' },
    tips: ['Phase-cut dimmers come in 2M panels', 'Curtain controls come in single and dual versions', 'Use the app or voice at night'],
    link: { label: 'Family homes', href: ROUTES.USE_CASES_SLUG('residential-homes') },
    product: { series: 'edge', id: '4m-4-switch' },
  },
  {
    id: 'hall', name: 'Hallway & stairs', scene: 'hall', headline: 'Two-way switching',
    text: 'A 2M panel with a two-way switch controls the same light from two places, which is useful in a hallway or on stairs.',
    suggestion: { panel: '2M with a two-way switch', series: 'Edge' },
    tips: ['Plan the two-way wiring with your electrician', 'Check the wall box before ordering', 'A doorbell panel is also available in 2M and 3M'],
    link: { label: 'Renovations', href: ROUTES.USE_CASES_SLUG('architectural-renovations') },
    product: { series: 'edge', id: '2m-2-switch-1-2way' },
  },
  {
    id: 'studio', name: 'Studio & office', scene: 'studio', headline: 'The same panel in every room',
    text: 'Use one series and one size family across the whole space, with sockets and USB charging where you need them.',
    suggestion: { panel: '6M with 6 switches', series: 'Edge' },
    tips: ['Add a double USB charger panel', 'Match the rating (6A or 16A) to the equipment', 'Control everything from the app'],
    link: { label: 'Studios and offices', href: ROUTES.USE_CASES_SLUG('commercial-studios') },
    product: { series: 'edge', id: '6m-6-switch' },
  },
];
