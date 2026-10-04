import { useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useLocation, type Location } from 'react-router';

function canAnimate(): boolean {
  return (
    typeof document.startViewTransition === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * The location the page should show. When the URL moves to another page it holds the old one,
 * lets the browser snapshot it, then swaps in the new page inside a View Transition, so the two
 * dissolve into each other (styled in global.css), theme, type and scenery included.
 * A change within the same page, such as a #hash, and browsers without View Transitions or
 * visitors who prefer reduced motion get the new location at once.
 */
export function usePageTransition(): Location {
  const location = useLocation();
  const [shown, setShown] = useState(location);
  const animate = location.pathname !== shown.pathname && canAnimate();
  // The newest location, for a swap that runs after a quicker second navigation.
  const latest = useRef(location);

  useLayoutEffect(() => {
    latest.current = location;
    if (!animate) return;
    const transition = document.startViewTransition(() => {
      flushSync(() => setShown(latest.current));
    });
    // A transition the browser skips, say in a background tab, still swaps the page.
    transition.ready.catch(() => {});
  }, [animate, location]);

  return animate ? shown : location;
}
