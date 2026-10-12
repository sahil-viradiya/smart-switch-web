/** Scroll helpers shared by pinned scenes, section navigation and "back to top". */

export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Scroll the window so a pinned scene element is at progress `p` (0..1). */
export function scrollToSceneProgress(el: HTMLElement, p: number) {
  const rect = el.getBoundingClientRect();
  const top = window.scrollY + rect.top;
  const total = el.offsetHeight - window.innerHeight;
  window.scrollTo({ top: top + total * clamp01(p), behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  try { history.replaceState(null, '', `#${id}`); } catch { /* ignore */ }
}
