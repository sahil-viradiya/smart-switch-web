import 'server-only';
import { randomBytes } from 'node:crypto';

const PREFIX = { demo: 'DEMO', contact: 'MSG', subscribe: 'SUB' } as const;
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no look-alike characters

/** e.g. DEMO-261013-7K2QX -  date (YYMMDD) + 5 random characters. */
export function newReference(kind: keyof typeof PREFIX, at = new Date()): string {
  const d = at.toISOString().slice(2, 10).replace(/-/g, '');
  const rand = Array.from(randomBytes(5), (b) => ALPHABET[b % ALPHABET.length]).join('');
  return `${PREFIX[kind]}-${d}-${rand}`;
}
