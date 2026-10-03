/**
 * Scrolls to the element with `id`: smoothly, or at once when the user prefers
 * reduced motion. Returns false when there is no such element, so a link can fall
 * back to its plain #hash behavior.
 */
export function scrollToId(id: string): boolean {
  const target = document.getElementById(id);
  if (!target) return false;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  return true;
}
