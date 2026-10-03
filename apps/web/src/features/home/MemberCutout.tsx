import type { Member } from '@bigfour/shared';
import { getMemberCutout } from '../../lib/assets';
import styles from './MemberCutout.module.css';

/** The member's transparent cutout photo, or a placeholder frame until one is added. */
export function MemberCutout({ member }: { member: Member }) {
  const src = getMemberCutout(member.slug);

  if (src) {
    return <img className={styles.image} src={src} alt={member.name} decoding="async" />;
  }

  return (
    <div className={styles.placeholder} aria-hidden="true">
      <span className={styles.initial}>{member.name.charAt(0)}</span>
    </div>
  );
}
