import { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { jumpToTop, useSmoothScroll } from '../lib/smoothScroll';
import { Footer } from './Footer';
import { Header } from './Header';
import styles from './Layout.module.css';

export function Layout() {
  const { pathname } = useLocation();
  useSmoothScroll();

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
