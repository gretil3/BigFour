import { useLayoutEffect, useRef } from 'react';
import type { Member, MemberStyle } from '@bigfour/shared';

type Vars = Record<string, string>;

const INTER = "'Inter Variable', system-ui, sans-serif";
const FRAUNCES = "'Fraunces Variable', Georgia, serif";
const INSTRUMENT = "'Instrument Sans Variable', 'Helvetica Neue', Arial, sans-serif";
const SYSTEM =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI Variable Text', 'Segoe UI', system-ui, sans-serif";
const SYSTEM_MONO = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace";

/*
 * Each preset reproduces the type measured on the member's own site. Every member ends
 * their hero headline with a period, so the display text here does too.
 */
const typefaces: Record<MemberStyle['typeface'], Vars> = {
  // David: Fraunces 500 headings in sentence case over Inter body text.
  serif: {
    '--font-sans': INTER,
    '--font-heading': FRAUNCES,
    '--heading-weight': '500',
    '--heading-weight-sm': '500',
    '--heading-tracking': '-0.025em',
    '--heading-scale': '1.05',
    '--font-display': FRAUNCES,
    '--display-weight': '500',
    '--display-tracking': '-0.035em',
    '--display-transform': 'none',
    '--display-scale': '0.72',
    '--display-after': "'.'",
    '--action-weight': '500',
  },
  // Kevin: Instrument Sans 500 at "wdth" 88, uppercase and tight, with mono "VIEW DETAILS" links.
  condensed: {
    '--font-sans': INSTRUMENT,
    '--font-heading': INSTRUMENT,
    '--heading-weight': '500',
    '--heading-weight-sm': '500',
    '--heading-tracking': '-0.04em',
    '--heading-stretch': '88%',
    '--heading-transform': 'uppercase',
    '--heading-leading': '0.95',
    '--heading-scale': '1.15',
    '--font-display': INSTRUMENT,
    '--display-weight': '500',
    '--display-tracking': '-0.04em',
    '--display-stretch': '88%',
    '--display-scale': '0.86',
    '--display-after': "'.'",
    '--action-font': 'var(--font-mono)',
    '--action-size': '11px',
    '--action-weight': '500',
    '--action-transform': 'uppercase',
    '--action-tracking': '0.1em',
  },
  // Gerald: Inter 700, uppercase, very tight, and section titles that end with a period.
  grotesk: {
    '--font-sans': INTER,
    '--font-heading': INTER,
    '--heading-weight': '700',
    '--heading-weight-sm': '700',
    '--heading-tracking': '-0.06em',
    '--heading-transform': 'uppercase',
    '--heading-leading': '0.95',
    '--heading-scale': '1.3',
    '--heading-after': "'.'",
    '--font-display': INTER,
    '--display-weight': '700',
    '--display-tracking': '-0.05em',
    '--display-scale': '0.8',
    '--display-after': "'.'",
    '--action-size': '12px',
    '--action-weight': '650',
    '--action-transform': 'uppercase',
    '--action-tracking': '0.02em',
  },
  // Fiko: the platform's own UI font (SF Pro on Apple devices), 600 and tight, Apple style.
  system: {
    '--font-sans': SYSTEM,
    '--font-mono': SYSTEM_MONO,
    '--font-heading': SYSTEM,
    '--heading-weight': '600',
    '--heading-weight-sm': '600',
    '--heading-tracking': '-0.035em',
    '--font-display': SYSTEM,
    '--display-weight': '600',
    '--display-tracking': '-0.045em',
    '--display-transform': 'none',
    '--display-scale': '0.7',
    '--display-after': "'.'",
    '--action-weight': '500',
  },
};

const shapes: Record<MemberStyle['shape'], Vars> = {
  sharp: { '--radius-card': '4px', '--radius-media': '3px', '--radius-pill': '3px' },
  crisp: { '--radius-card': '8px', '--radius-media': '6px', '--radius-pill': '999px' },
  soft: { '--radius-card': '14px', '--radius-media': '12px', '--radius-pill': '999px' },
  round: { '--radius-card': '18px', '--radius-media': '14px', '--radius-pill': '999px' },
};

const labels: Record<MemberStyle['label'], Vars> = {
  // David: `// Services` in JetBrains Mono, sentence case, muted green.
  slashes: {
    '--label-size': '13px',
    '--label-weight': '400',
    '--label-transform': 'none',
    '--label-tracking': '0.02em',
    '--label-before': "'// '",
  },
  // Gerald: `( SERVICES )` in 11px semibold sans caps, and nav links dressed the same.
  brackets: {
    '--label-font': 'var(--font-sans)',
    '--label-size': '11px',
    '--label-weight': '600',
    '--label-tracking': '0.08em',
    '--label-color': 'var(--color-heading)',
    '--label-before': "'( '",
    '--label-after': "' )'",
    '--nav-size': '11px',
    '--nav-weight': '600',
    '--nav-transform': 'uppercase',
    '--nav-tracking': '0.04em',
    '--nav-before': "'( '",
    '--nav-after': "' )'",
  },
  // Kevin: wide-tracked sans caps for labels and nav.
  spaced: {
    '--label-font': 'var(--font-sans)',
    '--label-weight': '500',
    '--label-tracking': '0.2em',
    '--label-color': 'var(--color-heading)',
    '--nav-size': '12px',
    '--nav-transform': 'uppercase',
    '--nav-tracking': '0.2em',
  },
  // Fiko: small mono caps in the accent blue.
  mono: {
    '--label-weight': '400',
    '--label-tracking': '0.06em',
    '--label-color': 'var(--color-accent)',
    '--nav-size': '13px',
    '--nav-weight': '400',
  },
};

/** Every CSS property a member theme may set on <html>. Anything it leaves out falls back to the default. */
const themeProperties = [
  'color-scheme',
  '--color-bg',
  '--color-hero',
  '--color-surface',
  '--color-heading',
  '--color-text',
  '--color-muted',
  '--color-border',
  '--color-accent',
  '--color-accent-soft',
  '--color-ghost',
  ...new Set(
    [...Object.values(typefaces), ...Object.values(shapes), ...Object.values(labels)].flatMap(
      Object.keys,
    ),
  ),
];

function themeOf({ palette, style }: Member): Vars {
  return {
    'color-scheme': palette.tone,
    '--color-bg': palette.background,
    '--color-hero': palette.hero,
    '--color-surface': palette.surface,
    '--color-heading': palette.text,
    '--color-text': palette.text,
    '--color-muted': palette.muted,
    '--color-border': palette.border,
    '--color-accent': palette.accent,
    '--color-accent-soft': palette.accentSoft,
    '--color-ghost': palette.ghost,
    ...typefaces[style.typeface],
    ...shapes[style.shape],
    ...labels[style.label],
  };
}

function setTheme(root: HTMLElement, member: Member | undefined) {
  const theme = member ? themeOf(member) : {};
  for (const name of themeProperties) {
    const value = theme[name];
    if (value === undefined) {
      root.style.removeProperty(name);
    } else {
      root.style.setProperty(name, value);
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
 * Themes the whole site, colors, type, corners and labels, as `member` while the calling
 * component is mounted; `undefined` keeps BigFour's own theme. Switching members fades the
 * colors over --hero-duration. Mounting and unmounting switch at once, so a page never fades in.
 */
export function useMemberTheme(member: Member | undefined) {
  const mounted = useRef(false);

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (mounted.current) {
      setTheme(root, member);
    } else {
      withoutTransition(root, () => setTheme(root, member));
      mounted.current = true;
    }
  }, [member]);

  useLayoutEffect(
    () => () => {
      const root = document.documentElement;
      withoutTransition(root, () => setTheme(root, undefined));
      mounted.current = false;
    },
    [],
  );
}
