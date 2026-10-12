import { SPEC } from '@/config';

export interface CheckQuestion { id: string; question: string; hint: string; fix: string }

/** Wall-readiness checker. A planning aid only — a licensed electrician makes the final call. */
export const CHECK_QUESTIONS: readonly CheckQuestion[] = [
  { id: 'neutral', question: 'Is there a neutral wire in the switch back-box?', hint: 'Standard models are designed to require one.', fix: 'Ask your electrician to inspect the back-box and conduit for a neutral.' },
  { id: 'box', question: `Is the wall box a standard gang box, at least ${SPEC.boxDepth} deep?`, hint: 'Depth is measured from the wall surface to the back of the box (provisional figure).', fix: 'Have the box measured; deeper or replacement boxes may be needed in older walls.' },
  { id: 'supply', question: `Is your supply ${SPEC.voltage}?`, hint: 'Provisional supply range, pending lab confirmation.', fix: 'Confirm the nominal supply with your electrician before ordering.' },
  { id: 'electrician', question: 'Do you have a licensed electrician to install it?', hint: 'Installation is always by a certified, licensed electrician.', fix: 'Contact us and we can point you towards what to look for in an installer.' },
];
