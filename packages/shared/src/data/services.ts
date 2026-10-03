import type { Service } from '../types';

export const services: Service[] = [
  {
    lead: 'kevin',
    title: 'Full-Stack Web Development',
    description:
      'React and TypeScript frontends on Express, FastAPI or Firebase backends, shipped to production on Vercel.',
    tools: ['React', 'TypeScript', 'Node.js', 'Firebase'],
  },
  {
    lead: 'david',
    title: 'UI/UX Engineering',
    description:
      'Interfaces designed and built by the same people, then tested properly before they ship.',
    tools: ['Tailwind CSS', 'Framer Motion', 'React Native'],
  },
  {
    lead: 'fiko',
    title: 'System Architecture',
    description:
      'Structure that holds up past the demo: data flow, services, containers and hardware links.',
    tools: ['Docker', 'Express', 'Arduino'],
  },
  {
    lead: 'gerald',
    title: 'Custom API Integration',
    description:
      'Third-party services and machine-learning models served behind clean, documented HTTP APIs.',
    tools: ['FastAPI', 'PyTorch', 'Hugging Face'],
  },
];

export function getServicesLedBy(memberSlug: string): Service[] {
  return services.filter((service) => service.lead === memberSlug);
}
