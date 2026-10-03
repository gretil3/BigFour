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

| Page     | Web route        | Mobile route      |
| -------- | ---------------- | ----------------- |
| Home     | `/`              | `(tabs)/index`    |
| Members  | `/members`       | `(tabs)/members`  |
| Member   | `/members/:slug` | `members/[slug]`  |
| Projects | `/projects`      | `(tabs)/projects` |

## Getting started

Requires Node 22.12+ (`.nvmrc` pins 24).

```bash
npm install
```

| Command              | What it does                                    |
| -------------------- | ----------------------------------------------- |
| `npm run dev:web`    | Start the web app (Vite dev server)             |
| `npm run dev:mobile` | Start the mobile app (Expo, scan with Expo Go)  |
| `npm run build:web`  | Typecheck and build the web app                 |
| `npm run typecheck`  | Typecheck every workspace                       |
| `npm run lint`       | Lint with Oxlint                                |
| `npm run format`     | Format with Prettier (`format:check` to verify) |

## Editing content

Members and projects live in one place, [`packages/shared/src/data`](packages/shared/src/data), and both apps read from it.

- `members.ts`: replace the four placeholder members. `slug` becomes the URL (`/members/<slug>`).
- `projects.ts`: add projects with a `status` of `completed`, `in-progress` or `planned`.
- `team.ts`: the group name, tagline and description.

## Giving each member their own layout

Each member's page is rendered through a layout registry, so every member can have a profile inspired by their own portfolio. By default every member uses `DefaultMemberLayout`.

1. Create a component that takes `MemberLayoutProps` (`member` and `projects`) in `features/members/layouts/`.
2. Register it by slug in `features/members/layouts/index.ts`.

This exists in both `apps/web/src` and `apps/mobile/src`, since UI is platform-specific.

## Notes

- **React is pinned to `19.2.3`** in both apps. Expo requires the exact React version that its React Native release bundles, and one pinned version keeps the workspace on a single copy of React. For the same reason `react-router` is on v7: v8 needs React 19.2.7 or newer. Upgrade these together when Expo moves to a newer React.
- The visual design (green theme, typography, per-member styling) is not implemented yet. The apps render unstyled placeholder content so the structure and routing can be built on first.
