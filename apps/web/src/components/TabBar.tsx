import type { ReactNode } from 'react';
import { NavLink } from 'react-router';
import { navItems } from '../lib/navigation';
import { GridIcon, HomeIcon, UsersIcon } from './icons';
import styles from './TabBar.module.css';

const icons: Record<(typeof navItems)[number]['to'], ReactNode> = {
  '/': <HomeIcon size={20} />,
  '/members': <UsersIcon size={20} />,
  '/projects': <GridIcon size={20} />,
};

/**
 * The main nav on phones: a bar floating at the bottom of the screen, within thumb's reach,
 * in place of the header's nav. Hidden on wider screens.
 */
export function TabBar() {
  return (
    <nav aria-label="Main" className={styles.bar}>
      {navItems.map(({ to, label }) => (
        <NavLink key={to} to={to} end={to === '/'} className={styles.item}>
          {icons[to]}
          <span className={styles.label}>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
