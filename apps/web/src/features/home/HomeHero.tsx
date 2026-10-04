import { useRef, useState, type PointerEvent } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router';
import { getFirstName, members, team } from '@bigfour/shared';
import { Backdrop } from '../../components/Backdrop';
import { ArrowLeftIcon, ArrowRightIcon } from '../../components/icons';
import { getMemberCutout } from '../../lib/assets';
import { cx } from '../../lib/cx';
import { selectTheme, useSelectedTheme, useThemeSwap } from '../../lib/theme';
import { useInkAlign } from '../../lib/useInkAlign';
import { MemberCutout } from './MemberCutout';
import { TeamPanels } from './TeamPanels';
import styles from './HomeHero.module.css';

/** Matches --hero-duration, so a new slide change can't start mid-transition. */
const SLIDE_DURATION_MS = 650;

/**
 * Matches --swap-out: how long the text takes to dissolve before the slide,
 * and with it the site's typeface, changes underneath it. The new text then dissolves back in.
 */
const TEXT_OUT_MS = 220;

/** How far a finger must travel sideways, mostly sideways, for a swipe to change the slide. */
const SWIPE_MIN_PX = 48;

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
  // The slide on show is the site theme: choosing a member here themes every page as them.
  const member = useSelectedTheme();
  const active = member ? members.indexOf(member) + 1 : 0;
  // The text is dissolving out ahead of a slide change.
  const [leaving, setLeaving] = useState(false);
  const sliding = useRef(false);
  const reducedMotion = useReducedMotion();
  useThemeSwap(leaving);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const wordmarkRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const onTeam = active === 0;
  // The two large lines start exactly on the edge the smaller text starts on.
  useInkAlign(wordmarkRef, active);
  useInkAlign(titleRef, active);

  /**
   * Moves to another slide, unless one is still sliding in. The text dissolves out first, so
   * each member's typeface swaps in unseen and only ever fades, never jumps.
   */
  function change(next: (index: number) => number) {
    if (sliding.current) return;
    sliding.current = true;
    const target = next(active);
    const show = () => selectTheme(target === 0 ? undefined : members[target - 1]);
    const textOut = reducedMotion ? 0 : TEXT_OUT_MS;
    window.setTimeout(() => {
      sliding.current = false;
    }, textOut + SLIDE_DURATION_MS);
    if (textOut === 0) {
      show();
      return;
    }
    setLeaving(true);
    window.setTimeout(() => {
      show();
      setLeaving(false);
    }, textOut);
  }

  function step(direction: 1 | -1) {
    change((index) => (index + direction + SLIDE_COUNT) % SLIDE_COUNT);
  }

  /*
   * Touch and pen swipes: sideways to the next or previous slide. The hero leaves vertical
   * panning to the browser (touch-action: pan-y), which cancels the gesture once it scrolls.
   */
  function onPointerDown(event: PointerEvent<HTMLElement>) {
    swipeStart.current =
      event.pointerType === 'mouse' ? null : { x: event.clientX, y: event.clientY };
  }

  function onPointerUp(event: PointerEvent<HTMLElement>) {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    step(dx < 0 ? 1 : -1);
  }

  const slides = [team.name, ...members.map(getFirstName)];

  return (
    <MotionConfig reducedMotion="user">
      <section
        className={styles.hero}
        aria-labelledby="hero-title"
        aria-roledescription="carousel"
        data-leaving={leaving || undefined}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          swipeStart.current = null;
        }}
      >
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

            <p className={cx(styles.status, styles.swap)} aria-hidden="true">
              <span className={styles.counter}>{member.name.charAt(0)}</span>
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
            className={cx(styles.wordmark, styles.swap, onTeam && styles.wordmarkTeam)}
            aria-hidden="true"
          >
            {team.name}
          </p>
          <h1 ref={titleRef} id="hero-title" className={cx(styles.title, styles.swap)}>
            {team.tagline}
          </h1>
          <p className={cx(styles.description, styles.swap)}>{team.description}</p>
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
          <nav className={cx(styles.index, styles.swap)} aria-label="Slides">
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
                <span className={styles.indexInitial}>{name.charAt(0)}</span>
                <span className={styles.indexName}>{name}</span>
              </button>
            ))}
          </nav>
          {/* Phones only, where swiping takes the arrows' place. */}
          <p className={cx(styles.swipeHint, styles.swap)} aria-hidden="true">
            {onTeam ? 'Swipe to meet the team' : 'Swipe'}
          </p>
          <Link to="/projects" className={cx(styles.explore, styles.swap)}>
            Explore our projects
            <ArrowRightIcon size={20} />
          </Link>
        </div>
      </section>
    </MotionConfig>
  );
}
