import { SPEC } from '@/config';

export interface Layer { id: string; name: string; text: string }

/** Illustration of how a Smart Switch is built, front to back. Design intent, not a final parts list. */
export const LAYERS: readonly Layer[] = [
  { id: 'plate', name: 'Faceplate', text: 'A flat plate in your chosen finish, with the fixings hidden.' },
  { id: 'paddles', name: 'Paddle module', text: 'The mechanical paddles. A light guide carries the status LED to the surface.' },
  { id: 'board', name: 'Control and relay board', text: 'The switching and the smart features. Local switching is designed to act on the circuit directly.' },
  { id: 'frame', name: 'Mounting frame and wall box', text: `Sits in a standard gang box at least ${SPEC.boxDepth} deep (provisional).` },
];
