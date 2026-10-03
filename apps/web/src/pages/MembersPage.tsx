import { Link } from 'react-router';
import { members } from '@bigfour/shared';

export function MembersPage() {
  return (
    <section>
      <h1>Members</h1>
      <ul>
        {members.map((member) => (
          <li key={member.slug}>
            <Link to={`/members/${member.slug}`}>
              <strong>{member.name}</strong>
            </Link>
            <div>{member.role}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
