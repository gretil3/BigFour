import type { Project, ProjectStatus } from '../types';

export const projectStatusLabels: Record<ProjectStatus, string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  planned: 'Planned',
};

/** Display order of the status groups on the projects page. */
export const projectStatusOrder: ProjectStatus[] = ['completed', 'in-progress', 'planned'];

export const projects: Project[] = [
  {
    slug: 'civiceye',
    title: 'CivicEye',
    tagline: 'Civic issue reporting with community-funded fixes',
    status: 'completed',
    featured: true,
    memberSlugs: [],
  },
  {
    slug: 'kratt',
    title: 'Kratt',
    tagline: 'Scoring bot activity in YouTube comments',
    status: 'completed',
    featured: true,
    memberSlugs: ['david', 'kevin', 'gerald', 'fiko'],
  },
  {
    slug: 'owi',
    title: 'OWI — Online Web Investigator',
    tagline: 'Flagging coordinated buzzer campaigns',
    status: 'in-progress',
    featured: true,
    memberSlugs: [],
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectsByStatus(status: ProjectStatus): Project[] {
  return projects.filter((project) => project.status === status);
}

export function getProjectsByMember(memberSlug: string): Project[] {
  return projects.filter((project) => project.memberSlugs.includes(memberSlug));
}
