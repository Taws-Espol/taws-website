# Contributing

Everything must be in English — code, commits, PR titles, branch names, issue titles, and descriptions.

For local setup (dependencies, environment variables, database, seeding, dev server), see [README.md](./README.md#local-development-setup).

## Types

Every branch name, commit message, and PR title starts with a type from the [Conventional Commits](https://www.conventionalcommits.org/) set:

| Type       | Use it for                                                                     |
| ---------- | ------------------------------------------------------------------------------ |
| `feat`     | New user-facing behaviour                                                      |
| `fix`      | A bug fix, urgent or not                                                       |
| `refactor` | Restructuring that does not change behaviour                                   |
| `perf`     | A change made specifically to improve performance                              |
| `docs`     | Documentation only                                                             |
| `style`    | Formatting only, no logic change                                               |
| `test`     | Adding or correcting tests                                                     |
| `build`    | Build system, dependencies, deployment, and environment configuration          |
| `ci`       | CI pipeline and GitHub Actions configuration only                              |
| `chore`    | Maintenance that fits nothing above, including tooling and agent configuration |
| `revert`   | Reverting a previous commit                                                    |

The commit linter accepts these and nothing else.

## Scopes

A scope is optional but strongly preferred, and must be lower-case kebab-case. Use the singular form and stay consistent — `registration`, never `registrations`.

Common scopes: `landing`, `blog`, `registration`, `conference`, `analytics`, `core`, `agents`, `repo`.

## Branch naming

All branches must follow this pattern:

```
type/taws-<issue-number>
```

The `taws-` prefix is always required, and the type must come from the table above.

Examples:

- `fix/taws-115`
- `feat/taws-103`
- `docs/taws-121`

This is enforced by the `pre-push` hook, which also refuses direct pushes to `main`.

## Commit convention

```
type(scope): short description in english
```

To link a commit to its issue and close it automatically on merge, add `fixes #<issue-number>` in the commit body:

```
fix(registration): clear cedula validation error state on input change

fixes #115
```

This is enforced by the `commit-msg` hook, which runs `commitlint` against `commitlint.config.mjs`.

## Opening issues

Use one of the issue forms — blank issues are disabled. The form marks **Acceptance criteria** as required, so every issue states what "done" looks like.

**Issue titles are plain descriptive English, not Conventional Commits.** An issue describes a _problem_; a commit describes a _change_. The type is a property of the eventual fix, which nobody knows at filing time — the same bug might land as a `fix`, a `refactor`, or a `perf`. Type belongs in **labels**, which are filterable; a title prefix is not.

The forms prefill a `[Bug]:` or `[Request]:` marker, which also keeps issues visually distinct from PRs in the shared number space.

```
Good:  [Bug]: umami reports data from non-production environments
Bad:   fix(analytics): umami reports data from non-production environments
```

Labels carry the classification: `bug` or `enhancement` for the kind, and the triage labels below for the state.

### Triage labels

| Label             | Meaning                                  |
| ----------------- | ---------------------------------------- |
| `needs-triage`    | Maintainer needs to evaluate this issue  |
| `needs-info`      | Waiting on reporter for more information |
| `ready-for-agent` | Fully specified, ready for an AFK agent  |
| `ready-for-human` | Requires human implementation            |
| `wontfix`         | Will not be actioned                     |

New issues get `needs-triage` automatically from the form. These strings are mirrored in `docs/agents/triage-labels.md`, which the agent skills read — change both together.

## PR flow

1. Create a branch from `main` following the naming convention above
2. Work and commit following the commit convention above
3. Push the branch and open a PR, filling in the PR template
4. Review happens in one of two ways, depending on who opened the PR

**The PR title becomes the commit message on `main`,** because `main` requires linear history and PRs are squash-merged. A sloppy PR title becomes a sloppy commit in history. The `commit-msg` hook cannot catch this — the squash commit is created by GitHub, not locally — so the title is your responsibility.

### Review

`.github/CODEOWNERS` requests review from `waldaara` automatically.

- **If someone other than `waldaara` opened the PR**, wait for `waldaara`'s approval. Only `waldaara` has bypass permissions on `main`.
- **If `waldaara` opened the PR**, GitHub will not request review from the author, and self-approval is rejected — so no approving review is possible and the PR stays blocked. `waldaara` merges it using their bypass permission. Nothing reviews these PRs, so keep them small and describe them well.

### Branch protection on `main`

A ruleset is active and will block a merge that does not satisfy it:

- Pull request required, linear history required, no force pushes, no deletion

## CI/CD

Two things run on every PR, and both must pass before review:

- **GitHub Actions** (`.github/workflows/ci.yml`) runs `pnpm lint`, `pnpm typecheck` and `pnpm test`.
- **A preview deployment** is built automatically. If the build fails, the PR will not be reviewed — fix the build first.

The production build is not repeated in Actions, because it needs a Postgres instance and the preview deployment already covers it.

## Local enforcement

Hooks run through husky:

| Hook         | What it does                                                 |
| ------------ | ------------------------------------------------------------ |
| `pre-commit` | Runs `lint-staged` — eslint and prettier on staged files     |
| `commit-msg` | Runs `commitlint` on the commit message                      |
| `pre-push`   | Validates the branch name and blocks direct pushes to `main` |

If a hook blocks something it should not, fix the name or message rather than passing `--no-verify`.

Run these before opening a PR. Use pnpm scripts — never `npx`, which can resolve a different version than the `packageManager` field pins.

| Command          | What it checks                        |
| ---------------- | ------------------------------------- |
| `pnpm lint`      | eslint across the repository          |
| `pnpm typecheck` | `tsc --noEmit`                        |
| `pnpm test`      | vitest, once, non-watching            |
| `pnpm build`     | the production build (needs Postgres) |
