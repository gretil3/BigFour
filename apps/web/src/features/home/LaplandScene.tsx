import type { CSSProperties } from 'react';
import { Treeline } from '../../components/forest/Treeline';
import { TREELINES } from '../../components/forest/treelines';
import { mulberry32 } from '../../components/forest/seededRandom';
import styles from './LaplandScene.module.css';

const random = mulberry32(203);
const snow = Array.from({ length: 46 }, (_, index) => ({
  crystal: index % 9 === 0,
  style: {
    '--left': `${random() * 100}%`,
    '--top': `${random() * 100}%`,
    '--size': `${index % 9 === 0 ? 7 + random() * 5 : 1.5 + random() * 2.5}px`,
    '--duration': `${10 + random() * 16}s`,
    '--delay': `${-random() * 30}s`,
    '--drift': `${(random() - 0.5) * 60}px`,
    '--opacity': 0.3 + random() * 0.55,
  } as CSSProperties,
}));

/** A small, illustrated winter landscape for Gerald's team panel. */
export function LaplandScene() {
  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={styles.glow} />
      <Treeline layer={TREELINES.far} fill="#3e667d" className={styles.far} />
      <Treeline layer={TREELINES.mid} fill="#739baa" className={styles.mid} />
      <div className={styles.mist} />
      <div className={styles.hill} />
      <Treeline layer={TREELINES.near} fill="#bad6de" className={styles.near} />

      <svg className={styles.cabin} viewBox="0 0 300 170" focusable="false">
        <path d="M50 139Q148 110 251 139" fill="none" stroke="#e0eef1" strokeWidth="5" />
        <path d="M104 71V119H180V71L142 43Z" fill="#254152" />
        <path d="M111 83H173M111 95H173M111 107H173" stroke="#4b6b7b" strokeWidth="2" />
        <path
          d="M100 73L142 41L184 73"
          fill="none"
          stroke="#eff7f8"
          strokeWidth="9"
          strokeLinejoin="round"
        />
        <path d="M166 48V35H175V57" fill="#435d6c" />
        <rect x="121" y="79" width="24" height="28" rx="1" className={styles.windowGlow} />
        <path d="M133 79V107M121 93H145" stroke="#8f663e" strokeWidth="2" />
        <path d="M155 89H169V119H155Z" fill="#162f40" />
        <path d="M162 27Q153 17 166 5" className={styles.smoke} />

        <g fill="#203d50" stroke="#203d50" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="195" cy="131" rx="16" ry="7" />
          <path d="M205 131L210 112L217 113L216 132Z" />
          <ellipse cx="214" cy="113" rx="7" ry="4" />
          <path
            d="M184 135L182 152M191 136L193 151M204 135L208 151M210 132L215 147"
            fill="none"
            strokeWidth="3"
          />
          <path d="M181 128L176 122M208 111L203 105M216 110L220 105" fill="none" strokeWidth="2" />
          <path
            d="M211 110L207 100L208 92M207 101L200 97L198 91M216 109L221 99L220 91M221 100L228 96L230 90"
            fill="none"
            strokeWidth="1.8"
          />
        </g>
      </svg>

      <div className={styles.lake}>
        <svg viewBox="0 0 400 240" preserveAspectRatio="none" focusable="false">
          <path d="M30 46Q135 27 270 45M160 72Q275 56 380 76M-20 109Q95 88 205 106M120 158Q230 135 410 156M-10 199Q90 184 175 193" />
          <path d="M65 66Q155 91 282 65M21 139Q145 164 305 131M145 182Q235 212 364 181" />
        </svg>
      </div>
      <div className={styles.skaters}>
        {[0, 1, 2].map((index) => (
          <div key={index} className={styles.skater}>
            <svg viewBox="0 0 48 66" focusable="false">
              <ellipse cx="25" cy="61" rx="21" ry="3" fill="#d5eff7" opacity="0.2" />
              <g className={styles.skaterBody}>
                <path d="M24 22L13 28L5 25M29 24L37 31L44 27" className={styles.arms} />
                <path d="M24 20L17 37L28 40L35 24Z" fill="var(--coat)" />
                <circle cx="30" cy="12" r="6" fill="#e8d1bd" />
                <path d="M23 11Q23 2 31 4Q37 5 37 12Z" fill="var(--coat)" />
                <path
                  d="M27 19L34 21M27 20Q16 17 10 20"
                  fill="none"
                  stroke="#efd29d"
                  strokeWidth="3"
                />
                <g className={styles.pushLeg}>
                  <path d="M21 37L14 47L5 49" className={styles.leg} />
                  <path d="M2 53H12" className={styles.blade} />
                </g>
                <path d="M27 38L29 48L37 55" className={styles.leg} />
                <path d="M33 59H44L46 57" className={styles.blade} />
              </g>
            </svg>
          </div>
        ))}
      </div>

      <div className={styles.fade} />
      <div className={styles.snow}>
        {snow.map(({ crystal, style }, index) => (
          <span key={index} className={styles.flake} style={style}>
            {crystal && (
              <svg viewBox="0 0 20 20" focusable="false">
                <path d="M10 1V19M2.2 5.5L17.8 14.5M2.2 14.5L17.8 5.5M7 3L10 6L13 3M7 17L10 14L13 17M2.5 9L6.5 8L6 4M14 16L13.5 12L17.5 11M2.5 11L6.5 12L6 16M14 4L13.5 8L17.5 9" />
              </svg>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
