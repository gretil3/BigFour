import { Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { usePageTransition } from './lib/pageTransition';
import { HomePage } from './pages/HomePage';
import { MemberPage } from './pages/MemberPage';
import { MembersPage } from './pages/MembersPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectsPage } from './pages/ProjectsPage';

export default function App() {
  // Every page change dissolves from the old page into the new one.
  const location = usePageTransition();

  return (
    <Routes location={location}>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="members" element={<MembersPage />} />
        <Route path="members/:slug" element={<MemberPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
