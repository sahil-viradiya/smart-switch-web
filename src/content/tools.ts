import { SPEC } from '@/config';

export interface CheckQuestion { id: string; question: string; hint: string; fix: string }

/** Wall checker. A planning aid only. A licensed electrician makes the final decision. */
export const CHECK_QUESTIONS: readonly CheckQuestion[] = [
  { id: 'neutral', question: 'Is there a neutral wire in the switch box?', hint: 'The standard models are designed to need one.', fix: 'Ask your electrician to look for a neutral wire in the box and the conduit.' },
  { id: 'box', question: `Is the wall box a standard gang box at least ${SPEC.boxDepth} deep?`, hint: 'Measure from the wall surface to the back of the box. The figure is provisional.', fix: 'Have the box measured. Older walls may need a deeper box.' },
  { id: 'supply', question: `Is your supply ${SPEC.voltage}?`, hint: 'This range is provisional until lab testing is finished.', fix: 'Ask your electrician to confirm the supply before you order.' },
  { id: 'electrician', question: 'Do you have a licensed electrician to install it?', hint: 'A licensed electrician must always do the installation.', fix: 'Contact us and we can tell you what to look for in an installer.' },
];
