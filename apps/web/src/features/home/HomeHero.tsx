import { useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Link } from 'react-router';
import { getFirstName, members, team } from '@bigfour/shared';
import { Backdrop } from '../../components/Backdrop';
import { ArrowLeftIcon, ArrowRightIcon } from '../../components/icons';
import { getMemberCutout } from '../../lib/assets';
import { cx } from '../../lib/cx';
import { formatIndex } from '../../lib/format';
import { useMemberTheme } from '../../lib/theme';
import { useInkAlign } from '../../lib/useInkAlign';
import { MemberCutout } from './MemberCutout';
import { TeamPanels } from './TeamPanels';
import styles from './HomeHero.module.css';

/** Matches --hero-duration, so a new slide change can't start mid-transition. */
const SLIDE_DURATION_MS = 650;

/** BigFour's own slide comes first, then one slide per member. */
const SLIDE_COUNT = members.length + 1;

type SlidePosition = 'center' | 'left' | 'right' | 'back';

function getSlidePosition(index: number, active: number): SlidePosition {
  const count = members.length;
  if (index === active) return 'center';
  if (index === (active + count - 1) % count) return 'left';
  if (index === (active + 1) % count) return 'right';
  return 'back';
}

/**
 * Full-screen carousel: BigFour's own slide, then one slide per member. A member's slide
 * re-themes the whole site with their portfolio's colors, type and scenery. BigFour's slide
 * keeps the site's own theme and shows the four members' scenery side by side, as four panels.
 * The text layout is the same on every slide.
 */
export function HomeHero() {
  const [active, setActive] = useState(0);
  const sliding = useRef(false);
  const wordmarkRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const onTeam = active === 0;
  const member = onTeam ? undefined : members[active - 1];
  useMemberTheme(member);
  // The two large lines start exactly on the edge the smaller text starts on.
  useInkAlign(wordmarkRef, active);
  useInkAlign(titleRef, active);

  /** Moves to another slide, unless one is still sliding in. */
  function change(next: (index: number) => number) {
    if (sliding.current) return;
    sliding.current = true;
    window.setTimeout(() => {
      sliding.current = false;
    }, SLIDE_DURATION_MS);
    setActive(next);
  }

  function step(direction: 1 | -1) {
    change((index) => (index + direction + SLIDE_COUNT) % SLIDE_COUNT);
  }

  const slides = [team.name, ...members.map(getFirstName)];

  return (
    <MotionConfig reducedMotion="user">
      <section className={styles.hero} aria-labelledby="hero-title" aria-roledescription="carousel">
        <p className={styles.srOnly} aria-live="polite">
          {member
            ? `Slide ${active + 1} of ${SLIDE_COUNT}: ${member.name}, ${member.role}`
            : `Slide 1 of ${SLIDE_COUNT}: ${team.name}, all four of us`}
        </p>

        <AnimatePresence initial={false}>
          {onTeam && (
            <motion.div
              key="team"
              className={styles.layer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: SLIDE_DURATION_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
            >
              <TeamPanels />
            </motion.div>
          )}
        </AnimatePresence>

        {member && (
          <>
            <Backdrop name={member.style.backdrop} />
            <div className={styles.grain} aria-hidden="true" />

            <p className={styles.status} aria-hidden="true">
              <span className={styles.counter}>
                {formatIndex(active + 1)} / {formatIndex(SLIDE_COUNT)}
              </span>
              <span>{member.name}</span>
              <span className={styles.role}>{member.role}</span>
            </p>

            <div className={styles.stage}>
              {members.map((slideMember, index) => {
                // No photo yet, no slide: the hero shows nothing in its place.
                const cutout = getMemberCutout(slideMember.slug);
                if (!cutout) return null;

                return (
                  <div
                    key={slideMember.slug}
                    className={styles.slide}
                    data-position={getSlidePosition(index, active - 1)}
                    aria-hidden={index !== active - 1}
                  >
                    <MemberCutout member={slideMember} src={cutout} />
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className={styles.copy}>
          <p
            ref={wordmarkRef}
            className={cx(styles.wordmark, onTeam && styles.wordmarkTeam)}
            aria-hidden="true"
          >
            {team.name}
          </p>
          <h1 ref={titleRef} id="hero-title" className={styles.title}>
            {team.tagline}
          </h1>
          <p className={styles.description}>{team.description}</p>
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.control}
              aria-label="Previous slide"
              onClick={() => step(-1)}
            >
              <ArrowLeftIcon size={24} />
            </button>
            <button
              type="button"
              className={styles.control}
              aria-label="Next slide"
              onClick={() => step(1)}
            >
              <ArrowRightIcon size={24} />
            </button>
          </div>
          <nav className={styles.index} aria-label="Slides">
            {slides.map((name, index) => (
              <button
                key={name}
                type="button"
                className={styles.indexItem}
                aria-label={index === 0 ? `Show ${team.name}` : `Show ${name}`}
                aria-current={index === active ? 'true' : undefined}
                onClick={() => change(() => index)}
              >
                <span className={styles.indexLine} aria-hidden="true" />
                <span className={styles.indexNumber}>{formatIndex(index + 1)}</span>
                <span className={styles.indexName}>{name}</span>
              </button>
            ))}
          </nav>
          <Link to="/projects" className={styles.explore}>
            Explore our projects
            <ArrowRightIcon size={20} />
          </Link>
        </div>
      </section>
    </MotionConfig>
  );
}
