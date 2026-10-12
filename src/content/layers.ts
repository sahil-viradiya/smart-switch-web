import { SPEC } from '@/config';

export interface Layer { id: string; name: string; text: string }

/** Illustrative construction of a Smart Switch, front to back. Design intent, not a final bill of materials. */
export const LAYERS: readonly Layer[] = [
  { id: 'plate', name: 'Faceplate', text: 'A flush architectural plate in your chosen finish, with concealed fixings.' },
  { id: 'paddles', name: 'Paddle module', text: 'Mechanical paddles with a tactile return. A light guide carries the status LED to the surface.' },
  { id: 'board', name: 'Control & relay board', text: 'The switching and the smart layer. Local switching is designed to act directly on the circuit.' },
  { id: 'frame', name: 'Mounting frame & wall box', text: `Sits in a standard gang box, ${SPEC.boxDepth} minimum depth (provisional).` },
];
