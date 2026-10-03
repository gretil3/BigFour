import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { members, team } from '@bigfour/shared';
import { Backdrop } from '../../components/Backdrop';
import { ArrowLeftIcon, ArrowRightIcon } from '../../components/icons';
import { formatIndex } from '../../lib/format';
import { useMemberTheme } from '../../lib/theme';
import { MemberCutout } from './MemberCutout';
import styles from './HomeHero.module.css';

/** Matches --hero-duration, so a new slide change can't start mid-transition. */
const SLIDE_DURATION_MS = 650;

type SlidePosition = 'center' | 'left' | 'right' | 'back';

function getSlidePosition(index: number, active: number): SlidePosition {
  const count = members.length;
  if (index === active) return 'center';
  if (index === (active + count - 1) % count) return 'left';
  if (index === (active + 1) % count) return 'right';
  return 'back';
}

/**
 * Full-screen carousel of the members. Each slide re-themes the whole site,
 * from the header down to the footer, with that member's portfolio palette.
 */
export function HomeHero() {
  const [active, setActive] = useState(0);
  const lockedUntil = useRef(0);

  const member = members[active];
  useMemberTheme(member);
  if (!member) return null;

  function step(direction: 1 | -1) {
    const now = performance.now();
    if (now < lockedUntil.current) return;
    lockedUntil.current = now + SLIDE_DURATION_MS;
    setActive((index) => (index + direction + members.length) % members.length);
  }

  return (
    <section className={styles.hero} aria-labelledby="hero-title" aria-roledescription="carousel">
      <Backdrop name={member.style.backdrop} />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.ghost} aria-hidden="true">
        {team.name}
      </div>

      <p className={styles.status} aria-live="polite">
        <span className={styles.counter}>
          {formatIndex(active + 1)} / {formatIndex(members.length)}
        </span>
        <span>{member.name}</span>
        <span className={styles.role}>{member.role}</span>
      </p>

      <div className={styles.stage}>
        {members.map((slideMember, index) => (
          <div
            key={slideMember.slug}
            className={styles.slide}
            data-position={getSlidePosition(index, active)}
            aria-hidden={index !== active}
          >
            <MemberCutout member={slideMember} />
          </div>
        ))}
      </div>

      <div className={styles.copy}>
        <h1 id="hero-title" className={styles.title}>
          {team.tagline}
        </h1>
        <p className={styles.description}>{team.description}</p>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.control}
            aria-label="Previous member"
            onClick={() => step(-1)}
          >
            <ArrowLeftIcon size={26} />
          </button>
          <button
            type="button"
            className={styles.control}
            aria-label="Next member"
            onClick={() => step(1)}
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
    </section>
  );
}
