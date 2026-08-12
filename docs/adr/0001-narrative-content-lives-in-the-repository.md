# Narrative content lives in the repository, not the CMS

The landing page mixes two kinds of content: things that grow and are edited by non-technical people (members, projects, events, albums, posts), and the club's narrative — the hero copy, the six work areas, the timeline milestones, the manifesto band. We put the first kind in Payload and the second kind in `src/features/landing/constants/` as typed constants.

The narrative changes roughly once every couple of years, and it is inseparable from the design: each work area carries an icon and a position in a fixed six-item grid, the manifesto is a hand-set band with a highlighted clause, the timeline is a bespoke layout. Making those editable buys the club almost nothing and costs us admin surface, database migrations, loading states and a class of bug where someone adds a seventh work area and the grid breaks.

## Consequences

- Changing the hero copy or adding a milestone requires a pull request. This is deliberate; it is also the thing the club's board is most likely to push back on.
- `WORK_AREAS` is the single source of truth for the taxonomy. The `areas` select on `projects` and the `interests` select on `applications` generate their options from that constant — a work area is never typed twice.
- The recruitment window is the one exception: its dates change every semester, so they live in a Payload Global. Editability there is about cadence, not about being narrative.
