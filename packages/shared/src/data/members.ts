import type { Member } from '../types';

// TODO: replace the placeholders below with the real members.
export const members: Member[] = [
  {
    slug: 'member-one',
    name: 'Member One',
    role: 'Role / Title',
    tagline: 'A short line about what this member does best.',
    bio: 'A few sentences about this member.',
    skills: ['TypeScript', 'React'],
    socials: [],
  },
  {
    slug: 'member-two',
    name: 'Member Two',
    role: 'Role / Title',
    tagline: 'A short line about what this member does best.',
    bio: 'A few sentences about this member.',
    skills: ['TypeScript', 'React Native'],
    socials: [],
  },
  {
    slug: 'member-three',
    name: 'Member Three',
    role: 'Role / Title',
    tagline: 'A short line about what this member does best.',
    bio: 'A few sentences about this member.',
    skills: ['TypeScript', 'Node.js'],
    socials: [],
  },
  {
    slug: 'member-four',
    name: 'Member Four',
    role: 'Role / Title',
    tagline: 'A short line about what this member does best.',
    bio: 'A few sentences about this member.',
    skills: ['TypeScript', 'UI Design'],
    socials: [],
  },
];

export function getMemberBySlug(slug: string): Member | undefined {
  return members.find((member) => member.slug === slug);
}
