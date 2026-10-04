import { useLayoutEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { team } from '@bigfour/shared';
import { cx } from '../lib/cx';
import { navItems } from '../lib/navigation';
import styles from './Header.module.css';

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const onHome = useLocation().pathname === '/';

  // Publish the real header height (it grows when the nav wraps on narrow screens, and is 0
  // where it is hidden) so the home hero can slide up underneath it.
  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const root = document.documentElement;
    const observer = new ResizeObserver(() => {
      root.style.setProperty('--header-height', `${header.offsetHeight}px`);
    });
    observer.observe(header);

    return () => {
      observer.disconnect();
      root.style.removeProperty('--header-height');
    };
  }, []);

  return (
    <header ref={headerRef} className={cx(styles.header, onHome && styles.home)}>
      <div className={styles.nav}>
        <Link to="/" className={styles.brand}>
          <span aria-hidden="true" className={styles.mark}>
            <span />
            <span />
            <span />
            <span />
          </span>
          {team.name}
        </Link>
        {/* On phones the tab bar (TabBar) takes the nav's place. */}
        <nav aria-label="Main" className={styles.links}>
          {navItems.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'} className={styles.link}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
