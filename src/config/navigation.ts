/** Navigation, derived from the page registry (`pages.ts`). Edit the registry, not this file. */
import { PAGE_LIST, type PageDef } from './pages';

export interface NavLink {
  label: string;
  href: string;
}

const link = (p: PageDef, short = false): NavLink => ({ label: short ? (p.shortName ?? p.name) : p.name, href: p.path });
const inFooter = (col: NonNullable<PageDef['footer']>) => PAGE_LIST.filter(([, p]) => p.footer === col).map(([, p]) => link(p, col === 'legal'));

export const PRIMARY_NAV: readonly NavLink[] = PAGE_LIST.filter(([, p]) => p.nav).map(([, p]) => link(p));
export const FOOTER_EXPLORE: readonly NavLink[] = inFooter('explore');
export const FOOTER_COMPANY: readonly NavLink[] = inFooter('company');
export const LEGAL_NAV: readonly NavLink[] = inFooter('legal');
