#!/usr/bin/env node
/**
 * Lists the legal facts in src/config/legal.ts that are still empty. Until they are filled in, the
 * Privacy Policy, Terms and footer show "To be confirmed" for them.
 *
 *   npm run check:legal             report only (exit 0), so the normal check keeps passing
 *   npm run check:legal -- --strict exit 1 if anything is missing. Run this before launch.
 */
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/config/legal.ts', import.meta.url), 'utf8');
const empty = (re) => re.test(src);
const missing = [];
if (empty(/entityName:\s*''/)) missing.push('entityName: registered legal name of the business');
if (empty(/registeredAddress:\s*\[\]/)) missing.push('registeredAddress: registered office address');
if (empty(/grievanceOfficer:\s*\{[^}]*?name:\s*''/s)) missing.push('grievanceOfficer.name: named Grievance Officer');
if (empty(/grievanceOfficer:\s*\{[^}]*?designation:\s*''/s)) missing.push('grievanceOfficer.designation');
if (empty(/courtsCity:\s*''/)) missing.push('courtsCity: city whose courts hear disputes');
const recommended = [];
if (empty(/gstin:\s*''/)) recommended.push('gstin: GST number (shown to buyers as a trust signal)');

if (recommended.length) console.log(`check:legal: recommended, not required:\n  - ${recommended.join('\n  - ')}\n`);
if (!missing.length) { console.log('check:legal OK - every required legal fact is filled in.'); process.exit(0); }
console.log(`check:legal: ${missing.length} legal fact(s) still to be confirmed in src/config/legal.ts:\n  - ${missing.join('\n  - ')}`);
console.log('The policies show "To be confirmed" for these. Add them before launch (npm run check:legal -- --strict).');
process.exit(process.argv.includes('--strict') ? 1 : 0);
