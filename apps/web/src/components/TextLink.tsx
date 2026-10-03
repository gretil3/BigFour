import type { ReactNode } from 'react';
import { Link } from 'react-router';
import styles from './TextLink.module.css';

/** Emerald inline link, such as "All projects →". */
export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className={styles.link}>
      {children}
    </Link>
  );
}
