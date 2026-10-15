#!/usr/bin/env node
/**
 * Trust audit: fetches a RUNNING site and checks the things a careful first-time visitor would notice.
 *
 *   npm run check:trust                        audit http://localhost:3000 (start the site first: npm run build && npm start)
 *   npm run check:trust -- https://your-domain audit the live site
 *   npm run check:trust -- <url> --strict      launch gate: warnings become failures
 *
 * It reads the facts to compare against (phone, email, company name, ...) from src/config, so there is
 * nothing to keep in step. Exit code 1 means a failure.
 */
import { readFileSync } from 'node:fs';

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const BASE = (args.find((a) => /^https?:/.test(a)) ?? process.env.CHECK_BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
const host = new URL(BASE).host;
const isLocal = /^(localhost|127\.|0\.0\.0\.0)/.test(new URL(BASE).hostname);

// ---- facts from the site's own config ---------------------------------------------------------------------
const read = (p) => readFileSync(new URL(`../src/config/${p}`, import.meta.url), 'utf8');
const site = read('site.ts'), legal = read('legal.ts');
const str = (src, key) => src.match(new RegExp(`${key}:\\s*'([^']*)'`))?.[1] ?? '';
const F = {
  brand: str(site, 'BRAND_NAME'), phone: str(site, 'PHONE'), e164: str(site, 'PHONE_E164'), wa: str(site, 'WHATSAPP_NUMBER'),
  emails: [str(site, 'SUPPORT_EMAIL'), str(site, 'SALES_EMAIL')].filter(Boolean),
  entity: str(legal, 'entityName'), gstin: str(legal, 'gstin'), reg: str(legal, 'registrationNo'),
  address: /registeredAddress:\s*\[\s*\]/.test(legal) ? '' : 'set',
  officer: legal.match(/grievanceOfficer:\s*\{[^}]*?name:\s*'([^']*)'/s)?.[1] ?? '',
  courts: str(legal, 'courtsCity'),
};

// ---- helpers ----------------------------------------------------------------------------------------------
let fails = 0, warns = 0;
const ok = (n, d = '') => console.log(`PASS  ${n}${d ? '  ' + d : ''}`);
const fail = (n, d = '') => { fails++; console.log(`FAIL  ${n}${d ? '  ' + d : ''}`); };
const warn = (n, d = '') => { if (strict) { fails++; console.log(`FAIL  ${n}  (strict)  ${d}`); } else { warns++; console.log(`WARN  ${n}${d ? '  ' + d : ''}`); } };
const check = (c, n, d = '') => (c ? ok(n) : fail(n, d));
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const textOf = (html) => decode(html.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const get = async (path, init) => fetch(path.startsWith('http') ? path : BASE + path, { redirect: 'manual', ...init });

console.log(`Trust audit of ${BASE}${strict ? '  (strict)' : ''}\n`);

// ---- pages ------------------------------------------------------------------------------------------------
let paths = ['/'];
try {
  const sm = await (await get('/sitemap.xml')).text();
  paths = [...new Set(['/', ...[...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)])];
} catch { fail('sitemap.xml is readable'); }
const pages = {};
for (const p of paths) {
  const r = await get(p).catch(() => null);
  if (!r || r.status !== 200) { fail(`page ${p} loads`, r ? String(r.status) : 'no response'); continue; }
  const html = await r.text();
  pages[p] = { html, text: textOf(html), headers: r.headers };
}
check(Object.keys(pages).length === paths.length && paths.length >= 12, `all ${paths.length} pages in the sitemap load (200)`);
const nf = await get('/this-page-does-not-exist-123');
check(nf.status === 404, 'unknown address returns a real 404 page');

// ---- identity -----------------------------------------------------------------------------------------------
const home = pages['/'];
if (home) {
  check(home.text.includes(`${F.brand} is sold by ${F.entity || F.brand}`), 'footer says who sells the product', `expected "${F.brand} is sold by ${F.entity || F.brand}"`);
  check(/id="trust"/.test(home.html) && /How buying works/.test(home.text) && /Who sells it/.test(home.text), 'home page has the "buy with confidence" section');
  check(home.text.includes('Room images are illustrations'), 'room images are labelled as illustrations');
}
for (const p of ['/contact', '/about', '/privacy-policy', '/terms-and-conditions']) {
  if (pages[p]) check(!F.entity || pages[p].text.includes(F.entity), `${p} names ${F.entity || 'the business'}`);
}
if (F.gstin) { check(/^\d{2}[A-Z]{5}\d{4}[A-Z][A-Z\d]Z[A-Z\d]$/.test(F.gstin), 'GSTIN has a valid format'); check(Object.values(pages).every((p) => !/Registered office|GSTIN/.test(p.text) || true) && home?.text.includes(F.gstin), 'GSTIN is shown on the site'); }
else warn('GSTIN is not set', 'add legal.gstin in src/config/legal.ts; a visible tax number reassures buyers');
if (!F.address) warn('registered address is not set', 'src/config/legal.ts');
if (!F.officer) warn('Grievance Officer is not named', 'src/config/legal.ts (required by Indian rules)');
if (!F.courts) warn('jurisdiction city is not set', 'src/config/legal.ts');

// ---- contact details are the same everywhere -----------------------------------------------------------
const allHtml = Object.entries(pages);
const badLinks = [];
for (const [p, { html }] of allHtml) {
  for (const m of html.matchAll(/href="(mailto:[^"?]+)/g)) if (!F.emails.includes(decodeURIComponent(m[1].slice(7)))) badLinks.push(`${p} ${m[1]}`);
  for (const m of html.matchAll(/href="tel:([^"]+)/g)) if (m[1] !== F.e164) badLinks.push(`${p} tel:${m[1]}`);
  for (const m of html.matchAll(/href="https:\/\/wa\.me\/(\d+)/g)) if (m[1] !== F.wa) badLinks.push(`${p} wa.me/${m[1]}`);
}
check(badLinks.length === 0, 'every email, phone and WhatsApp link matches the one set number and address', badLinks.slice(0, 3).join(', '));
const strayEmails = new Set(), strayPhones = new Set();
for (const [, { text }] of allHtml) {
  for (const m of text.matchAll(/[\w.+-]+@[\w-]+\.[\w.-]*\w/g)) if (!F.emails.includes(m[0])) strayEmails.add(m[0]);
  for (const m of text.matchAll(/\+\d{2}[\d\s]{9,14}\d/g)) if (m[0].replace(/\s/g, '') !== F.e164) strayPhones.add(m[0]);
}
check(strayEmails.size === 0 && strayPhones.size === 0, 'no other email or phone number appears in any page text', [...strayEmails, ...strayPhones].join(', '));
check(F.emails.every((e) => home?.text.includes(e)) && home?.text.includes(F.phone), 'contact details are visible on the home page');

// ---- nothing that looks fake or unfinished -------------------------------------------------------------
const PLACEHOLDER = /lorem ipsum|placeholder|\bTODO\b|\bTBD\b|coming soon|under construction|your-domain|example\.com|test@|asdf|\bfoo\b|dummy/i;
const FAKE = /testimonial|customer reviews?|\b\d(\.\d)?\s?(\/\s?5|stars?)\b|★|trusted by|as seen (in|on)|\b\d[\d,]*\+?\s+(happy\s+)?(customers|clients|homes|installations|installs)\b|award[- ]winning|#\s?1\b|number one|world.?class|\bguarantee/i;
const SAFE = /certified, licensed electrician|certification claim|no certification|none claimed|certifications?(?= none| not)/gi;
const ph = [], fk = [];
for (const [p, { text }] of allHtml) {
  const t = text.replace(SAFE, '');
  const a = t.match(PLACEHOLDER); if (a) ph.push(`${p}: ${a[0]}`);
  const b = t.match(FAKE); if (b) fk.push(`${p}: ${b[0]}`);
  const c = t.match(/\bcertified\b(?!, licensed)/i); if (c && !/licensed electrician|certified electrician/i.test(t.slice(Math.max(0, t.search(/\bcertified\b/i) - 40), t.search(/\bcertified\b/i) + 40))) fk.push(`${p}: certified`);
}
check(ph.length === 0, 'no placeholder or test text on any page', ph.slice(0, 3).join(' | '));
check(fk.length === 0, 'no invented proof (reviews, star ratings, customer counts, awards, "trusted by", guarantees)', fk.slice(0, 3).join(' | '));
const tbc = Object.entries(pages).filter(([p, v]) => /\/(privacy-policy|terms-and-conditions|cookies)$/.test(p) && /to be confirmed/i.test(v.text)).map(([p]) => p);
if (tbc.length) warn('legal pages still show "To be confirmed"', tbc.join(', ') + '  (fill src/config/legal.ts)');
else ok('legal pages are complete (no "To be confirmed")');

// ---- policies are reachable where data is collected ---------------------------------------------------
for (const p of ['/', '/contact', '/request-demo']) {
  if (!pages[p]) continue;
  const h = pages[p].html;
  check(['/privacy-policy', '/terms-and-conditions', '/cookies'].every((l) => h.includes(`href="${l}"`)), `${p} links to Privacy, Terms and Cookie policies`);
}
for (const p of ['/contact', '/request-demo']) if (pages[p]) check(/We use your details only to/.test(pages[p].text) && pages[p].html.includes('href="/privacy-policy"'), `${p}: form states how details are used and links the policy`);

// ---- internal links all work -------------------------------------------------------------------------------
const links = new Set();
for (const [, { html }] of allHtml) for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) links.add(m[1]);
const dead = [];
for (const l of links) { if (/^\/(_next|images|videos)\//.test(l) || pages[l]) continue; const r = await get(l); if (r.status >= 400) dead.push(`${l} (${r.status})`); }
check(dead.length === 0, `all ${links.size} internal links work`, dead.slice(0, 3).join(', '));

// ---- no third parties, no cookies, secure headers --------------------------------------------------------
const ALLOWED_EXT = new Set(['connect.facebook.net', 'www.facebook.com']);
const ext = new Set(), local = new Set();
for (const [, { html }] of allHtml) for (const m of html.matchAll(/<(?:script|link|img|iframe|source|video)[^>]+(?:src|href)="(https?:\/\/[^"]+)"/g)) { const u = new URL(m[1]); if (u.host === host || ALLOWED_EXT.has(u.host)) continue; if (u.hostname === 'localhost') { local.add(`${u.host}`); continue; } ext.add(u.host); }
check(ext.size === 0, 'pages load nothing from unauthorised external servers', [...ext].join(', '));
if (local.size) { if (isLocal) ok('addresses that point at localhost are expected while testing locally'); else fail('pages point at localhost (set NEXT_PUBLIC_SITE_URL to the live address and rebuild)', [...local].join(', ')); }
const cookies = []; for (const [p, v] of allHtml) if (v.headers.get('set-cookie')) cookies.push(p);
check(cookies.length === 0, 'no page sets a cookie', cookies.join(', '));
const h = home?.headers;
if (h) {
  check(h.get('x-content-type-options') === 'nosniff' && /sameorigin|deny/i.test(h.get('x-frame-options') ?? '') && !!h.get('referrer-policy'), 'security headers set (nosniff, frame, referrer)');
  check(!!h.get('strict-transport-security'), 'HSTS header set');
  check(!h.get('x-powered-by'), 'framework banner hidden');
}
if (isLocal) warn('site is served over plain http on localhost', 'the live site must use https'); else check(BASE.startsWith('https://'), 'live site uses https');

// ---- search and sharing identity ------------------------------------------------------------------------
const titles = Object.entries(pages).map(([p, v]) => [p, v.html.match(/<title>([^<]*)<\/title>/)?.[1]]);
check(titles.every(([, t]) => t) && new Set(titles.map(([, t]) => t)).size === titles.length, 'every page has its own title');
check(Object.values(pages).every((v) => /<meta name="description" content="[^"]{50,}/.test(v.html)), 'every page has a real description');
const canon = home?.html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? home?.html.match(/property="og:url" content="([^"]+)"/)?.[1] ?? '';
if (isLocal) ok('canonical address check skipped on localhost');
else check(canon.includes(host) && !canon.includes('localhost'), 'canonical and share address are the live domain (NEXT_PUBLIC_SITE_URL is set)', canon);
const ld = [...(home?.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) ?? [])].map((m) => { try { return JSON.parse(m[1]); } catch { return {}; } });
const org = ld.find((x) => x['@type'] === 'Organization');
check(!!org && (!F.entity || org.legalName === F.entity) && F.emails.includes(org.email) && org.telephone === F.e164, 'structured data names the business with the same contact details');
const og = home?.html.match(/property="og:image" content="([^"]+)"/)?.[1];
check(!!og && (await get(new URL(og, BASE).pathname)).status === 200, 'share image exists');
for (const f of ['/robots.txt', '/images/logo.png', '/icon.png']) check((await get(f)).status === 200, `${f} is served`);

console.log(`\n${fails ? `${fails} FAILED` : 'TRUST AUDIT PASSED'}${warns ? `, ${warns} warning(s)` : ''}`);
process.exit(fails ? 1 : 0);
