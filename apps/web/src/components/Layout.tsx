import { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { jumpToTop, useSmoothScroll } from '../lib/smoothScroll';
import { useSiteTheme } from '../lib/theme';
import { Footer } from './Footer';
import { Header } from './Header';
import styles from './Layout.module.css';

export function Layout() {
  const { pathname } = useLocation();
  useSmoothScroll();
  // Every page wears the theme chosen on the home hero (or a member page's own).
  useSiteTheme();

  // BrowserRouter keeps the scroll position between pages; start each page at the top,
  // before the page transition takes its snapshot of the new page.
  useLayoutEffect(() => {
    jumpToTop();
  }, [pathname]);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
