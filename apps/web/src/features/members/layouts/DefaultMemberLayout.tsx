import type { MemberLayoutProps } from './types';

export function DefaultMemberLayout({ member, projects }: MemberLayoutProps) {
  return (
    <article>
      <h1>{member.name}</h1>
      <p>{member.role}</p>
      <p>{member.tagline}</p>
      <p>{member.bio}</p>

      <h2>Skills</h2>
      <ul>
        {member.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      {projects.length > 0 && (
        <>
          <h2>Projects</h2>
          <ul>
            {projects.map((project) => (
              <li key={project.slug}>{project.title}</li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}
