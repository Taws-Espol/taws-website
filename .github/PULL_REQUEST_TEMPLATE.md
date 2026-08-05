<!--
The PR title becomes the commit message on main, because this repository squash-merges.
Keep it in Conventional Commits form: type(scope): short description in english
-->

Closes #

## What changed

<!-- What this PR does, and why this approach. Not a file-by-file list. -->

## How to verify

<!--
Steps a reviewer can follow themselves. Not a description of testing you already did.
Include the URL or route to open, what to click, and what should happen.
-->

1.
2.

## Risk and rollout

<!--
Anything that could break, anything environment-dependent, required env vars,
migrations, or a note that this is safe and self-contained.
-->

## Checklist

- [ ] Title follows Conventional Commits and matches the work
- [ ] Branch is named `type/taws-<issue-number>`
- [ ] Linked issue above, so it closes on merge
- [ ] Everything is in English
- [ ] `pnpm lint`, `pnpm typecheck` and `pnpm test` all pass
- [ ] Preview deployment builds successfully
- [ ] Acceptance criteria on the linked issue are met
