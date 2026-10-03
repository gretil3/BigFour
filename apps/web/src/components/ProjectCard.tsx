import { Link } from 'react-router';
import { projectStatusLabels, type Project } from '@bigfour/shared';
import { getProjectImage } from '../lib/assets';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  /** Makes the whole card a link. */
  to?: string;
}

export function ProjectCard({ project, to }: ProjectCardProps) {
  const image = getProjectImage(project.slug);
  const content = (
    <>
      <div className={styles.media}>
        {image ? (
          <img
            className={styles.image}
            src={image}
            alt={`${project.title} screenshot`}
            loading="lazy"
          />
        ) : (
          <span className={styles.noImage}>{project.slug} — screenshot</span>
        )}
        <span className={styles.status} data-status={project.status}>
          <span className={styles.dot} />
          {projectStatusLabels[project.status]}
        </span>
      </div>
      <div className={styles.text}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.tagline}>{project.tagline}</p>
      </div>
    </>
  );

  return to ? (
    <Link to={to} className={styles.card}>
      {content}
    </Link>
  ) : (
    <article className={styles.card}>{content}</article>
  );
}

export function ProjectGrid({ projects, linkTo }: { projects: Project[]; linkTo?: string }) {
  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} to={linkTo} />
      ))}
    </div>
  );
}
