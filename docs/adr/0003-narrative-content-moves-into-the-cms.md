# Narrative content moves into the CMS

Supersedes [ADR-0001](./0001-narrative-content-lives-in-the-repository.md).

ADR-0001 kept the hero, the manifesto, the timeline and the work areas in the repository, on the grounds that they change once every couple of years and are inseparable from the design. The first argument turned out to be wrong in practice: the board wants to reword the hero for each recruitment cycle and to adjust how the club describes itself, and every one of those edits was becoming a pull request written by someone who was not the author of the words.

So the hero, the manifesto and the timeline become Payload globals, and the work areas become a collection.

The field configs carry the current copy as `defaultValue`, so a fresh database renders the site exactly as it does today and nothing is blank before anyone opens the admin.

## Why work areas are a collection and not a global

They are referenced by `projects.areas` and `applications.interests`. Payload builds a `select`'s options from static configuration at startup, so a global could never make a newly added area selectable on a project — the list would be editable in name only. A collection with relationships makes it genuinely editable, at the cost of changing those two fields from `select` to `relationship`.

Because a collection has no `defaultValue`, an `onInit` hook seeds the six areas when the collection is empty. A fresh database is never missing the taxonomy.

## Consequences

- Icons are still not editable. Editors pick from a fixed list of allowed icon names, which the site maps to drawings — an icon picker is not worth building for six values.
- `work-areas.slug` is a stable key. Renaming it orphans the references, which is why the admin says so on the field.
- Reading work areas is needed by both `landing` and `recruitment`, so that query lives in `shared/queries/` rather than in either feature.
