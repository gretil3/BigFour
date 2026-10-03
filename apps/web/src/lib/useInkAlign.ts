import { useLayoutEffect, type RefObject } from 'react';

/**
 * Shifts an element left by its first glyph's side bearing, so the letter's ink, not its glyph
 * box, starts on the element's edge. Large type carries visible empty space before its first
 * letter, which makes a headline look indented next to smaller text set on the same edge.
 * `key` re-runs the measurement when the typeface changes, for example on a theme switch.
 */
export function useInkAlign(ref: RefObject<HTMLElement | null>, key: unknown) {
  useLayoutEffect(() => {
    const element = ref.current;
    const context = document.createElement('canvas').getContext('2d');
    if (!element || !context) return;

    const align = () => {
      const style = getComputedStyle(element);
      const text = element.textContent ?? '';
      const first = (style.textTransform === 'uppercase' ? text.toUpperCase() : text)
        .trimStart()
        .charAt(0);
      if (!first) return;
      context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      // Negative when the ink starts to the right of the glyph box's edge.
      element.style.marginLeft = `${context.measureText(first).actualBoundingBoxLeft}px`;
    };

    align();
    const observer = new ResizeObserver(align);
    observer.observe(element);
    // The typefaces load on demand; the measurement only counts once they are in.
    void document.fonts.ready.then(align);
    document.fonts.addEventListener('loadingdone', align);

    return () => {
      observer.disconnect();
      document.fonts.removeEventListener('loadingdone', align);
    };
  }, [ref, key]);
}
