# TAWS Website

[![CI](https://github.com/Taws-Espol/taws-website/actions/workflows/ci.yml/badge.svg)](https://github.com/Taws-Espol/taws-website/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

Official website for the TAWS Student Club at ESPOL, showcasing our initiatives in Data Science, Artificial Intelligence, Web, and Mobile Development. Developed by the TAWS Team. Built with Next.js 16, Payload CMS 3, and PostgreSQL.

## Stack

| Layer           | Technology                                                |
| --------------- | --------------------------------------------------------- |
| Framework       | Next.js 16 (App Router, React Compiler, Cache Components) |
| Runtime         | React 19                                                  |
| CMS             | Payload CMS 3 (headless, self-hosted)                     |
| Database        | PostgreSQL (Docker for local development)                 |
| Storage         | S3-compatible object storage                              |
| Styling         | Tailwind CSS 4, shadcn/ui on Base UI primitives           |
| Forms           | React Hook Form, Zod                                      |
| Icons           | Hugeicons                                                 |
| Language        | TypeScript 6                                              |
| Package Manager | pnpm                                                      |
| Testing         | Vitest                                                    |
| Code Quality    | ESLint, Prettier, Husky, lint-staged, commitlint          |
| CI              | GitHub Actions                                            |

The site is Spanish-only, with Spanish route names (`/nosotros`, `/proyectos`, `/eventos`, `/galeria`, `/postula`) and permanent redirects from their former English paths.

## Project Structure

```
src/
├── app/
│   ├── (payload)/              # Payload admin panel and REST API routes
│   ├── (taws)/                 # The public site, and its root layout
│   │   ├── (home)/             # Landing page
│   │   ├── nosotros/           # The club, its history and its members
│   │   ├── proyectos/
│   │   ├── eventos/
│   │   ├── galeria/
│   │   ├── blog/               # Listing and [slug] post pages
│   │   ├── postula/            # Application form
│   │   ├── not-found.tsx       # 404 for a route that exists but has no record
│   │   └── api/revalidate/     # Called by Payload hooks to flush cache tags
│   ├── global-not-found.tsx    # 404 for a URL matching no route at all
│   ├── manifest.ts
│   ├── robots.ts
│   └── sitemap.ts
├── features/                   # One folder per feature: components, hooks,
│   ├── blog/                   # queries, schemas, types, utils and tests
│   ├── landing/
│   └── recruitment/
└── shared/
    ├── components/             # Header, footer, illustrations, shadcn/ui
    ├── constants/              # Cache tags, majors, work areas
    ├── lib/
    │   ├── payload/            # Collections, globals, access, migrations, seed
    │   └── umami/
    ├── styles/                 # Global CSS and design tokens
    ├── tests/                  # Tests for shared modules
    ├── types/
    └── utils/
```

Only three features exist — `landing`, `blog` and `recruitment` — and that is deliberate. Anything that does not belong to one of them belongs in `shared`.

Key files at the project root:

| File                    | Purpose                                                              |
| ----------------------- | -------------------------------------------------------------------- |
| `payload.config.ts`     | Collections, globals, plugins, jobs, localization, database adapter  |
| `next.config.ts`        | Next.js configuration, redirects, and the Payload integration        |
| `docker-compose.yaml`   | Local PostgreSQL instance                                            |
| `vitest.config.ts`      | Test runner configuration                                            |
| `commitlint.config.mjs` | Commit message rules                                                 |
| `CONTEXT.md`            | What the project is and the decisions that shaped it                 |
| `docs/adr/`             | Architecture decision records, including superseded ones             |
| `docs/public-api.md`    | How to read club data over the REST API                              |
| `docs/agents/`          | Configuration read by the agent skills — issue tracker, labels, docs |

## Requirements

- [Node.js](https://nodejs.org/) 24, the version in `.node-version`. That file is the single source: CI reads it, the deployment builder reads it, and `nvm use` or `fnm use` picks it up locally.
- [pnpm](https://pnpm.io/) — the version is pinned in `packageManager`, so use `pnpm`, never `npx`.
- [Docker](https://www.docker.com/), for the local PostgreSQL database.

## Local Development Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

| Variable             | Description                                                              |
| -------------------- | ------------------------------------------------------------------------ |
| `APP_URL`            | Application URL, e.g. `http://localhost:3000`                            |
| `PAYLOAD_SECRET`     | Any random string, used to encrypt Payload tokens                        |
| `DATABASE_URL`       | `postgresql://postgres:postgres@localhost:5432/payload` for local Docker |
| `REVALIDATE_TOKEN`   | Bearer token the Payload hooks use to call `/api/revalidate`             |
| `ENABLE_JOB_WORKERS` | Whether this instance runs the background job queue                      |
| `S3_*`               | Endpoint, region, key id, secret and bucket name for media storage       |

Media uploads need real S3 credentials; the rest of the site runs without them.

### 3. Start PostgreSQL

```bash
docker compose up -d
```

### 4. Optionally seed local data

Run the seed script only when you deliberately want bootstrap content in the current database:

```bash
pnpm seed
```

It creates two accounts, `admin@test.com` and `editor@test.com`, both with the password `test`, and enough content to see every page populated.

For a clean sandbox, reset the volume first:

```bash
docker compose down -v && docker compose up -d && pnpm seed
```

Seeding is a manual operation and must never run in a production deploy.

### 5. Start the development server

```bash
pnpm dev
```

The site is at [http://localhost:3000](http://localhost:3000) and the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin).

To open the dev server from another device on your network — a phone, say — add that device's host to `allowedDevOrigins` in `next.config.ts` and restart. Next blocks its own development assets from origins it was not started with, and the symptom is a page that renders but does not respond to a single tap.

## Checks

Run these before opening a pull request. The first three are what CI runs.

```bash
pnpm lint        # eslint — a single warning fails it
pnpm typecheck   # tsc --noEmit
pnpm test        # vitest, once
pnpm build       # production build; needs PostgreSQL running
```

### Testing

Vitest runs in a `node` environment with no jsdom, so tests cover pure logic rather than rendered components — schema validation, cache-tag wiring, date splitting, rate limiting.

Tests live in a `tests/` folder scoped to the code they cover: `src/shared/tests/` for shared modules, `src/features/<feature>/tests/` for a feature. Use `pnpm test:watch` while working.

Anything needing a database — Payload access control in particular — is verified on the preview deployment rather than in CI.

## Payload Migration Workflow

Migrations live in `src/shared/lib/payload/migrations`.

### Creating a migration

1. Develop normally — Payload pushes schema changes to your local database automatically.
2. Once a collection or field change is settled, generate the migration:

   ```bash
   pnpm payload migrate:create your-change-name
   ```

3. Review the generated files and commit them together with the schema change.

### The migrate prompt

`payload migrate` stops on an interactive prompt when it detects a dev-pushed database:

> It looks like you've run Payload in dev mode … data loss will occur. Would you like to proceed?

- Answer **no** during `pnpm build`. Answering yes makes Payload replay the whole chain against an already-migrated database, which fails on types that already exist.
- Answer **yes** only to apply migrations to an empty database, after `docker compose down -v && docker compose up -d`. That is also how to verify a new migration applies cleanly from scratch.

### Seeding versus migrations

Migrations carry schema changes and the data transformations needed to evolve existing records. `pnpm payload seed` inserts bootstrap content and is never part of a deploy.

## Deployment

Deployed on Coolify, built with [Railpack](https://railpack.com/). The build command runs migrations first:

```bash
pnpm build   # payload migrate && next build
```

- Build pack: Railpack
- Build command: `pnpm build`
- Start command: `pnpm start`

There is no build configuration file. Railpack detects the project from `package.json`: Node from `.node-version`, pnpm from `packageManager`, and the commands above from the Coolify settings.

### The build needs the database

Both halves of `pnpm build` connect to PostgreSQL, so `DATABASE_URL` has to be set **and reachable from the build container**, not only from the running one.

`payload migrate` obviously needs it. Less obviously, so does `next build`: with Cache Components the pages are prerendered at build time, and prerendering `/` reads the hero and the member count. Point the build at an unreachable host and it fails on `Error occurred prerendering page "/"`, long after migrations would have finished.

On Coolify that means the application must share a network with the database service, so its internal hostname resolves during the build. A build that cannot resolve it fails with `getaddrinfo EAI_AGAIN <hostname>` — the builder is simply not on that network. The alternative is a `DATABASE_URL` that is reachable from anywhere, which is worse for a database that should not be exposed.

### Production safety

- Never run `pnpm payload seed` automatically in a deploy.
- Never run `docker compose down -v` against anything but a local database.
- Keep to a single migration step per deploy, so replicas do not migrate concurrently.

## Available Scripts

| Command           | Description                                             |
| ----------------- | ------------------------------------------------------- |
| `pnpm dev`        | Start the Next.js development server                    |
| `pnpm build`      | Run Payload migrations, then create a production build  |
| `pnpm start`      | Run the production build                                |
| `pnpm lint`       | Run ESLint; a single warning fails the command          |
| `pnpm typecheck`  | Type-check with `tsc --noEmit`                          |
| `pnpm test`       | Run the test suite once                                 |
| `pnpm test:watch` | Run the test suite in watch mode                        |
| `pnpm payload`    | Run the Payload CLI, e.g. `pnpm payload migrate:create` |
| `pnpm seed`       | Insert bootstrap content; never run this in production  |

## Public API

Payload exposes the collections over REST, and members, events, projects, gallery, published posts and media all read without a session, from any origin. [docs/public-api.md](./docs/public-api.md) covers what is public, how to filter and paginate, and how to resolve image URLs.

```bash
curl "https://taws.espol.edu.ec/api/events?sort=startsAt&limit=5&depth=1"
```

## Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request. It covers branch naming, the Conventional Commits rules enforced by commitlint, how issues are filed and triaged, and the review flow.

Every pull request runs lint, typecheck and tests in GitHub Actions, and gets a preview deployment.

## Security

Report vulnerabilities privately through GitHub's Security tab. See [SECURITY.md](./SECURITY.md).

## License

[MIT](./LICENSE)
