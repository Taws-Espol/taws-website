# Members are not Users

`members` and `users` are unrelated collections with no relationship field between them, even though the same human is often both — a student shown on the site who also edits it.

They answer different questions. A User exists so someone can sign into the admin; it is an authentication record, and its `role` (`admin` / `editor` / `viewer`) is about permissions. A Member exists so a person appears on the public site; it is content, and its `position` is a job in the club. Linking them would mean roughly 32 admin accounts, per-record access control, and moderation of whatever each student writes about themselves — real work, in exchange for saving the board a few minutes of data entry per semester.

## Consequences

- Members do not edit their own profiles. The board maintains them from the admin.
- The two words stay separate on purpose: `User.role` is CMS permissions, `Member.position` is a club job. Do not introduce a `role` field on `members`.
- Deleting a User has no effect on the site's public content, which is the property we want.
- Reversing this later means a data migration that matches people across the two collections by name or email — feasible, but not free.
