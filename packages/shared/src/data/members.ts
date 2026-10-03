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
    socials: [
      { platform: 'github', url: 'https://github.com/gretil3' },
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/david-sinambela-754a89324/' },
      { platform: 'instagram', url: 'https://www.instagram.com/dvd_snmbela4/' },
    ],
    // Forest canopy
    palette: {
      tone: 'dark',
      background: '#12301F',
      ghost: '#D9F99D',
      text: '#F7FEE7',
      accent: '#6FCF8F',
      hover: 'rgba(217, 249, 157, 0.12)',
    },
  },
  {
    slug: 'kevin',
    name: 'Kevin Sukias K',
    role: 'Software Engineer · PM',
    socials: [{ platform: 'portfolio', url: 'https://kevin-sukias.vercel.app/' }],
    // BigFour emerald (Kevin's own palette is still pending)
    palette: {
      tone: 'dark',
      background: '#047857',
      ghost: '#FFFFFF',
      text: '#FFFFFF',
      accent: '#A7F3D0',
      hover: 'rgba(255, 255, 255, 0.12)',
    },
  },
  {
    slug: 'gerald',
    name: 'Gerald Adli',
    role: 'AI Engineer · Backend',
    socials: [
      { platform: 'github', url: 'https://github.com/geraldadli' },
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/gerald-adli' },
    ],
    // Research paper + terracotta
    palette: {
      tone: 'light',
      background: '#FAFAF9',
      ghost: '#B84825',
      text: '#202120',
      accent: '#B84825',
      hover: 'rgba(184, 72, 37, 0.08)',
    },
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
      ghost: '#F5F5F7',
      text: '#F5F5F7',
      accent: '#2997FF',
      hover: 'rgba(41, 151, 255, 0.14)',
    },
  },
];

export function getMemberBySlug(slug: string): Member | undefined {
  return members.find((member) => member.slug === slug);
}

export function getFirstName(member: Member): string {
  return member.name.split(' ')[0] ?? member.name;
}
