export type SocialPlatform = 'github' | 'linkedin' | 'instagram' | 'portfolio';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface Team {
  name: string;
  tagline: string;
  description: string;
}

/**
 * Colors lifted from a member's personal portfolio. They theme the member's
 * slide in the home hero and their profile page.
 */
export interface MemberPalette {
  /** Whether `background` is light or dark, so chrome drawn over it can adapt. */
  tone: 'light' | 'dark';
  background: string;
  /** Oversized decorative text drawn behind the content. */
  ghost: string;
  text: string;
  accent: string;
  /** Translucent fill for hover states on `background`. */
  hover: string;
}

export interface Member {
  /** URL-safe unique id. Used in routes: /members/:slug */
  slug: string;
  name: string;
  role: string;
  socials: SocialLink[];
  palette: MemberPalette;
}

/** A discipline the team offers, led by one member. */
export interface Service {
  /** Slug of the member who leads it. */
  lead: string;
  title: string;
  description: string;
  tools: string[];
}

export interface Award {
  /** Display year, e.g. '2026' or '2025–26'. */
  year: string;
  title: string;
  detail: string;
  tag: string;
}

export type ProjectStatus = 'completed' | 'in-progress' | 'planned';

export interface Project {
  /** URL-safe unique id. Also names the project's screenshot file. */
  slug: string;
  title: string;
  tagline: string;
  status: ProjectStatus;
  /** Shown under "Recent projects" on the home page. */
  featured?: boolean;
  /** Slugs of the members who worked on the project. */
  memberSlugs: string[];
  repoUrl?: string;
  liveUrl?: string;
}
