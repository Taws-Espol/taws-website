# TAWS Website

[![CI](https://github.com/Taws-Espol/taws-website/actions/workflows/ci.yml/badge.svg)](https://github.com/Taws-Espol/taws-website/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

Official website for the TAWS Student Club at ESPOL, showcasing our initiatives in Data Science, Artificial Intelligence, Web, and Mobile Development. Developed by the TAWS Team. Built with Next.js 16, Payload CMS 3, and PostgreSQL.

## Stack

| Layer                | Technology                                                |
| -------------------- | --------------------------------------------------------- |
| Framework            | Next.js 16 (App Router, React Compiler, Cache Components) |
| Runtime              | React 19                                                  |
| CMS                  | Payload CMS 3 (headless, self-hosted)                     |
| Database             | PostgreSQL (Docker for local development)                 |
| Storage              | S3-compatible object storage                              |
| Styling              | Tailwind CSS 4, shadcn/ui                                 |
| Internationalization | next-intl (English, Spanish)                              |
| Email                | React Email, Nodemailer                                   |
| Language             | TypeScript 6                                              |
| Package Manager      | pnpm                                                      |
| Testing              | Vitest                                                    |
| Code Quality         | ESLint, Prettier, Husky, lint-staged, commitlint          |
| CI                   | GitHub Actions                                            |

## Project Structure

```
src/
├── app/
│   ├── (payload)/              # Payload CMS admin panel and API routes
│   ├── (taws)/
│   │   ├── [locale]/           # Locale-prefixed public pages
│   │   │   ├── (home)/         # Landing page
│   │   │   ├── about/
│   │   │   ├── blog/           # Blog listing and [slug] post pages
│   │   └── api/                # Health check, revalidation, attendance endpoints
│   ├── robots.ts
│   └── sitemap.ts
├── features/                   # Feature modules: components, queries, utils, tests
│   ├── blog/
│   ├── landing/
└── shared/
    ├── components/             # Reusable UI (header, footer, shadcn/ui, typography)
    ├── constants/              # Cache tags, error codes
    ├── hooks/                  # Shared React hooks
    ├── lib/
    │   ├── payload/            # Collections, globals, tasks, migrations, types
    ├── styles/                 # Global CSS and design tokens
    ├── tests/                  # Tests for shared modules
    ├── types/
    └── utils/
```

Key files at the project root:

| File                    | Purpose                                                              |
| ----------------------- | -------------------------------------------------------------------- |
| `payload.config.ts`     | Collections, globals, plugins, jobs, localization, database adapter  |
| `next.config.ts`        | Next.js configuration with Payload and next-intl integrations        |
| `docker-compose.yaml`   | Local PostgreSQL instance                                            |
| `vitest.config.ts`      | Test runner configuration                                            |
| `commitlint.config.mjs` | Commit message rules                                                 |
| `messages/`             | Translation files (`en.json`, `es.json`)                             |
| `docs/agents/`          | Configuration read by the agent skills — issue tracker, labels, docs |

## Requirements

- [Node.js](https://nodejs.org/) 20.9 or later, as required by Next.js 16. CI and `flake.nix` both use Node 24.
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
| `PUBLIC_S3_*`        | Endpoint, region, key id, secret and bucket for media storage            |

Media uploads and outbound email need real credentials; the rest of the site runs without them.

### 3. Start PostgreSQL

```bash
docker compose up -d
```

### 4. Optionally seed local data

Run the seed script only when you deliberately want bootstrap content in the current database:

```bash
pnpm payload seed
```

For a clean sandbox, reset the volume first:

```bash
docker compose down -v && docker compose up -d && pnpm payload seed
```

`pnpm payload seed` is a manual operation and must never run in a production deploy.

### 5. Start the development server

```bash
pnpm dev
```

The site is at [http://localhost:3000](http://localhost:3000) and the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin).

To preview transactional email templates instead:

```bash
pnpm dev:email
```

## Checks

Run these before opening a pull request. The first three are what CI runs.

```bash
pnpm lint        # eslint — a single warning fails it
pnpm typecheck   # tsc --noEmit
pnpm test        # vitest, once
pnpm build       # production build; needs PostgreSQL running
```

### Testing

Vitest runs in a `node` environment with no jsdom, so tests cover pure logic rather than rendered components — query filters, cache-tag wiring, email rendering, error mapping.

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

Deployed on Coolify. The build command runs migrations first:

```bash
pnpm build   # payload migrate && next build
```

- Build command: `pnpm build`
- Start command: `pnpm start`

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
| `pnpm dev:email`  | Start the React Email preview server                    |

## Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request. It covers branch naming, the Conventional Commits rules enforced by commitlint, how issues are filed and triaged, and the review flow.

Every pull request runs lint, typecheck and tests in GitHub Actions, and gets a preview deployment.

## Security

Report vulnerabilities privately through GitHub's Security tab. See [SECURITY.md](./SECURITY.md).

## License

[MIT](./LICENSE)
