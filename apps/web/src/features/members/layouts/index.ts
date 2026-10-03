import { createElement, type ComponentType } from 'react';
import { DefaultMemberLayout } from './DefaultMemberLayout';
import type { MemberLayoutProps } from './types';

export type { MemberLayoutProps } from './types';

/**
 * Each member can have a profile layout inspired by their own portfolio.
 * Create a component that accepts `MemberLayoutProps`, then register it by member slug:
 *
 *   'member-one': MemberOneLayout,
 *
 * Members without an entry fall back to `DefaultMemberLayout`.
 */
const memberLayouts: Record<string, ComponentType<MemberLayoutProps>> = {};

/** Renders the registered layout for `member`, or the default one. */
export function MemberLayout(props: MemberLayoutProps) {
  return createElement(memberLayouts[props.member.slug] ?? DefaultMemberLayout, props);
}
