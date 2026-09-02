# Narrative content moves into the CMS

Supersedes [ADR-0001](./0001-narrative-content-lives-in-the-repository.md).

ADR-0001 kept the hero, the manifesto, the timeline and the work areas in the repository, on the grounds that they change once every couple of years and are inseparable from the design. The first argument turned out to be wrong in practice: the board wants to reword the hero for each recruitment cycle and to adjust how the club describes itself, and every one of those edits was becoming a pull request written by someone who was not the author of the words.

So the hero, the manifesto and the timeline become Payload globals. The work areas stay in the repository.

The field configs carry the current copy as `defaultValue`, so a fresh database renders the site exactly as it does today and nothing is blank before anyone opens the admin.

## Why work areas are not editable

They were briefly a collection, on the grounds that a global could never make a newly added area selectable on a project — Payload builds a `select`'s options from static configuration at startup, so that part was true. It was the wrong thing to optimise for.

Six values that change every few years bought a database table, a relationship on two collections, a mandatory seed on every fresh database, and an `onInit` hook that took every page down with a 500 before it was moved out. The cost was real and recurring; the benefit was hypothetical. They are a constant again, and adding a seventh area is a pull request.

## Consequences

- Adding or renaming a work area is a pull request, deliberately.
- `WORK_AREAS` remains the single source of truth: the options on `projects.areas` and `applications.interests` are generated from it, so the taxonomy is never restated.
