import type { Member, Project, Service } from '@bigfour/shared';

export interface MemberLayoutProps {
  member: Member;
  /** Services this member leads. */
  services: Service[];
  /** Projects this member worked on. */
  projects: Project[];
}
