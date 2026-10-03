import { getProjectsByStatus, projectStatusLabels, projectStatusOrder } from '@bigfour/shared';

export function ProjectsPage() {
  return (
    <section>
      <h1>Projects</h1>
      {projectStatusOrder.map((status) => {
        const projects = getProjectsByStatus(status);
        if (projects.length === 0) return null;

        return (
          <section key={status}>
            <h2>{projectStatusLabels[status]}</h2>
            <ul>
              {projects.map((project) => (
                <li key={project.slug}>
                  <strong>{project.title}</strong>
                  <div>{project.summary}</div>
                  <div>{project.stack.join(' · ')}</div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </section>
  );
}
