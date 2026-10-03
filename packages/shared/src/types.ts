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
 * Colors lifted from a member's personal portfolio. While the member is featured
 * (their home hero slide, their profile page) they theme the whole site.
 */
export interface MemberPalette {
  /** Whether the backgrounds are light or dark, so browser UI like scrollbars can match. */
  tone: 'light' | 'dark';
  /** Page background. */
  background: string;
  /** Hero slide and profile band. Often brighter than `background`, like the member's own hero. */
  hero: string;
  /** Cards and other raised panels. */
  surface: string;
  /** Headings and body text. */
  text: string;
  /** Secondary text. */
  muted: string;
  /** Hairlines and card borders. */
  border: string;
  /** Signature color: numbers, eyebrows, links and active states. */
  accent: string;
  /** Lighter take on `accent`, for tags and link hovers. */
  accentSoft: string;
  /** Oversized decorative text drawn behind the hero. */
  ghost: string;
}

/**
 * The character of a member's personal portfolio beyond its colors. Together with
 * `palette` it restyles the whole site while the member is featured. Each value
 * names a look; the web app decides how to draw it.
 */
export interface MemberStyle {
  /**
   * serif: editorial serif headings. condensed: narrow uppercase sans. grotesk: heavy,
   * tightly set uppercase sans. system: the platform's own UI font.
   */
  typeface: 'serif' | 'condensed' | 'grotesk' | 'system';
  /** Corners of cards, images and pills, from square to generous. */
  shape: 'sharp' | 'crisp' | 'soft' | 'round';
  /**
   * Small labels and nav links: slashes (`// Services`), brackets (`( SERVICES )`),
   * spaced (wide-tracked caps) or mono (code-style caps).
   */
  label: 'slashes' | 'brackets' | 'spaced' | 'mono';
  /** Decorative scenery behind the hero. */
  backdrop: 'forest' | 'waves' | 'none';
}

export interface Member {
  /** URL-safe unique id. Used in routes: /members/:slug */
  slug: string;
  name: string;
  role: string;
  socials: SocialLink[];
  palette: MemberPalette;
  style: MemberStyle;
}

/** A discipline the team offers, led by one member. */
export interface Service {
  /** Slug of the member who leads it. */
  lead: string;
  title: string;
  description: string;
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
  /** One short line, for compact cards such as "Recent projects" on the home page. */
  tagline: string;
  /** A few sentences, for the full project cards on the projects page. */
  description?: string;
  /** Callout under the description, e.g. for work in progress. */
  disclaimer?: string;
  techStack?: string[];
  status: ProjectStatus;
  /** Shown under "Recent projects" on the home page. */
  featured?: boolean;
  /** Slugs of the members who worked on the project. */
  memberSlugs: string[];
  /** Page opened in the "Try it live" window; the site must allow iframe embedding. */
  embedUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
}
