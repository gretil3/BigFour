import { Link } from 'react-router';
import { team } from '@bigfour/shared';
import styles from './Footer.module.css';

const currentYear = new Date().getFullYear();

const links = [
  { to: '/', label: 'Home' },
  { to: '/members', label: 'Members' },
  { to: '/projects', label: 'Projects' },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>
          © {currentYear} {team.name}
        </span>
        <nav aria-label="Footer" className={styles.links}>
          {links.map(({ to, label }) => (
            <Link key={to} to={to} className={styles.link}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
