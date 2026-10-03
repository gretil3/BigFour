import { useIsPresent } from 'framer-motion';
import { Link } from 'react-router';
import { members, team } from '@bigfour/shared';
import { Backdrop } from '../../../components/Backdrop';
import { ArrowLeftIcon, ArrowRightIcon } from '../../../components/icons';
import { formatIndex } from '../../../lib/format';
import { MemberCutout } from '../MemberCutout';
import { HERO_TITLE_ID, type HeroProps } from './types';
import styles from './StandardHero.module.css';

type SlidePosition = 'center' | 'left' | 'right' | 'back';

function getSlidePosition(index: number, active: number): SlidePosition {
  const count = members.length;
  if (index === active) return 'center';
  if (index === (active + count - 1) % count) return 'left';
  if (index === (active + 1) % count) return 'right';
  return 'back';
}

/**
 * BigFour's own hero: the members' cutouts on stage under the oversized wordmark,
 * in the featured member's theme. Used for every member without a hero of their own.
 */
export function StandardHero({ member, index, count, onPrevious, onNext }: HeroProps) {
  const isPresent = useIsPresent();

  return (
    <>
      <Backdrop name={member.style.backdrop} />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.ghost} aria-hidden="true">
        {team.name}
      </div>

      <p className={styles.status}>
        <span className={styles.counter}>
          {formatIndex(index + 1)} / {formatIndex(count)}
        </span>
        <span>{member.name}</span>
        <span className={styles.role}>{member.role}</span>
      </p>

      <div className={styles.stage}>
        {members.map((slideMember, slideIndex) => (
          <div
            key={slideMember.slug}
            className={styles.slide}
            data-position={getSlidePosition(slideIndex, index)}
            aria-hidden={slideIndex !== index}
          >
            <MemberCutout member={slideMember} />
          </div>
        ))}
      </div>

      <div className={styles.copy}>
        <h1 id={isPresent ? HERO_TITLE_ID : undefined} className={styles.title}>
          {team.tagline}
        </h1>
        <p className={styles.description}>{team.description}</p>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.control}
            aria-label="Previous member"
            data-hero-control="previous"
            onClick={onPrevious}
          >
            <ArrowLeftIcon size={26} />
          </button>
          <button
            type="button"
            className={styles.control}
            aria-label="Next member"
            data-hero-control="next"
            onClick={onNext}
          >
            <ArrowRightIcon size={26} />
          </button>
        </div>
        <Link to="/projects" className={styles.exploreInline}>
          Explore our projects <span aria-hidden="true">→</span>
        </Link>
      </div>

      <Link to="/projects" className={styles.exploreCorner}>
        Explore our projects
        <ArrowRightIcon size={32} />
      </Link>
    </>
  );
}
