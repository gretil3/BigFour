import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/** The page's smooth scroller while one runs; none for visitors who prefer reduced motion. */
let lenis: Lenis | undefined;

/**
 * Eases wheel and trackpad scrolling into a gentle glide for as long as the calling component
 * is mounted. Touch keeps the device's own native scrolling. In-page `#` links glide too, and
 * land below the sticky header through the root's scroll-padding.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const instance = new Lenis({ autoRaf: true, lerp: 0.1, anchors: true });
    lenis = instance;
    return () => {
      instance.destroy();
      if (lenis === instance) lenis = undefined;
    };
  }, []);
}

/** Jumps to the top at once, as a new page should start, without the scroller pulling back. */
export function jumpToTop() {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true, force: true });
  } else {
    window.scrollTo(0, 0);
  }
}

/** Holds the page still, for example behind a modal. Returns the function that lets it go. */
export function holdScroll(): () => void {
  const root = document.documentElement;
  const held = lenis;
  held?.stop();
  root.style.overflow = 'hidden';
  return () => {
    root.style.overflow = '';
    held?.start();
  };
}
