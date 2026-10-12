#!/usr/bin/env node
/**
 * Fails if a value that has a single source of truth is hard-coded elsewhere.
 *
 *   colours / fonts ........ src/theme/**
 *   spec numbers ........... src/config/specs.ts
 *   contact details ........ src/config/site.ts
 *   route paths ............ src/config/routes.ts
 *
 * Run: npm run check:theme
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('../src', import.meta.url).pathname;
const EXT = /\.(tsx?|css)$/;

const rules = [
  { name: 'hex colour literal', re: /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?![\w-])/, allow: ['theme/'], hint: 'add it to src/theme/colors.ts (or theme/art.ts) and use a token' },
  { name: 'rgb()/hsl() literal', re: /\b(?:rgba?|hsla?)\(\s*\d/, allow: ['theme/'], hint: 'use rgb(var(--<colour>-rgb) / alpha)' },
  { name: 'named colour', re: /\b(?:color|background(?:-color)?|fill|stroke|border-color)\s*[:=]\s*['"]?(?:white|black|red|gold|gray|grey|blue|green)\b/, allow: ['theme/'], hint: 'use a theme token' },
  { name: 'font-family literal', re: /font-family\s*:\s*(?!var\(|inherit)\S/, allow: ['theme/'], hint: 'font is set in src/theme/typography.ts' },
  { name: 'hard-coded route path', re: /href=(?:"|\{?['"`])\/(?!\/)[a-z]/, allow: ['config/'], hint: 'use ROUTES / PAGES / CTA from @/config' },
  { name: 'spec value', re: /\b(?:110V|240V|35 ?mm|24[- ]month|10A resistive)/, allow: ['config/specs.ts'], hint: 'reference SPEC from @/config' },
  { name: 'inline CTA label', re: />\s*(?:Book a Demo|Contact us|Explore the switch|View the product|Request a spec kit|Read the FAQ|Back to home|Plan this space|Ask about this product|Explore configurations)\s*</, allow: ['config/'], hint: 'use CTA from @/config (config/cta.ts)' },
  { name: 'contact detail', re: /@smartswitch\.io|\(800\) 555|Innovation Way/, allow: ['config/site.ts'], hint: 'reference APP_CONFIG from @/config' },
];

function* walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (EXT.test(f)) yield p;
  }
}

let problems = 0;
for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file);
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const r of rules) {
      if (r.allow.some((a) => rel.startsWith(a) || rel === a)) continue;
      if (r.re.test(line)) {
        problems++;
        console.log(`src/${rel}:${i + 1}  ${r.name}\n    ${line.trim().slice(0, 110)}\n    -> ${r.hint}`);
      }
    }
  });
}

if (problems) {
  console.log(`\n${problems} hard-coded value(s) found.`);
  process.exit(1);
}
console.log('check:theme OK — no hard-coded colours, fonts, specs, contact details or route paths outside their single source.');
