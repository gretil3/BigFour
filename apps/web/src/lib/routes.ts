import type { Member } from '@bigfour/shared';

/** Where a member's personal portfolio page lives. Every link to a member goes through here. */
export function memberPath(member: Pick<Member, 'slug'>): string {
  return `/members/${member.slug}`;
}
