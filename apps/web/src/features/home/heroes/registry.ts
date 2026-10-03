import type { ComponentType } from 'react';
import { ForestHero } from './ForestHero';
import type { HeroProps } from './types';

/**
 * Members whose home slide recreates the hero of their own portfolio, keyed by slug.
 * Everyone else gets StandardHero. To add one, build a component that takes
 * `HeroProps` (give its h1 HERO_TITLE_ID and its buttons data-hero-control) and list it here.
 */
export const memberHeroes: Record<string, ComponentType<HeroProps>> = {
  david: ForestHero,
};
