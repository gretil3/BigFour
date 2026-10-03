import { useState } from 'react';
import type { Project } from '@bigfour/shared';
import { LiveDemoDialog } from '../../components/LiveDemoDialog';
import { getProjectTrailer } from '../../lib/assets';
import { ShowcaseCard } from './ShowcaseCard';
import styles from './ProjectShowcase.module.css';

interface PreviewState {
  project: Project;
  mode: 'trailer' | 'live';
}

/** A grid of project cards, and the preview window their buttons open. */
export function ProjectShowcase({ projects }: { projects: Project[] }) {
  // The preview stays set after the window closes, so its content doesn't vanish mid-close.
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <ul className={styles.grid}>
        {projects.map((project) => (
          <li key={project.slug} className={styles.item}>
            <ShowcaseCard
              project={project}
              onPreview={(next, mode) => {
                setPreview({ project: next, mode });
                setOpen(true);
              }}
            />
          </li>
        ))}
      </ul>
      {preview && (
        <LiveDemoDialog
          open={open}
          onClose={() => setOpen(false)}
          title={preview.project.title}
          trailer={preview.mode === 'trailer' ? getProjectTrailer(preview.project.slug) : undefined}
          embedUrl={preview.project.embedUrl}
          liveUrl={preview.project.liveUrl}
        />
      )}
    </>
  );
}
