import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, MotionConfig, motion, useIsPresent } from 'framer-motion';
import { members } from '@bigfour/shared';
import { formatIndex } from '../../lib/format';
import { useMemberTheme } from '../../lib/theme';
import { MemberHero } from './heroes/MemberHero';
import { memberHeroes } from './heroes/registry';
import { HERO_TITLE_ID, type HeroControl } from './heroes/types';
import styles from './HomeHero.module.css';

/** Matches --hero-duration, so a new slide change can't start mid-transition. */
const SLIDE_DURATION_MS = 650;

/**
 * One hero's layer. Switching to a member with a different hero cross-fades the two;
 * the outgoing one is inert while it fades, so it can't be focused or clicked.
 */
function HeroScene({ children }: { children: ReactNode }) {
  const isPresent = useIsPresent();
  return (
    <motion.div
      className={styles.scene}
      data-scene={isPresent ? 'present' : 'leaving'}
      inert={!isPresent}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: SLIDE_DURATION_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Full-screen carousel of the members. Each slide re-themes the whole site with that
 * member's portfolio style, and members with a hero of their own (see heroes/registry)
 * swap in the hero of their personal portfolio.
 */
export function HomeHero() {
  const [active, setActive] = useState(0);
  const lockedUntil = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const focusAfterChange = useRef<HeroControl | null>(null);

  const member = members[active];
  useMemberTheme(member);

  // The pressed button may belong to a hero that just left; keep focus on the same control.
  useEffect(() => {
    const control = focusAfterChange.current;
    if (!control) return;
    focusAfterChange.current = null;
    sectionRef.current
      ?.querySelector<HTMLElement>(`[data-scene='present'] [data-hero-control='${control}']`)
      ?.focus();
  }, [active]);

  if (!member) return null;

  function step(control: HeroControl) {
    const now = performance.now();
    if (now < lockedUntil.current) return;
    lockedUntil.current = now + SLIDE_DURATION_MS;
    focusAfterChange.current = control;
    const direction = control === 'next' ? 1 : -1;
    setActive((index) => (index + direction + members.length) % members.length);
  }

  // Members sharing StandardHero share one scene, so its cutouts glide between them.
  const sceneKey = member.slug in memberHeroes ? member.slug : 'standard';

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        className={styles.hero}
        aria-labelledby={HERO_TITLE_ID}
        aria-roledescription="carousel"
      >
        <p className={styles.srOnly} aria-live="polite">
          {`Member ${formatIndex(active + 1)} of ${formatIndex(members.length)}: ${member.name}, ${member.role}`}
        </p>
        <AnimatePresence>
          <HeroScene key={sceneKey}>
            <MemberHero
              member={member}
              index={active}
              count={members.length}
              onPrevious={() => step('previous')}
              onNext={() => step('next')}
            />
          </HeroScene>
        </AnimatePresence>
      </section>
    </MotionConfig>
  );
}
