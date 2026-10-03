import { useLayoutEffect, useRef } from 'react';
import type { MemberPalette } from '@bigfour/shared';

/** Each property a member theme sets on <html>, and the palette color that fills it. */
const themeProperties = {
  'color-scheme': (palette) => palette.tone,
  '--color-bg': (palette) => palette.background,
  '--color-hero': (palette) => palette.hero,
  '--color-surface': (palette) => palette.surface,
  '--color-heading': (palette) => palette.text,
  '--color-text': (palette) => palette.text,
  '--color-muted': (palette) => palette.muted,
  '--color-border': (palette) => palette.border,
  '--color-accent': (palette) => palette.accent,
  '--color-accent-soft': (palette) => palette.accentSoft,
  '--color-ghost': (palette) => palette.ghost,
} satisfies Record<string, (palette: MemberPalette) => string>;

function setTheme(root: HTMLElement, palette: MemberPalette | undefined) {
  for (const [name, read] of Object.entries(themeProperties)) {
    if (palette) {
      root.style.setProperty(name, read(palette));
    } else {
      root.style.removeProperty(name);
    }
  }
}

/** Applies `change` with the theme transition off, so it lands at once. */
function withoutTransition(root: HTMLElement, change: () => void) {
  root.style.setProperty('transition', 'none');
  change();
  // Reading a computed value flushes styles, so the change is in place before transitions return.
  getComputedStyle(root).getPropertyValue('--color-bg');
  root.style.removeProperty('transition');
}

/**
 * Themes the whole site with a member's palette while the calling component is mounted;
 * `undefined` keeps BigFour's own theme. Switching palettes fades the site over
 * --hero-duration. Mounting and unmounting switch at once, so a page never fades in.
 */
export function useMemberTheme(palette: MemberPalette | undefined) {
  const mounted = useRef(false);

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (mounted.current) {
      setTheme(root, palette);
    } else {
      withoutTransition(root, () => setTheme(root, palette));
      mounted.current = true;
    }
  }, [palette]);

  useLayoutEffect(
    () => () => {
      const root = document.documentElement;
      withoutTransition(root, () => setTheme(root, undefined));
      mounted.current = false;
    },
    [],
  );
}
