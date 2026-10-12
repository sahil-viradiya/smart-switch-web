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
    id: 'living', name: 'Living room', scene: 'living', headline: 'Layered light, one calm wall.',
    text: 'Group downlights, accent lighting and a feature wall on a single flush plate so the room reads as one design.',
    suggestion: { plate: '3-Gang', finish: 'Matte Charcoal or Architectural White' },
    tips: ['Put the dimmer variant beside the sofa for evening scenes', 'Align the plate with door hardware heights', 'Keep the wall box neutral wired for the smart layer'],
    link: { label: 'Residential use case', href: ROUTES.USE_CASES_SLUG('residential-homes') },
  },
  {
    id: 'bedroom', name: 'Bedroom', scene: 'bedroom', headline: 'Gentle at night.',
    text: 'A soft status LED instead of a bright screen, and a paddle you can find without looking.',
    suggestion: { plate: '2-Gang', finish: 'Architectural White' },
    tips: ['Mount at bedside height for easy reach', 'Use the dimmer variant for reading light', 'The indicator is designed to stay discreet in low light'],
    link: { label: 'Residential use case', href: ROUTES.USE_CASES_SLUG('residential-homes') },
  },
  {
    id: 'hall', name: 'Hallway & stairs', scene: 'hall', headline: 'Flush, aligned, uncluttered.',
    text: 'Consolidate scattered toggles into one tidy console, and plan multi-way arrangements with your electrician.',
    suggestion: { plate: '2-Gang or 3-Gang', finish: 'Brushed Aluminum' },
    tips: ['Plan multi-way switching at the design stage', 'Check back-box depth in older walls first', 'Brushed Aluminum sits well beside brass and bronze'],
    link: { label: 'Renovation use case', href: ROUTES.USE_CASES_SLUG('architectural-renovations') },
  },
  {
    id: 'studio', name: 'Studio & office', scene: 'studio', headline: 'One standard across every room.',
    text: 'Give meeting rooms, galleries and executive suites the same quiet plate and the same tactile feel.',
    suggestion: { plate: '2-Gang', finish: 'Matte Charcoal or Brushed Aluminum' },
    tips: ['Review loads per project against the provisional rating', 'Share a switch schedule for a tailored review', 'Keep finishes consistent across floors'],
    link: { label: 'Commercial use case', href: ROUTES.USE_CASES_SLUG('commercial-studios') },
  },
];
