import { team } from '@bigfour/shared';
import { Section, SectionHeader } from '../components/Section';
import { TextLink } from '../components/TextLink';

export function NotFoundPage() {
  return (
    <Section labelledBy="not-found-title">
      <title>{`Page not found · ${team.name}`}</title>
      <SectionHeader as="h1" eyebrow="404" title="Page not found" titleId="not-found-title" />
      <TextLink to="/">
        <span aria-hidden="true">←</span> Back to home
      </TextLink>
    </Section>
  );
}
