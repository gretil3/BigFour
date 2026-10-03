import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import type { MemberStyle } from '@bigfour/shared';
import { ForestScene } from './forest/ForestScene';
import styles from './Backdrop.module.css';

type BackdropName = MemberStyle['backdrop'];

const WAVE_LINES = 16;
const WAVE_WIDTH = 1200;

/** One flowing line. Whole periods per tile, so the tile can repeat and drift seamlessly. */
function wavePath(line: number): string {
  const y = 40 + line * 36;
  const amplitude = 14 + ((line * 7) % 5) * 6;
  const periods = 1 + (line % 2);
  const phase = line * 0.9;
  let d = '';
  for (let x = 0; x <= WAVE_WIDTH * 2; x += 20) {
    const wave = Math.sin((x / WAVE_WIDTH) * periods * Math.PI * 2 + phase);
    d += `${x === 0 ? 'M' : 'L'}${x} ${(y + wave * amplitude).toFixed(1)}`;
  }
  return d;
}

const wavePaths = Array.from({ length: WAVE_LINES }, (_, line) => wavePath(line));

function Waves() {
  return (
    <svg
      className={styles.waves}
      viewBox={`0 0 ${WAVE_WIDTH * 2} 640`}
      preserveAspectRatio="none"
      focusable="false"
    >
      {wavePaths.map((d, line) => (
        <path key={line} d={d} className={line % 5 === 2 ? styles.waveBold : styles.wave} />
      ))}
    </svg>
  );
}

/**
 * Scenery behind a hero or profile band, from the featured member's own portfolio:
 * David's night forest, Kevin's contour waves. Only the active scene is mounted, and
 * switching members cross-fades the outgoing scene into the next.
 */
export function Backdrop({ name }: { name: BackdropName }) {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <MotionConfig reducedMotion="user">
        <AnimatePresence initial={false}>
          {name !== 'none' && (
            <motion.div
              key={name}
              className={styles.scene}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
            >
              {name === 'forest' ? <ForestScene /> : <Waves />}
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
}
