import { useLayoutEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router';
import { team } from '@bigfour/shared';
import styles from './Header.module.css';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/members', label: 'Members' },
  { to: '/projects', label: 'Projects' },
];

export function Header() {
  const headerRef = useRef<HTMLElement>(null);

  // Publish the real header height (it grows when the nav wraps on narrow screens)
  // so the home hero can slide up underneath it.
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
    <header ref={headerRef} className={styles.header}>
      <nav aria-label="Main" className={styles.nav}>
        <Link to="/" className={styles.brand}>
          <span aria-hidden="true" className={styles.mark}>
            <span />
            <span />
            <span />
            <span />
          </span>
          {team.name}
        </Link>
        <div className={styles.links}>
          {navItems.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'} className={styles.link}>
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
