import { Fragment, useRef, type CSSProperties, type PointerEvent } from 'react';
import {
  motion,
  useIsPresent,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { team, type MemberPalette } from '@bigfour/shared';
import { Fireflies } from '../../../components/forest/Fireflies';
import { Treeline } from '../../../components/forest/Treeline';
import { TREELINES } from '../../../components/forest/treelines';
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon } from '../../../components/icons';
import { formatIndex } from '../../../lib/format';
import { scrollToId } from '../../../lib/scroll';
import { HERO_TITLE_ID, type HeroProps } from './types';
import styles from './ForestHero.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;
const REVEAL_DELAY = 0.15;
const REVEAL_STAGGER = 0.06;

// Every member ends their headline with a period; David's runs in his fern-to-firefly gradient.
const HEADLINE = [`${team.name}.`];
const TAGLINE = team.tagline.split(' ');
/** The blocks under the headline start just after its last word, as on David's site. */
const AFTER_HEADLINE = REVEAL_DELAY + (HEADLINE.length + TAGLINE.length - 1) * REVEAL_STAGGER + 0.2;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  };
}

function forestColors(palette: MemberPalette): CSSProperties {
  return {
    '--forest-bg': palette.background,
    '--forest-text': palette.text,
    '--forest-muted': palette.muted,
    '--forest-accent': palette.accent,
    '--forest-accent-soft': palette.accentSoft,
  } as CSSProperties;
}

interface RevealWordsProps {
  words: string[];
  /** Position of the first word in the whole headline, for the stagger. */
  startIndex?: number;
  highlight?: boolean;
}

/** Words that slide up out of their own masks, one after another. */
function RevealWords({ words, startIndex = 0, highlight = false }: RevealWordsProps) {
  return words.map((word, i) => (
    <Fragment key={`${i}-${word}`}>
      <span aria-hidden="true" className={styles.wordMask}>
        <motion.span
          initial={{ y: '105%' }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.8,
            delay: REVEAL_DELAY + (startIndex + i) * REVEAL_STAGGER,
            ease: EASE,
          }}
          className={highlight ? `${styles.word} ${styles.highlight}` : styles.word}
        >
          {word}
        </motion.span>
      </span>{' '}
    </Fragment>
  ));
}

/**
 * David's slide: the hero of his own portfolio (david.dev), a night forest under a moon,
 * with fireflies that gather around the pointer, carrying BigFour's headline. Scroll and
 * the pointer move the moon and the three ranks of pines at different depths.
 */
export function ForestHero({ member, index, count, onPrevious, onNext }: HeroProps) {
  const isPresent = useIsPresent();
  const sceneRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const smoothX = useSpring(pointerX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 50, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end start'],
  });

  // Farther layers drift more against the scroll, which reads as depth.
  const moonY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const farY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Nearer layers slide further against the pointer.
  const farX = useTransform(smoothX, [0, 1], [10, -10]);
  const midX = useTransform(smoothX, [0, 1], [22, -22]);
  const nearX = useTransform(smoothX, [0, 1], [36, -36]);
  const lanternX = useTransform(smoothX, (v) => `${v * 100}%`);
  const lanternY = useTransform(smoothY, (v) => `${v * 100}%`);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  }

  return (
    <div
      ref={sceneRef}
      className={styles.scene}
      style={forestColors(member.palette)}
      onPointerMove={handlePointerMove}
    >
      <motion.div aria-hidden="true" className={styles.moon} style={{ y: moonY }}>
        <div className={styles.moonDisc} />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className={styles.lantern}
        style={{ left: lanternX, top: lanternY }}
      />

      <Treeline layer={TREELINES.far} fill="#0f2a20" x={farX} y={farY} className={styles.far} />
      <div aria-hidden="true" className={styles.mist} />
      <Treeline layer={TREELINES.mid} fill="#0a1c15" x={midX} y={midY} className={styles.mid} />
      <Fireflies className={styles.fireflies} />
      <Treeline layer={TREELINES.near} fill="var(--forest-bg)" x={nearX} className={styles.near} />
      <div aria-hidden="true" className={styles.fade} />

      <motion.div className={styles.content} style={{ y: contentY, opacity: contentOpacity }}>
        {member.motto && (
          <motion.p
            className={styles.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {`// ${member.motto}`}
          </motion.p>
        )}

        <h1
          id={isPresent ? HERO_TITLE_ID : undefined}
          aria-label={`${HEADLINE.join(' ')} ${team.tagline}`}
          className={styles.title}
        >
          <span className={styles.headline}>
            <RevealWords words={HEADLINE} highlight />
          </span>
          <span className={styles.tagline}>
            <RevealWords words={TAGLINE} startIndex={HEADLINE.length} />
          </span>
        </h1>

        <motion.p className={styles.description} {...fadeUp(AFTER_HEADLINE)}>
          {team.description}
        </motion.p>

        <motion.div className={styles.actions} {...fadeUp(AFTER_HEADLINE + 0.1)}>
          <a
            href="#featured"
            className={styles.primary}
            onClick={(event) => {
              if (scrollToId('featured')) event.preventDefault();
            }}
          >
            Explore our projects
            <ArrowDownIcon size={16} />
          </a>
        </motion.div>

        <motion.div className={styles.carousel} {...fadeUp(AFTER_HEADLINE + 0.2)}>
          <span className={styles.counter}>
            {formatIndex(index + 1)} / {formatIndex(count)}
          </span>
          <button
            type="button"
            className={styles.control}
            aria-label="Previous member"
            data-hero-control="previous"
            onClick={onPrevious}
          >
            <ArrowLeftIcon size={18} />
          </button>
          <button
            type="button"
            className={styles.control}
            aria-label="Next member"
            data-hero-control="next"
            onClick={onNext}
          >
            <ArrowRightIcon size={18} />
          </button>
          <span className={styles.memberName}>{member.name}</span>
        </motion.div>
      </motion.div>

      <a
        href="#services"
        aria-label="Descend to services"
        className={styles.descend}
        onClick={(event) => {
          if (scrollToId('services')) event.preventDefault();
        }}
      >
        descend
        <span aria-hidden="true" className={styles.track}>
          <span className={styles.trackFill} />
        </span>
      </a>
    </div>
  );
}
