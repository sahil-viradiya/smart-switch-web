import { ROUTES } from '@/config';
import type { SceneName } from '@/types';

export interface RoomTab {
  id: string;
  name: string;
  scene: SceneName;
  headline: string;
  text: string;
  suggestion: { plate: string; finish: string };
  tips: string[];
  link: { label: string; href: string };
}

export const ROOM_TABS: readonly RoomTab[] = [
  {
    id: 'living', name: 'Living room', scene: 'living', headline: 'Several lights, one plate',
    text: 'Put the downlights, wall lights and a lamp circuit on one faceplate so the wall has a single, tidy switch.',
    suggestion: { plate: '3-gang', finish: 'Matte Charcoal or Architectural White' },
    tips: ['Use the dimmer beside the sofa for evening light', 'Line the plate up with door handle height', 'Check the box has a neutral wire'],
    link: { label: 'Family homes', href: ROUTES.USE_CASES_SLUG('residential-homes') },
  },
  {
    id: 'bedroom', name: 'Bedroom', scene: 'bedroom', headline: 'Easy to use at night',
    text: 'A dim status light instead of a bright screen, and a paddle you can find without looking.',
    suggestion: { plate: '2-gang', finish: 'Architectural White' },
    tips: ['Mount it where you can reach it from the bed', 'Use the dimmer for a reading light', 'The status light is designed to stay dim'],
    link: { label: 'Family homes', href: ROUTES.USE_CASES_SLUG('residential-homes') },
  },
  {
    id: 'hall', name: 'Hallway & stairs', scene: 'hall', headline: 'One plate instead of three',
    text: 'Replace a row of mismatched switches with one plate, and plan any multi-way wiring with your electrician.',
    suggestion: { plate: '2-gang or 3-gang', finish: 'Brushed Aluminum' },
    tips: ['Plan multi-way switching before ordering', 'Check the box depth first in older walls', 'Brushed Aluminum looks good beside brass and bronze'],
    link: { label: 'Renovations', href: ROUTES.USE_CASES_SLUG('architectural-renovations') },
  },
  {
    id: 'studio', name: 'Studio & office', scene: 'studio', headline: 'The same switch in every room',
    text: 'Use one plate and one finish in meeting rooms, galleries and offices so they all match.',
    suggestion: { plate: '2-gang', finish: 'Matte Charcoal or Brushed Aluminum' },
    tips: ['Check lighting loads against the provisional rating', 'Send a switch schedule for a review', 'Use the same finish on every floor'],
    link: { label: 'Studios and offices', href: ROUTES.USE_CASES_SLUG('commercial-studios') },
  },
];
