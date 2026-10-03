import { createElement } from 'react';
import { memberHeroes } from './registry';
import { StandardHero } from './StandardHero';
import type { HeroProps } from './types';

/** Renders the member's own hero from the registry, or StandardHero. */
export function MemberHero(props: HeroProps) {
  return createElement(memberHeroes[props.member.slug] ?? StandardHero, props);
}
