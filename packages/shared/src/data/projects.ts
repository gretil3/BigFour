import type { Project, ProjectStatus } from '../types';

export const projectStatusLabels: Record<ProjectStatus, string> = {
  completed: 'Completed',
  'in-progress': 'In progress',
  planned: 'Planned',
};

/** Display order of the status groups on the projects page. */
export const projectStatusOrder: ProjectStatus[] = ['completed', 'in-progress', 'planned'];

// TODO: replace the placeholders below with the real projects.
export const projects: Project[] = [
  {
    slug: 'bigfour-portfolio',
    title: 'BigFour Portfolio',
    summary: 'This group portfolio, available on the web and as a mobile app.',
    status: 'in-progress',
    platforms: ['web', 'mobile'],
    stack: ['TypeScript', 'React', 'React Native'],
    memberSlugs: ['member-one', 'member-two', 'member-three', 'member-four'],
  },
  {
    slug: 'completed-project',
    title: 'Completed Project',
    summary: 'Placeholder for a finished project.',
    status: 'completed',
    platforms: ['web'],
    stack: ['TypeScript', 'React'],
    memberSlugs: ['member-one'],
  },
  {
    slug: 'planned-project',
    title: 'Planned Project',
    summary: 'Placeholder for a project that is yet to be developed.',
    status: 'planned',
    platforms: ['web', 'mobile'],
    stack: ['TypeScript'],
    memberSlugs: [],
  },
];

export function getProjectsByStatus(status: ProjectStatus): Project[] {
  return projects.filter((project) => project.status === status);
}

export function getProjectsByMember(memberSlug: string): Project[] {
  return projects.filter((project) => project.memberSlugs.includes(memberSlug));
}
