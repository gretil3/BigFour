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
- `members.ts`: each member's role, links, `palette` and `style`, lifted from their personal portfolio. While a member is featured (their home hero slide, their profile page) these re-theme the whole site, header to footer. `slug` becomes the URL (`/members/<slug>`).
  - `palette`: the colors (page, hero, cards, text, borders, accents).
  - `style`: the character. `typeface` (`serif`, `condensed`, `grotesk`, `system`), `shape` of corners (`sharp`, `crisp`, `soft`, `round`), `label` and nav dressing (`slashes` for `// Services`, `brackets` for `( SERVICES )`, `spaced` for wide-tracked caps, `mono` for code-style caps) and the hero `backdrop` (`forest`, `waves`, `none`). The web app maps these to fonts and CSS variables in `apps/web/src/lib/theme.ts`.
  - Pages with no featured member (Members, Projects) use BigFour's own neutral black theme, defined in `apps/web/src/styles/global.css`.
- `services.ts`: the "What we build" cards, each led by one member.
- `awards.ts`: the "Awards & hackathons" list.
- `projects.ts`: projects with a `status` of `completed`, `in-progress` or `planned`. `featured: true` puts one under "Recent projects" on the home page.

### Images

Web images are picked up automatically by file name. No code changes are needed.

- **Member cutouts** for the home hero: `apps/web/src/assets/members/<member-slug>.png`. They should be transparent PNGs; see the [README there](apps/web/src/assets/members/README.md) for sizing. Until a member's file exists, the hero shows nothing in its place.
- **Project screenshots**: `apps/web/src/assets/projects/<project-slug>.jpg` (PNG and WebP also work). Projects without one show a striped placeholder.

## Giving each member their own scenery

The home hero keeps one layout for everyone; only the theme and the scenery behind it change. A member's `style.backdrop` picks the scenery, drawn by `apps/web/src/components/Backdrop.tsx` behind their home slide and their profile band:

- `forest` (David): the night forest from his portfolio, ported in `components/forest/`. It has a moon, mist, three ranks of pines that drift with scroll and the pointer, and canvas fireflies that gather around the pointer.
- `waves` (Kevin): contour lines that slowly slide sideways.
- `none`: the member's flat hero color.

To add one, add a name to `MemberStyle['backdrop']` in `packages/shared/src/types.ts` and draw it in `Backdrop.tsx`. Only the active scene is mounted, and switching members cross-fades between scenes.

## Giving each member their own layout

Each member's page is rendered through a layout registry, so every member can have a profile inspired by their own portfolio. By default every member uses `DefaultMemberLayout`.

1. Create a component that takes `MemberLayoutProps` (`member`, `services` and `projects`) in `features/members/layouts/`.
2. Register it by slug in `features/members/layouts/index.ts`.

This exists in both `apps/web/src` and `apps/mobile/src`, since UI is platform-specific.

## Notes

- **React is pinned to `19.2.3`** in both apps. Expo requires the exact React version that its React Native release bundles, and one pinned version keeps the workspace on a single copy of React. For the same reason `react-router` is on v7: v8 needs React 19.2.7 or newer. Upgrade these together when Expo moves to a newer React.
- **Design status:** the web home page, header and footer implement the BigFour Home prototype. The Members, member profile and Projects pages reuse its components and tokens as a stand-in until their own designs arrive. The mobile app shows the shared content but has no visual design yet.
