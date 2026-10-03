import type { MemberStyle } from '@bigfour/shared';
import styles from './Backdrop.module.css';

type BackdropName = MemberStyle['backdrop'];

/** One pine: stacked triangles on a trunk, as a single silhouette path. */
function pine(centerX: number, base: number, height: number, width: number): string {
  const tiers = 5;
  let d = '';
  for (let tier = 0; tier < tiers; tier++) {
    const apex = base - height + (height * 0.62 * tier) / tiers;
    const bottom = apex + height * 0.4;
    const half = (width / 2) * (0.4 + (0.6 * (tier + 1)) / tiers);
    d += `M${centerX} ${apex}L${centerX + half} ${bottom}L${centerX - half} ${bottom}Z`;
  }
  const trunk = width * 0.08;
  return (
    d + `M${centerX - trunk} ${base - height * 0.1}h${trunk * 2}v${height * 0.1}h${-trunk * 2}Z`
  );
}

/** x position (0-1200), height, width. Hand-placed, so the skyline is stable between renders. */
const backTrees = [
  [30, 170, 70],
  [140, 210, 85],
  [260, 160, 64],
  [390, 230, 92],
  [520, 180, 72],
  [640, 220, 88],
  [760, 170, 68],
  [880, 240, 96],
  [1010, 190, 76],
  [1130, 215, 84],
] as const;
const frontTrees = [
  [-10, 260, 100],
  [100, 330, 125],
  [215, 240, 92],
  [330, 300, 115],
  [455, 350, 135],
  [585, 250, 95],
  [700, 320, 122],
  [830, 270, 104],
  [950, 345, 130],
  [1075, 255, 98],
  [1190, 310, 118],
] as const;

const FOREST_BASE = 400;

const backForest = backTrees.map(([x, h, w]) => pine(x, FOREST_BASE, h, w)).join('');
const frontForest = frontTrees.map(([x, h, w]) => pine(x, FOREST_BASE, h, w)).join('');

/** left %, top %, size px, drift seconds, delay seconds */
const fireflies = [
  [8, 22, 3, 9, 0],
  [17, 55, 2, 12, 2],
  [26, 14, 3, 10, 5],
  [34, 40, 2, 13, 1],
  [43, 68, 3, 11, 4],
  [52, 26, 2, 9, 7],
  [61, 52, 3, 14, 3],
  [70, 18, 2, 10, 6],
  [78, 62, 3, 12, 0],
  [86, 34, 2, 11, 8],
  [92, 70, 3, 13, 2],
  [96, 12, 2, 9, 5],
  [12, 78, 2, 10, 9],
  [57, 80, 3, 12, 1],
] as const;

function Forest() {
  return (
    <>
      <svg
        className={styles.trees}
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMax slice"
        focusable="false"
      >
        <path className={styles.backTrees} d={backForest} />
        <path className={styles.frontTrees} d={frontForest} />
      </svg>
      {fireflies.map(([left, top, size, drift, delay]) => (
        <span
          key={`${left}-${top}`}
          className={styles.firefly}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: size,
            height: size,
            animationDuration: `${drift}s, ${drift / 2.4}s`,
            animationDelay: `${delay}s, ${delay}s`,
          }}
        />
      ))}
    </>
  );
}

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
 * Scenery behind a hero or profile band, in the featured member's theme colors.
 * Every scene stays mounted so switching members cross-fades instead of popping.
 */
export function Backdrop({ name }: { name: BackdropName }) {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <div className={styles.scene} data-active={name === 'forest'}>
        <Forest />
      </div>
      <div className={styles.scene} data-active={name === 'waves'}>
        <Waves />
      </div>
    </div>
  );
}
