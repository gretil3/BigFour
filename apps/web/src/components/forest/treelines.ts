/*
 * Procedural pine-forest silhouettes, ported from David's portfolio
 * (website_portofolio/src/lib/forest.ts). Seeded, so the skyline never changes.
 */
import { mulberry32 } from './seededRandom';

const VIEW_WIDTH = 1440;
// Extra tree/ground coverage past [0, VIEW_WIDTH] on both sides so wide
// viewports (where "slice" scaling reveals more than the nominal width)
// never expose blank canvas or a hard-sheared tree at the frame edge.
const BLEED = VIEW_WIDTH * 0.18;
const DOMAIN_WIDTH = VIEW_WIDTH + BLEED * 2;
// Breathing room above the tallest crown so apexes never graze the frame.
const CROWN_CLEARANCE = 8;

const round = (n: number) => Math.round(n * 10) / 10;

function pinePath(x: number, h: number, w: number, baseline: number) {
  const top = baseline - h;
  const tiers = 4;
  let d = '';
  for (let t = 0; t < tiers; t++) {
    const tierTop = top + h * 0.2 * t;
    const tierBottom = Math.min(baseline, tierTop + h * 0.38);
    const half = (w / 2) * (0.45 + 0.55 * ((t + 1) / tiers));
    d += `M${round(x)} ${round(tierTop)}L${round(x + half)} ${round(tierBottom)}L${round(x - half)} ${round(tierBottom)}Z`;
  }
  const trunk = Math.max(2, w * 0.05);
  d += `M${round(x - trunk)} ${round(top + h * 0.9)}H${round(x + trunk)}V${round(baseline)}H${round(x - trunk)}Z`;
  return d;
}

export interface TreelineLayer {
  d: string;
  viewBox: string;
  /** width / height of the viewBox. Drives the rendered height from the width. */
  aspect: number;
}

/**
 * The viewBox is sized to the layer's tallest tree instead of a shared canvas
 * height, so rendering the SVG at `height = width / aspect` shows every crown
 * in full.
 */
function buildTreeline(
  seed: number,
  count: number,
  minHeight: number,
  maxHeight: number,
): TreelineLayer {
  const baseline = maxHeight + CROWN_CLEARANCE;
  const rand = mulberry32(seed);
  // Scale the tree count so density matches across the bled margins.
  const paddedCount = Math.round((count * DOMAIN_WIDTH) / VIEW_WIDTH);
  const step = DOMAIN_WIDTH / paddedCount;
  let d = '';
  for (let i = 0; i <= paddedCount; i++) {
    const x = -BLEED + i * step + (rand() - 0.5) * step * 0.7;
    const h = minHeight + rand() * (maxHeight - minHeight);
    const w = h * (0.4 + rand() * 0.16);
    d += pinePath(x, h, w, baseline);
  }
  d += `M${-BLEED} ${round(baseline - 4)}H${VIEW_WIDTH + BLEED}V${round(baseline)}H${-BLEED}Z`;
  return {
    d,
    viewBox: `${-BLEED} 0 ${DOMAIN_WIDTH} ${round(baseline)}`,
    aspect: DOMAIN_WIDTH / baseline,
  };
}

export const TREELINES = {
  far: buildTreeline(7, 30, 80, 190),
  mid: buildTreeline(19, 18, 110, 225),
  near: buildTreeline(42, 10, 165, 275),
};
