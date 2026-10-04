# BigFour

Group portfolio of **BigFour**: four friends who are passionate about building high-quality web-based applications.

The site has three areas: a **main page**, a **members** area (the team profile, plus one page per member with its own layout) and a **projects** page (completed and yet-to-be-developed work). It ships as a React web app and a React Native mobile app, both written in TypeScript and sharing the same content.

## Structure

```
BigFour/
├── apps/
│   ├── web/        React + Vite + React Router (TypeScript)
│   └── mobile/     React Native + Expo + Expo Router (TypeScript)
└── packages/
    └── shared/     Types and content shared by both apps (team, members, projects)
```

This is an npm workspaces monorepo. `@bigfour/shared` is consumed straight from source, so there is no build step for it.

The web app is styled with CSS Modules. Design tokens (colors, fonts, spacing, motion) are CSS custom properties in [`apps/web/src/styles/global.css`](apps/web/src/styles/global.css). The fonts (Plus Jakarta Sans, JetBrains Mono and Anton for BigFour's own theme; Fraunces, Inter and Instrument Sans for the member themes) are self-hosted through Fontsource.

| Page     | Web route        | Mobile route      |
| -------- | ---------------- | ----------------- |
| Home     | `/`              | `(tabs)/index`    |
| Members  | `/members`       | `(tabs)/members`  |
| Member   | `/members/:slug` | `members/[slug]`  |
| Projects | `/projects`      | `(tabs)/projects` |

## Getting started

Requires Node 22.12+ (`.nvmrc` pins 24) and npm, which comes with Node.

### Run the web app locally

Run these from the repository root, not from `apps/web`:

```bash
npm install        # once, and again after pulling dependency changes
npm run dev:web
```

Open the address Vite prints, normally <http://localhost:5173/>. If that port is taken, Vite picks the next free one (5174, 5175, …) and prints it. Edits to the code or to `packages/shared/src/data` reload the page automatically. Stop the server with `Ctrl+C`.

To use a specific port, pass it after `--`:

```bash
npm run dev -w @bigfour/web -- --port 3000
```

To check the production build locally:

```bash
npm run build:web
npm run preview -w @bigfour/web   # serves apps/web/dist
```

### Run the mobile app locally

```bash
npm run dev:mobile
```

Scan the QR code with Expo Go on your phone, or press `a` (Android emulator), `i` (iOS simulator, macOS only) or `w` (browser) in the terminal.

### All commands

| Command              | What it does                                    |
| -------------------- | ----------------------------------------------- |
| `npm run dev:web`    | Start the web app (Vite dev server)             |
| `npm run dev:mobile` | Start the mobile app (Expo, scan with Expo Go)  |
| `npm run build:web`  | Typecheck and build the web app                 |
| `npm run typecheck`  | Typecheck every workspace                       |
| `npm run lint`       | Lint with Oxlint                                |
| `npm run format`     | Format with Prettier (`format:check` to verify) |

## Editing content

All content lives in one place, [`packages/shared/src/data`](packages/shared/src/data), and both apps read from it.

- `team.ts`: the group name, tagline and description. The tagline is still the design's placeholder.
- `members.ts`: each member's role, links, `palette` and `style`, lifted from their personal portfolio. Choosing a member's slide on the home hero makes theirs the site theme: every page, header to footer, wears it until the visitor chooses again, and the browser remembers the choice (`lib/theme.ts`). A member's own profile page always wears that member's theme. A `portfolio` social link sends every link to the member to their own site instead. `slug` becomes the URL (`/members/<slug>`).
  - `palette`: the colors (page, hero, cards, text, borders, accents).
  - `style`: the character. `typeface` (`serif`, `condensed`, `grotesk`, `system`), `shape` of corners (`sharp`, `crisp`, `soft`, `round`), `label` and nav dressing (`slashes` for `// Services`, `brackets` for `( SERVICES )`, `spaced` for wide-tracked caps, `mono` for code-style caps) and the hero `backdrop` (`forest`, `waves`, `neural`, `none`). The web app maps these to fonts and CSS variables in `apps/web/src/lib/theme.ts`.
  - Pages with no featured member (Members, Projects) use BigFour's own neutral black theme, defined in `apps/web/src/styles/global.css`.
- `services.ts`: the "What we build" cards, each led by one member.
- `awards.ts`: the "Awards & hackathons" list.
- `projects.ts`: every project, in the order the Projects page shows them. Each has a `status` (`completed`, `in-progress` or `planned`) and `memberSlugs` (who built it). `featured: true` puts one under "Recent projects" on the home page, in the same cards as the Projects page. The Projects page also uses:
  - `description` (a few sentences; falls back to the one-line `tagline`), `techStack` and `disclaimer` (an amber callout, e.g. for work in progress).
  - `embedUrl`: the page opened in the preview window when the project has no trailer. The site must allow iframe embedding (no `X-Frame-Options` or `frame-ancestors` blocking it); Streamlit apps need `?embed=true`. Without it the card has no "Try it live" button.
  - `liveUrl` and `repoUrl`: the "Live Demo" and "Source" buttons.

### Images

Web images are picked up automatically by file name. No code changes are needed.

- **Member cutouts** for the home hero: `apps/web/src/assets/members/<member-slug>.png`. They should be transparent PNGs; see the [README there](apps/web/src/assets/members/README.md) for sizing. Until a member's file exists, the hero shows nothing in its place.
- **Project trailers**: `apps/web/src/assets/videos/<project-slug>.mp4` (WebM also works). A project with a trailer plays it on its card and in its preview window instead of its live site. Use H.264 MP4 with fast start so it plays everywhere and starts streaming at once; keep each file small, since it is downloaded in full by every visitor who opens it.
- **Project screenshots**: `apps/web/src/assets/projects/<project-slug>.jpg` (PNG, WebP, AVIF and SVG also work). Projects without one show a striped placeholder.

## Giving each member their own scenery

The home hero keeps one layout for everyone; only the theme and the scenery behind it change. A member's `style.backdrop` picks the scenery, drawn by `apps/web/src/components/Backdrop.tsx` behind their home slide and their profile band:

- `forest` (David): the night forest from his portfolio, ported in `components/forest/`. It has a moon, mist, three ranks of pines that drift with scroll and the pointer, and canvas fireflies that gather around the pointer.
- `waves` (Kevin): contour lines that slowly slide sideways.
- `neural` (Gerald): floating angular shapes and drifting particles using the lime and cyan theme colors. Shared by his team panel, featured slide and member page, with reduced-motion support. The animation is decorative and respects reduced-motion preferences.
- `none`: the member's flat hero color.

To add one, add a name to `MemberStyle['backdrop']` in `packages/shared/src/types.ts` and draw it in `Backdrop.tsx`. Only the active scene is mounted, and switching members cross-fades between scenes.

## BigFour's own slide

The home carousel has five slides: BigFour first, then one per member. BigFour's slide (`features/home/TeamPanels.tsx`) puts the four members' scenery side by side as four equal panels across the full width, with no lines between them. Each panel has that member's background, scenery and accent (`themeVars(member)` in `lib/theme.ts` scopes a member's theme to a single element), and a label at the same inset (the gutter) in every panel, in one plain style: the member's initial, in their accent, then their name. The wordmark on this slide is one whole word in BigFour's own heavy sans.

- Members are never numbered anywhere on the site (no 01–04): the four are equals, so labels use their initials.
- Everything else on the slide (tagline, description, arrows, "Explore our projects", the index) uses BigFour's own neutral black theme, as do the header and everything below the hero.
- The panels are built from `members`, so they follow the member list.

## Hero text layout

Every slide shares one text layout, built on a single edge: the gutter (`--edge` in `HomeHero.module.css`). On the home page the header runs full width too, so its logo and nav sit on the same edges as the hero.

- Top left: the status line on member slides, the panel labels on BigFour's slide.
- Bottom left, one left-aligned stack: the wordmark, the tagline, the description and the arrow buttons. `lib/useInkAlign.ts` pulls the wordmark and the tagline left by their first letter's side bearing, so their ink starts exactly on the edge, like the smaller text below them.
- Bottom right: the slide index (each entry an initial and a name), ending a clear step above "Explore our projects", an outlined button the same height and style as the arrows, on their row. Both end on the right edge, in line with the header nav.

On phones the description is hidden, "Explore" moves under the arrows, and the index floats above the stack at the right.

## Projects page

All projects are shown together in one grid, with no grouping by status (`pages/ProjectsPage.tsx`). The grid and its preview window are one component, `features/projects/ProjectShowcase.tsx`, which the home page's "Recent projects" (the `featured` projects) reuses, so both look and behave the same. The cards (`features/projects/ShowcaseCard.tsx`) follow the "Other Projects" cards on David's portfolio, in BigFour's neutral black theme: a screenshot, the title, who built it (a dot in each member's accent), the description, an optional disclaimer, the tech stack and the links.

A project with a trailer shows it on its card instead of the screenshot: it autoplays, silent and on a loop, with no controls, as soon as the card is near the screen (the file is not fetched before that, and it pauses when the card scrolls away). Visitors who prefer reduced motion keep the screenshot. Two buttons sit over the card (always visible on touch screens): "Watch trailer" opens the same trailer larger, in a browser-style window (`components/LiveDemoDialog.tsx`), again autoplaying muted on a loop, and "Try it live" opens the project's live `embedUrl` in that window. A project without a trailer shows its screenshot and only "Try it live"; a trailer that cannot play on a visitor's device falls back to the live site. The window is a native modal dialog with replay or reload, open-the-live-site-in-a-new-tab and close. Escape or a click outside closes it (and stops the video), and focus returns to the card.

## Giving each member their own layout

Each member's page is rendered through a layout registry, so every member can have a profile inspired by their own portfolio. By default every member uses `DefaultMemberLayout`.

1. Create a component that takes `MemberLayoutProps` (`member`, `services` and `projects`) in `features/members/layouts/`.
2. Register it by slug in `features/members/layouts/index.ts`.

This exists in both `apps/web/src` and `apps/mobile/src`, since UI is platform-specific.

## Notes

- **React is pinned to `19.2.3`** in both apps. Expo requires the exact React version that its React Native release bundles, and one pinned version keeps the workspace on a single copy of React. For the same reason `react-router` is on v7: v8 needs React 19.2.7 or newer. Upgrade these together when Expo moves to a newer React.
- **Design status:** the web home page, header and footer implement the BigFour Home prototype. The Projects page has its own showcase cards (see above). The Members and member profile pages reuse its components and tokens as a stand-in until their own designs arrive. The mobile app shows the shared content but has no visual design yet.
