import { services } from '@bigfour/shared';
import { Section, SectionHeader, SectionLede } from '../../components/Section';
import { ServiceGrid } from '../../components/ServiceCard';

export function ServicesSection() {
  return (
    <Section labelledBy="services-title">
      <SectionHeader
        eyebrow="Services"
        title="What we build"
        titleId="services-title"
        aside={
          <SectionLede>
            Each of us leads one discipline. Every project still passes through all four pairs of
            hands.
          </SectionLede>
        }
      />
      <ServiceGrid services={services} />
    </Section>
  );
}
