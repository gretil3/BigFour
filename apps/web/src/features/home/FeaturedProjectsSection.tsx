import { getFeaturedProjects } from '@bigfour/shared';
import { ProjectGrid } from '../../components/ProjectCard';
import { Section, SectionHeader } from '../../components/Section';
import { TextLink } from '../../components/TextLink';
import styles from './FeaturedProjectsSection.module.css';

export function FeaturedProjectsSection() {
  return (
    <Section id="featured" labelledBy="featured-title" className={styles.section}>
      <SectionHeader
        eyebrow="Featured work"
        title="Recent projects"
        titleId="featured-title"
        className={styles.header}
        aside={
          <TextLink to="/projects">
            All projects <span aria-hidden="true">→</span>
          </TextLink>
        }
      />
      <ProjectGrid projects={getFeaturedProjects()} linkTo="/projects" />
    </Section>
  );
}
