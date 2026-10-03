import { useLayoutEffect, useRef } from 'react';
import { getFirstName, members, team } from '@bigfour/shared';
import { Backdrop } from '../../components/Backdrop';
import { formatIndex } from '../../lib/format';
import { themeVars } from '../../lib/theme';
import styles from './TeamPanels.module.css';

/** How much of its panel's width the widest part may fill, and how tall the type may grow, as shares. */
const FILL_WIDTH = 0.88;
const MAX_HEIGHT = 0.4;

/** The wordmark in as many parts as there are panels, cut between letters: "Bi", "gF", "ou", "r". */
function wordParts(word: string, count: number): string[] {
  const size = Math.ceil(word.length / count);
  return Array.from({ length: count }, (_, index) => word.slice(index * size, (index + 1) * size));
}

/**
 * Sets every part of the wordmark to one size. Each member's typeface is a different natural
 * width, so the size is the largest at which every part still fits its panel; one size keeps
 * the letters level across the lines.
 */
function useCommonWordSize(
  panelsRef: React.RefObject<HTMLDivElement | null>,
  wordsRef: React.RefObject<(HTMLSpanElement | null)[]>,
) {
  useLayoutEffect(() => {
    const panels = panelsRef.current;
    if (!panels) return;

    const fit = () => {
      const words = wordsRef.current.filter((word): word is HTMLSpanElement => word !== null);
      const { width, height } = panels.getBoundingClientRect();
      if (words.length === 0 || width === 0) return;

      // Natural size first: clear any earlier fit, then measure.
      for (const word of words) word.style.fontSize = '';
      const fits = words.map((word) => {
        const size = parseFloat(getComputedStyle(word).fontSize);
        return (size * ((width / words.length) * FILL_WIDTH)) / word.getBoundingClientRect().width;
      });

      const size = Math.min(...fits, height * MAX_HEIGHT);
      for (const word of words) word.style.fontSize = `${size}px`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(panels);
    // The typefaces load on demand; the measurements above only count once they are in.
    void document.fonts.ready.then(fit);
    document.fonts.addEventListener('loadingdone', fit);

    return () => {
      observer.disconnect();
      document.fonts.removeEventListener('loadingdone', fit);
    };
  }, [panelsRef, wordsRef]);
}

/**
 * The scenery layer of BigFour's own slide: one panel per member, in their theme, each
 * carrying its share of the wordmark in their typeface. Decorative: the carousel announces
 * the slide and its controls sit outside these panels.
 */
export function TeamPanels() {
  const panelsRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  useCommonWordSize(panelsRef, wordsRef);

  const parts = wordParts(team.name, members.length);

  return (
    <div ref={panelsRef} className={styles.panels} aria-hidden="true">
      {members.map((member, index) => (
        <div key={member.slug} className={styles.panel} style={themeVars(member)}>
          <Backdrop name={member.style.backdrop} />
          <div className={styles.word}>
            <span
              ref={(element) => {
                wordsRef.current[index] = element;
              }}
              className={styles.wordText}
              // The closing period belongs to the last part only.
              data-last={index === members.length - 1 ? '' : undefined}
            >
              {parts[index]}
            </span>
          </div>
          <div className={styles.caption}>
            <p className={styles.label}>
              <span className={styles.number}>{formatIndex(index + 1)}</span>
              {getFirstName(member)}
            </p>
            <p className={styles.role}>{member.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
