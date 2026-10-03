import { team } from '@bigfour/shared';
import { FeaturedProjectsSection } from '../features/home/FeaturedProjectsSection';
import { HomeHero } from '../features/home/HomeHero';
import { RecognitionSection } from '../features/home/RecognitionSection';
import { ServicesSection } from '../features/home/ServicesSection';

export function HomePage() {
  return (
    <>
      <title>{team.name}</title>
      <HomeHero />
      <ServicesSection />
      <RecognitionSection />
      <FeaturedProjectsSection />
    </>
  );
}
