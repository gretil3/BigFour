import { projects, team } from '@bigfour/shared';
import { Section, SectionHeader, SectionLede } from '../components/Section';
import { ProjectShowcase } from '../features/projects/ProjectShowcase';

export function ProjectsPage() {
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
            here: hover a card to watch its trailer or try it live.
          </SectionLede>
        }
      />
      <ProjectShowcase projects={projects} />
    </Section>
  );
}
