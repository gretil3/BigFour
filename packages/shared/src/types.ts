export type SocialPlatform = 'github' | 'linkedin' | 'website' | 'email' | 'x' | 'instagram';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface Team {
  name: string;
  tagline: string;
  description: string;
}

export interface Member {
  /** URL-safe unique id. Used in routes: /members/:slug */
  slug: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  skills: string[];
  socials: SocialLink[];
  /** The member's own portfolio, which inspires their profile layout. */
  portfolioUrl?: string;
}

export type ProjectStatus = 'completed' | 'in-progress' | 'planned';

export type ProjectPlatform = 'web' | 'mobile';

export interface Project {
  /** URL-safe unique id. */
  slug: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  platforms: ProjectPlatform[];
  stack: string[];
  /** Slugs of the members who worked on the project. */
  memberSlugs: string[];
  repoUrl?: string;
  liveUrl?: string;
}
