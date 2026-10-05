import { Link } from 'react-router';
import { ArrowRightIcon, PlusIcon } from '../../components/icons';
import styles from './CtaCard.module.css';

/** The grid's last card: an open slot that invites visitors to work with the team. */
export function CtaCard() {
  return (
    <article className={styles.card}>
      <span className={styles.plus} aria-hidden="true">
        <PlusIcon size={28} />
      </span>
      <h2 className={styles.title}>Let's build something.</h2>
      <p className={styles.text}>Have an idea? Tell us and we'll make it real.</p>
      <Link to="/members" className={styles.action}>
        Work with us
        <ArrowRightIcon size={14} />
      </Link>
    </article>
  );
}
