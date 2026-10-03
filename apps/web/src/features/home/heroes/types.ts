import type { Member } from '@bigfour/shared';

/** The id the hero section is labelled by. Only the hero currently on screen carries it. */
export const HERO_TITLE_ID = 'hero-title';

/** Marks a hero's carousel buttons (data-hero-control), so focus can follow to the next hero. */
export type HeroControl = 'previous' | 'next';

export interface HeroProps {
  /** The member whose slide is showing. Their theme is already applied to the site. */
  member: Member;
  /** Position of `member` in the carousel, from 0. */
  index: number;
  count: number;
  onPrevious: () => void;
  onNext: () => void;
}
