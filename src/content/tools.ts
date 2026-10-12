import { SPEC } from '@/config';

export interface CheckQuestion { id: string; question: string; hint: string; fix: string }

/** Wall checker. A planning aid only. A licensed electrician makes the final decision. */
export const CHECK_QUESTIONS: readonly CheckQuestion[] = [
  { id: 'electrician', question: 'Do you have a licensed electrician to install it?', hint: 'A licensed electrician must always do the installation.', fix: 'Contact us and we can tell you what to look for in an installer.' },
  { id: 'wiring', question: 'Has your electrician checked the wiring in each wall box?', hint: 'The wiring should be checked before you choose a version and a size.', fix: 'Ask your electrician to inspect each box before you order.' },
  { id: 'size', question: 'Do you know which module size fits each wall box?', hint: 'Panels range from 2M to 12M.', fix: 'Measure the boxes or send us photos, and we will suggest a size.' },
  { id: 'load', question: 'Do you know what each circuit will switch?', hint: `Switches and sockets come in ${SPEC.ratings} versions.`, fix: 'List the appliances on each circuit so we can match the 6A or 16A version.' },
];
