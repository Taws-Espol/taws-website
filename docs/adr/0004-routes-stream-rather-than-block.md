# Routes stream rather than block, and a missing record answers 200

A page keyed on something that may not exist — a Post slug, a page number — has to choose between two things it cannot have together.

It can await that value before responding, decide the record is missing, and return a real `404`. The cost is that nothing renders until the database has answered: no shell, no skeleton, a blank tab for as long as the query takes.

Or it can respond immediately with the static shell, read the value inside a boundary, and call `notFound()` from in there. The cost is that the status line has already gone out as `200`, because headers are sent when streaming starts.

We choose to stream. Every route serves its shell first.

## Why the 404 is affordable

The reason to want the status was the belief that a `200` carrying a not-found page becomes a soft 404 that search engines index. That is not what happens. Next injects `<meta name="robots" content="noindex">` into a streamed not-found, and its documentation is explicit that this "does not lead to indexation". Verified against a production build: an unknown slug returns `200`, the `noindex` tag is in the HTML, and the site's not-found page renders.

The documentation gives exactly one reason to insist on the status — compliance or analytics — and neither applies to a student club's website. What does apply is that this site is read on phones on campus wifi, where a blank tab waiting on a query is the worse failure.

If a real status is ever needed, the documented route is an existence check at the edge that rewrites to a not-found route. That adds infrastructure, and it can be added the day the reason exists.

## What this costs elsewhere

Nothing above a `Suspense` boundary may read URL data — not `params`, not `searchParams`, and not `usePathname` in a client component. The site navigation highlights the current route, so it reads the pathname; before this decision that was invisible, because the only route that would have noticed was blocking anyway. It now renders a shell that knows no active route, and upgrades once the pathname is known.

That is the general shape of the trade: the shell is the part of the page that is true for every URL, and anything URL-specific has to sit below a boundary.

## History

This was decided the other way round first. `instant = false` was added to the Post route specifically to avoid the soft 404, on the SEO reasoning above, which turned out to be wrong. Both decisions were made in good faith on the same question; this record exists so the next person reads the evidence instead of re-deriving it.
