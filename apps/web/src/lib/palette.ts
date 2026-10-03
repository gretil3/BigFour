import type { CSSProperties } from 'react';
import type { MemberPalette } from '@bigfour/shared';

/** Exposes a member palette to CSS as `--palette-*` custom properties. */
export function paletteStyle(palette: MemberPalette): CSSProperties {
  return {
    '--palette-bg': palette.background,
    '--palette-ghost': palette.ghost,
    '--palette-text': palette.text,
    '--palette-accent': palette.accent,
    '--palette-hover': palette.hover,
  } as CSSProperties;
}
