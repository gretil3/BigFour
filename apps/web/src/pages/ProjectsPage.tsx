import {
  getProjectsByStatus,
  projectStatusLabels,
  projectStatusOrder,
  team,
} from '@bigfour/shared';
import { ProjectGrid } from '../components/ProjectCard';
import { Section, SectionHeader } from '../components/Section';
import { formatIndex } from '../lib/format';
import styles from './ProjectsPage.module.css';

export function ProjectsPage() {
  return (
    <Section labelledBy="projects-title">
      <title>{`Projects · ${team.name}`}</title>
      <SectionHeader as="h1" eyebrow="Our work" title="Projects" titleId="projects-title" />
      {projectStatusOrder.map((status) => {
        const projects = getProjectsByStatus(status);
        if (projects.length === 0) return null;

        return (
          <section key={status} aria-labelledby={`projects-${status}`} className={styles.group}>
            <h2 id={`projects-${status}`} className={styles.groupTitle} data-status={status}>
              <span className={styles.dot} aria-hidden="true" />
              {projectStatusLabels[status]}
              <span className={styles.count}>{formatIndex(projects.length)}</span>
            </h2>
            {/* Grouped by status already, so the cards skip their status badge. */}
            <ProjectGrid projects={projects} showStatus={false} />
          </section>
        );
      })}
    </Section>
  );
}
