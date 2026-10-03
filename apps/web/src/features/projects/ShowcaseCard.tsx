import type { CSSProperties } from 'react';
import { getFirstName, getMemberBySlug, type Member, type Project } from '@bigfour/shared';
import {
  ArrowUpRightIcon,
  InfoIcon,
  PlayIcon,
  PointerClickIcon,
  TerminalIcon,
} from '../../components/icons';
import { getProjectImage, getProjectTrailer } from '../../lib/assets';
import styles from './ShowcaseCard.module.css';

interface ShowcaseCardProps {
  project: Project;
  /** Opens the project's preview window: its trailer, or its live site. */
  onPreview: (project: Project) => void;
}

/** A full project card: screenshot, who built it, description, tech stack and links. */
export function ShowcaseCard({ project, onPreview }: ShowcaseCardProps) {
  const { title, tagline, description, disclaimer, techStack, embedUrl, liveUrl, repoUrl } =
    project;
  const image = getProjectImage(project.slug);
  const trailer = getProjectTrailer(project.slug);
  const team = project.memberSlugs
    .map(getMemberBySlug)
    .filter((member): member is Member => member !== undefined);

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        {image ? (
          <img className={styles.image} src={image} alt={`${title} preview`} loading="lazy" />
        ) : (
          <span className={styles.noImage} aria-hidden="true">
            {title}
          </span>
        )}
        {(trailer || embedUrl) && (
          <button
            type="button"
            className={styles.tryLive}
            aria-label={trailer ? `Watch the ${title} trailer` : `Try ${title} live`}
            onClick={() => onPreview(project)}
          >
            <span className={styles.tryLivePill}>
              {trailer ? (
                <>
                  Watch trailer
                  <PlayIcon size={13} />
                </>
              ) : (
                <>
                  Try it live
                  <PointerClickIcon size={14} />
                </>
              )}
            </span>
          </button>
        )}
      </div>

      <div className={styles.body}>
        <h2 className={styles.title}>{title}</h2>
        {team.length > 0 && (
          <ul className={styles.team} aria-label="Built by">
            {team.map((member) => (
              <li
                key={member.slug}
                style={{ '--member-accent': member.palette.accent } as CSSProperties}
              >
                {getFirstName(member)}
              </li>
            ))}
          </ul>
        )}
        <p className={styles.description}>{description ?? tagline}</p>
        {disclaimer && (
          <p className={styles.disclaimer}>
            <InfoIcon size={14} />
            <span>{disclaimer}</span>
          </p>
        )}
        {techStack && techStack.length > 0 && (
          <ul className={styles.stack} aria-label="Tech stack">
            {techStack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        )}
        {(liveUrl || repoUrl) && (
          <div className={styles.actions}>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primary}
                aria-label={`Live demo: ${title} (opens in a new tab)`}
              >
                Live Demo
                <ArrowUpRightIcon size={14} />
              </a>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondary}
                aria-label={`Source code: ${title} (opens in a new tab)`}
              >
                <TerminalIcon size={14} />
                Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
