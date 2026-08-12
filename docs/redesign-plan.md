# Website redesign — work plan

Four engineers, one blocking foundation phase, then four vertical tracks. Vocabulary is defined in [CONTEXT.md](../CONTEXT.md); the decisions behind the shape are in [docs/adr/](./adr).

Conventions from [CONTRIBUTING.md](../CONTRIBUTING.md) apply throughout: English everywhere, `type/taws-<issue>` branches, `pnpm lint && pnpm typecheck && pnpm test` green before review.

## Route map

| Route          | Contents                                                   |
| -------------- | ---------------------------------------------------------- |
| `/`            | Landing: hero, work areas, timeline, projects, manifesto, blog, members, application form — each a summary linking onward |
| `/about`       | Who we are + history + full member grid                     |
| `/projects`    | All projects                                                |
| `/events`      | Upcoming and past                                           |
| `/gallery`     | Albums                                                      |
| `/blog`        | Post index, plus `/blog/[slug]`                             |
| `/apply`       | Application form                                            |

Nav: Nosotros · Proyectos · Eventos · Galería · Blog, plus the "Postula ahora" CTA. History is not a nav item.

## Content model

Six collections and one global. Every collection gets public `read` except `applications`.

| Collection     | Public read | Notes                                                        |
| -------------- | ----------- | ------------------------------------------------------------ |
| `members`      | yes         | Never deleted; `status: active \| alumni`                     |
| `projects`     | yes         | `areas` options generated from `WORK_AREAS`; one `featured`   |
| `events`       | yes         | Upcoming/past derived from `startsAt`, never stored           |
| `gallery`      | yes         | Albums; optional relationship to an event                     |
| `posts`        | published only | Drafts on; author is a Member                              |
| `applications` | **no**      | Public create, read restricted to `admin` / `editor`          |
| `recruitment` (global) | yes | `opensAt` / `closesAt`; open/closed derived                   |

## Phase 0 — foundations (blocking)

One or two engineers. Nobody starts a track until this lands, because every track consumes it.

1. **Design tokens.** Replace the neutral shadcn palette in `src/shared/styles/globals.css` with the TAWS blue as `--primary` and orange as `--secondary`. Add `--surface-inverted` / `--on-inverted` for the navy bands. Delete the `.dark` block and remove `next-themes`. The `dark:` prefix is banned — the navy bands are a component variant, not a theme.
2. **Typography.** Inter wired through `--font-sans`, plus typography components (`Heading`, `Text`, `Eyebrow`) matching the brand guidelines. Every other track composes these instead of writing `text-2xl font-bold` by hand.
3. **shadcn baseline.** `button`, `card`, `input`, `select`, `textarea`, `dialog`, `badge`, `skeleton`.
4. **Layout.** Real `Header` (nav + CTA + mobile menu, using the existing `use-is-mobile` hook) and `Footer`. Both are currently one-line placeholders.
5. **Dependencies.** `zod`, `react-hook-form`, `@hookform/resolvers` — none are installed.
6. **`/api/revalidate`.** `revalidateCache()` already calls a route nobody wrote. Bearer-token guarded via `REVALIDATE_TOKEN`, and it must win routing against Payload's `/api/[...slug]` catch-all in the `(payload)` route group.
7. **`WORK_AREAS` constant** in `src/features/landing/constants/`, with the helper that turns it into Payload select options. Three tracks depend on this.
8. **One reference collection end to end**, as the pattern everyone copies: collection config → access → revalidation hook → cache tag → `use cache` query → server component. `members` is the natural choice.

## Feature layout

Every feature under `src/features/<feature>/` follows the same shape:

```
components/   the component renders; it never decides and never queries
hooks/        use-<component-name>.ts — client components only
queries/      "use cache" + cacheLife() + cacheTag() — server reads
actions/      "use server" — returns ActionResponse<T, Code>
schemas/      zod — shared between form and action
constants/  types/  utils/
```

The `use<ComponentName>` rule applies to client components with state. Server components have no hooks; their logic moves to `queries/`. See ADR on that split before "fixing" a hookless component.

## Tracks

Each engineer owns their feature folders and their collection files end to end.

### Engineer 1 — landing shell

Hero (with the live active-member count), the work-areas grid, the timeline, the manifesto band, the ticker. Owns the `Section` component and its `inverted` variant, which tracks 2–4 consume. Assembles the landing page and slots in the summary sections the others deliver.

### Engineer 2 — members and blog

`members` collection, `/about` (who we are + history + full grid), the landing members summary with the `+N` overflow card. Then `posts`: drafts, category, author relationship to members, reading time computed in a `beforeChange` hook, `/blog`, `/blog/[slug]`, landing blog summary. Both cache tags already exist in `cache-tags.ts`.

### Engineer 3 — projects and events

`projects` collection with `areas` fed from `WORK_AREAS`, `/projects`, and the landing projects section (featured card plus three). No `/projects/[slug]` — cards link out to the repository or paper. Then `events`: `/events` split into upcoming and past derived from `startsAt`, never a stored flag.

### Engineer 4 — gallery and applications

`gallery` albums with the optional event relationship, `/gallery`, and an image viewer. Then the `recruitment` global, the `applications` collection with public create and restricted read, the form (react-hook-form + zod, schema shared with the server action), honeypot, IP rate limiting, and the closed-window state. The heaviest track for its size — the form is the only public write on the site.

## Expected collisions

Small and unavoidable; coordinate rather than refactor around them.

- `payload.config.ts` — one collection import per engineer
- `src/shared/components/header.tsx` — one nav entry each
- `src/shared/constants/cache-tags.ts` — one tag each
- `globals.css` — phase 0 only; after that it should not change

## Open blockers

Do not block starting, but do block finishing phase 0.

1. Exact blue and orange values, and whether Inter is served via `next/font/google` or self-hosted.
2. The real list of ESPOL majors for the `major` select.
3. Final copy: timeline milestones, manifesto, hero.
4. Initial content — 32 members, projects — and whether it is loaded via `seed.ts` or entered in the admin.
5. Target date for the redesign.
