import type { Member } from '@bigfour/shared';
import styles from './MemberCutout.module.css';

/** The member's transparent cutout photo. */
export function MemberCutout({ member, src }: { member: Member; src: string }) {
  return <img className={styles.image} src={src} alt={member.name} decoding="async" />;
}
