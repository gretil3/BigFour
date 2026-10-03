import { getFirstName, socialPlatformLabels, team } from '@bigfour/shared';
import { Backdrop } from '../../../components/Backdrop';
import { ProjectGrid } from '../../../components/ProjectCard';
import { Section, SectionHeader } from '../../../components/Section';
import { ServiceGrid } from '../../../components/ServiceCard';
import styles from './DefaultMemberLayout.module.css';
import type { MemberLayoutProps } from './types';

export function DefaultMemberLayout({ member, services, projects }: MemberLayoutProps) {
  const firstName = getFirstName(member);

  return (
    <article>
      <title>{`${member.name} · ${team.name}`}</title>
      <header className={styles.band}>
        <Backdrop name={member.style.backdrop} />
        <span className={styles.ghost} aria-hidden="true">
          {firstName}
        </span>
        <div className={styles.intro}>
          <p className={styles.role}>{member.role}</p>
          <h1 className={styles.name}>{member.name}</h1>
          {member.socials.length > 0 && (
            <ul className={styles.socials}>
              {member.socials.map((social) => (
                <li key={social.url}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.social}
                  >
                    {socialPlatformLabels[social.platform]} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {services.length > 0 && (
        <Section labelledBy="member-services-title">
          <SectionHeader
            eyebrow="Discipline"
            title={`What ${firstName} leads`}
            titleId="member-services-title"
          />
          <ServiceGrid services={services} />
        </Section>
      )}

      {projects.length > 0 && (
        <Section labelledBy="member-projects-title">
          <SectionHeader eyebrow="Work" title="Projects" titleId="member-projects-title" />
          <ProjectGrid projects={projects} />
        </Section>
      )}
    </article>
  );
}
