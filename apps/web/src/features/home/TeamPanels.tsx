import { getFirstName, members } from '@bigfour/shared';
import { Backdrop } from '../../components/Backdrop';
import { formatIndex } from '../../lib/format';
import { themeVars } from '../../lib/theme';
import styles from './TeamPanels.module.css';

/**
 * The scenery layer of BigFour's own slide: four equal panels, one per member, each with that
 * member's background, scenery and accent, and a label at the same inset in every panel.
 * Decorative: the carousel announces the slide, and the wordmark, text and controls sit above.
 */
export function TeamPanels() {
  return (
    <div className={styles.panels} aria-hidden="true">
      {members.map((member, index) => (
        <div key={member.slug} className={styles.panel} style={themeVars(member)}>
          <Backdrop name={member.style.backdrop} />
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
