/*
 * Images are matched to members and projects by file name:
 *   src/assets/members/<member-slug>.png    transparent cutout for the home hero
 *   src/assets/projects/<project-slug>.jpg  screenshot for project cards
 */

const memberCutouts = bySlug(
  import.meta.glob<string>('../assets/members/*.{png,webp,avif}', {
    eager: true,
    import: 'default',
  }),
);

const projectImages = bySlug(
  import.meta.glob<string>('../assets/projects/*.{jpg,jpeg,png,webp,avif}', {
    eager: true,
    import: 'default',
  }),
);

function bySlug(modules: Record<string, string>): Map<string, string> {
  return new Map(
    Object.entries(modules).map(([path, url]) => [
      path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.')),
      url,
    ]),
  );
}

export function getMemberCutout(memberSlug: string): string | undefined {
  return memberCutouts.get(memberSlug);
}

export function getProjectImage(projectSlug: string): string | undefined {
  return projectImages.get(projectSlug);
}
