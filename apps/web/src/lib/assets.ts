/*
 * Images and videos are matched to members and projects by file name:
 *   src/assets/members/<member-slug>.png    transparent cutout for the home hero
 *   src/assets/projects/<project-slug>.jpg  screenshot for project cards (or .png/.webp/.svg)
 *   src/assets/videos/<project-slug>.mp4    trailer for the preview window (or .webm)
 */

const memberCutouts = bySlug(
  import.meta.glob<string>('../assets/members/*.{png,webp,avif}', {
    eager: true,
    import: 'default',
  }),
);

const projectImages = bySlug(
  import.meta.glob<string>('../assets/projects/*.{jpg,jpeg,png,webp,avif,svg}', {
    eager: true,
    import: 'default',
  }),
);

// Only URLs: a video is fetched when its preview window opens, not with the page.
const projectTrailers = bySlug(
  import.meta.glob<string>('../assets/videos/*.{mp4,webm}', {
    eager: true,
    query: '?url',
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

export function getProjectTrailer(projectSlug: string): string | undefined {
  return projectTrailers.get(projectSlug);
}
