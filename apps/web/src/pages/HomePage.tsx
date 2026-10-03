import { Link } from 'react-router';
import { team } from '@bigfour/shared';

export function HomePage() {
  return (
    <section>
      <h1>{team.name}</h1>
      <p>{team.tagline}</p>
      <p>{team.description}</p>
      <p>
        <Link to="/members">Meet the members</Link> · <Link to="/projects">See our projects</Link>
      </p>
    </section>
  );
}
