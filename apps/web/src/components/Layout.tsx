import { NavLink, Outlet } from 'react-router';
import { team } from '@bigfour/shared';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/members', label: 'Members', end: false },
  { to: '/projects', label: 'Projects', end: false },
];

const currentYear = new Date().getFullYear();

export function Layout() {
  return (
    <>
      <header>
        <NavLink to="/">{team.name}</NavLink>
        <nav aria-label="Main">
          {navItems.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        &copy; {currentYear} {team.name}
      </footer>
    </>
  );
}
