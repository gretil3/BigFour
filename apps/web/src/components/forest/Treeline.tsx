import { motion, type MotionValue } from 'framer-motion';
import { cx } from '../../lib/cx';
import type { TreelineLayer } from './treelines';
import styles from './Treeline.module.css';

interface TreelineProps {
  layer: TreelineLayer;
  /** Silhouette color. Any CSS color, including var(). */
  fill: string;
  className?: string;
  x?: MotionValue<number>;
  y?: MotionValue<number>;
}

/** One rank of pines. Ported from David's portfolio (components/forest/Treeline.tsx). */
export function Treeline({ layer, fill, className, x, y }: TreelineProps) {
  return (
    <motion.svg
      aria-hidden="true"
      focusable="false"
      viewBox={layer.viewBox}
      preserveAspectRatio="xMidYMax slice"
      style={{ x, y, aspectRatio: layer.aspect }}
      className={cx(styles.treeline, className)}
    >
      <path d={layer.d} style={{ fill }} />
    </motion.svg>
  );
}
