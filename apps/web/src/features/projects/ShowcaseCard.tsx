import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router';
import { getFirstName, getMemberBySlug, type Member, type Project } from '@bigfour/shared';
import {
  ArrowUpRightIcon,
  InfoIcon,
  PlayIcon,
  PointerClickIcon,
  TerminalIcon,
} from '../../components/icons';
import { getProjectImage, getProjectTrailer } from '../../lib/assets';
import { memberPath } from '../../lib/routes';
import styles from './ShowcaseCard.module.css';

interface ShowcaseCardProps {
  project: Project;
  /** Opens the preview window on the project's trailer or on its live site. */
  onPreview: (project: Project, mode: 'trailer' | 'live') => void;
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
        {trailer ? (
          <CardTrailer src={trailer} poster={image} />
        ) : image ? (
          <img className={styles.image} src={image} alt={`${title} preview`} loading="lazy" />
        ) : (
          <span className={styles.noImage} aria-hidden="true">
            {title}
          </span>
        )}
        {(trailer || embedUrl) && (
          <div className={styles.overlay}>
            {trailer && (
              <button
                type="button"
                className={styles.pill}
                aria-label={`Watch the ${title} trailer`}
                onClick={() => onPreview(project, 'trailer')}
              >
                Watch trailer
                <PlayIcon size={13} />
              </button>
            )}
            {embedUrl && (
              <button
                type="button"
                className={trailer ? styles.pillSecondary : styles.pill}
                aria-label={`Try ${title} live`}
                onClick={() => onPreview(project, 'live')}
              >
                Try it live
                <PointerClickIcon size={14} />
              </button>
            )}
          </div>
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
                <Link to={memberPath(member)} className={styles.teamLink}>
                  {getFirstName(member)}
                </Link>
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

/**
 * The card's screenshot, replaced by its trailer: silent, on a loop, and with no controls, so
 * none of that can be changed. The file is only fetched once the card is near the screen, and
 * plays only while the card is on it. Visitors who prefer reduced motion keep the screenshot.
 * The buttons over it are what assistive technology gets.
 */
function CardTrailer({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true);
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={styles.image}
      src={near ? src : undefined}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
