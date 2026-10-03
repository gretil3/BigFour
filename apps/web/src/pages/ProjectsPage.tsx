import { useState } from 'react';
import { projects, team, type Project } from '@bigfour/shared';
import { LiveDemoDialog } from '../components/LiveDemoDialog';
import { getProjectTrailer } from '../lib/assets';
import { Section, SectionHeader, SectionLede } from '../components/Section';
import { ShowcaseCard } from '../features/projects/ShowcaseCard';
import styles from './ProjectsPage.module.css';

export function ProjectsPage() {
  // The project stays set after the window closes, so its content doesn't vanish mid-close.
  const [demo, setDemo] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <Section labelledBy="projects-title">
      <title>{`Projects · ${team.name}`}</title>
      <SectionHeader
        as="h1"
        eyebrow="Our work"
        title="Projects"
        titleId="projects-title"
        aside={
          <SectionLede>
            Everything we've built together, finished or still in progress. Most of them run right
            here: open a screenshot to watch a trailer or try one live.
          </SectionLede>
        }
      />
      <ul className={styles.grid}>
        {projects.map((project) => (
          <li key={project.slug} className={styles.item}>
            <ShowcaseCard
              project={project}
              onPreview={(next) => {
                setDemo(next);
                setOpen(true);
              }}
            />
          </li>
        ))}
      </ul>
      {demo && (
        <LiveDemoDialog
          open={open}
          onClose={() => setOpen(false)}
          title={demo.title}
          trailer={getProjectTrailer(demo.slug)}
          embedUrl={demo.embedUrl}
          liveUrl={demo.liveUrl}
        />
      )}
    </Section>
  );
}
