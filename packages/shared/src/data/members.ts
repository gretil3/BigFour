import type { Member, SocialPlatform } from '../types';

export const socialPlatformLabels: Record<SocialPlatform, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  portfolio: 'Portfolio',
};

export const members: Member[] = [
  {
    slug: 'david',
    name: 'David Sinambela',
    role: 'Software Engineer · UI/UX & QA',
    motto: 'Less Decision, more focus',
    socials: [
      { platform: 'github', url: 'https://github.com/gretil3' },
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/david-sinambela-754a89324/' },
      { platform: 'instagram', url: 'https://www.instagram.com/dvd_snmbela4/' },
    ],
    // Dark forest: fern and firefly on night-forest green
    palette: {
      tone: 'dark',
      background: '#07100B',
      hero: '#12301F',
      surface: '#0E1A14',
      text: '#EEF3EA',
      muted: '#9DB3A4',
      border: 'rgba(163, 230, 186, 0.1)',
      accent: '#6FCF8F',
      accentSoft: '#D9F99D',
      ghost: '#D9F99D',
    },
    // Fraunces headings over Inter, `// code` labels, rounded cards, pines and fireflies
    style: { typeface: 'serif', shape: 'round', label: 'slashes', backdrop: 'forest' },
  },
  {
    slug: 'kevin',
    name: 'Kevin Sukias K',
    role: 'Software Engineer · PM',
    socials: [{ platform: 'portfolio', url: 'https://kevin-sukias.vercel.app/' }],
    // Green wave: sage and foam on deep green, cream type
    palette: {
      tone: 'dark',
      background: '#09110D',
      hero: '#2C382F',
      surface: '#111D18',
      text: '#EEEAE0',
      muted: '#ABAEA4',
      border: '#25352E',
      accent: '#7CBC97',
      accentSoft: '#C1E1D3',
      ghost: '#EEEAE0',
    },
    // Narrow uppercase Instrument Sans, wide-tracked caps, crisp corners, contour lines
    style: { typeface: 'condensed', shape: 'crisp', label: 'spaced', backdrop: 'waves' },
  },
  {
    slug: 'gerald',
    name: 'Gerald Adli',
    role: 'AI Engineer · Backend',
    socials: [
      { platform: 'github', url: 'https://github.com/geraldadli' },
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/gerald-adli' },
    ],
    // Editorial black + lime
    palette: {
      tone: 'dark',
      background: '#080808',
      hero: '#080808',
      surface: '#101010',
      text: '#F5F5F0',
      muted: '#A5A5A0',
      border: '#30302E',
      accent: '#BBFF36',
      accentSoft: '#D2FB80',
      ghost: '#BBFF36',
    },
    // Heavy uppercase Inter, ( bracketed ) labels, square corners, flat black
    style: { typeface: 'grotesk', shape: 'sharp', label: 'brackets', backdrop: 'none' },
  },
  {
    slug: 'fiko',
    name: 'Fiko van Houten',
    role: 'System Architecture · Engineer',
    socials: [
      { platform: 'github', url: 'https://github.com/phuuun' },
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/fikovanhouten/' },
    ],
    // Apple-style black + blue
    palette: {
      tone: 'dark',
      background: '#000000',
      hero: '#000000',
      surface: '#0A0A0A',
      text: '#F5F5F7',
      muted: '#86868B',
      border: 'rgba(255, 255, 255, 0.08)',
      accent: '#2997FF',
      accentSoft: '#52AAFF',
      ghost: '#F5F5F7',
    },
    // System UI font, blue mono labels, soft corners, flat black
    style: { typeface: 'system', shape: 'soft', label: 'mono', backdrop: 'none' },
  },
];

export function getMemberBySlug(slug: string): Member | undefined {
  return members.find((member) => member.slug === slug);
}

export function getFirstName(member: Member): string {
  return member.name.split(' ')[0] ?? member.name;
}
