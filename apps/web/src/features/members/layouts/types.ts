import type { Member, Project } from '@bigfour/shared';

export interface MemberLayoutProps {
  member: Member;
  /** Projects this member worked on. */
  projects: Project[];
}
