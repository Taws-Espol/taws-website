# Public API

Payload exposes every collection and global over REST, and most of them read without a session. That is how the website itself reads its content, and it is how anything outside this repository — a club dashboard, a bot, a student project — can read TAWS data.

Base URL:

```
https://taws.espol.edu.ec/api
```

Locally that is `http://localhost:3000/api`.

## Before you build on this

**Call it from anywhere.** The API answers with `Access-Control-Allow-Origin: *`, so a page on your own domain, a script, a notebook or a native app can all read it without a key.

Because the header is a literal `*`, browsers will not attach cookies to a cross-origin call. Every caller from another domain is anonymous and sees exactly what the public sees — logging into the admin panel in another tab changes nothing.

There is no rate limiting on reads and no versioning. Treat the shape as something that can change when a collection changes, and pin nothing you cannot re-check.

## What is readable

| Collection   | Path                | Anonymous read | Notes                                          |
| ------------ | ------------------- | -------------- | ---------------------------------------------- |
| Members      | `/api/members`      | Yes            |                                                |
| Events       | `/api/events`       | Yes            |                                                |
| Projects     | `/api/projects`     | Yes            |                                                |
| Gallery      | `/api/gallery`      | Yes            | Albums, each with an array of images           |
| Posts        | `/api/posts`        | Yes            | Published only; drafts need a session          |
| Media        | `/api/media`        | Yes            | Image records; the files themselves are below  |
| Applications | `/api/applications` | **No** (`403`) | Write-only to the public, readable by the club |
| Users        | `/api/users`        | **No** (`403`) | Accounts, never public                         |

Globals are read the same way, under `/api/globals/<slug>`: `hero`, `manifesto`, `history` and `recruitment`. They return the document itself rather than a list.

```bash
curl https://taws.espol.edu.ec/api/globals/recruitment
```

## Response shape

A collection request returns a page of documents plus its pagination:

```json
{
  "docs": [{ "id": 13, "title": "Taller de introducción a Git" }],
  "totalDocs": 7,
  "limit": 2,
  "totalPages": 4,
  "page": 1,
  "hasNextPage": true,
  "hasPrevPage": false,
  "nextPage": 2,
  "prevPage": null,
  "pagingCounter": 1
}
```

A single document is `/api/<collection>/<id>`.

## Query parameters

| Parameter | What it does                                                                                |
| --------- | ------------------------------------------------------------------------------------------- |
| `limit`   | Documents per page. `0` returns all of them.                                                |
| `page`    | Which page, 1-based.                                                                        |
| `sort`    | Field to order by. Prefix with `-` to reverse: `sort=-startsAt`.                            |
| `depth`   | How far to follow relationships. `0` leaves them as ids, `1` populates them, and so on.     |
| `select`  | Which fields to return: `select[title]=true&select[startsAt]=true`. `id` always comes back. |
| `where`   | The filter, described below.                                                                |

`depth` is the one worth thinking about. At `depth=0` a project's `cover` is the number `4`; at `depth=1` it is the whole media document, including the `url` you need to show the image. Higher depths cost more on the server, so ask for the depth you actually use.

```bash
# The two earliest events, with their covers populated
curl "https://taws.espol.edu.ec/api/events?sort=startsAt&limit=2&depth=1"

# Just the titles
curl "https://taws.espol.edu.ec/api/events?select[title]=true&depth=0"
```

## Filtering with `where`

`where` is nested query-string syntax: `where[field][operator]=value`.

```bash
# Projects tagged with the web area
curl "https://taws.espol.edu.ec/api/projects?where[areas][contains]=web"

# Posts in one category, newest first
curl "https://taws.espol.edu.ec/api/posts?where[category][equals]=tutorial&sort=-publishedAt"

# Events from 2026 onwards
curl "https://taws.espol.edu.ec/api/events?where[startsAt][greater_than]=2026-01-01"
```

Useful operators: `equals`, `not_equals`, `greater_than`, `greater_than_equal`, `less_than`, `less_than_equal`, `like`, `in`, `not_in`, `exists`, `contains`. Combine conditions with `where[and][0][...]` and `where[or][0][...]`.

Remember to URL-encode the brackets when your client does not do it for you.

## Images

A media document carries its own path:

```json
{
  "filename": "placeholder.png",
  "mimeType": "image/png",
  "width": 1200,
  "height": 800,
  "url": "/api/media/file/placeholder.png"
}
```

Resolve `url` against the base host and request it directly — `https://taws.espol.edu.ec/api/media/file/placeholder.png`. The path is relative because the files live in a private S3 bucket that is never exposed directly; the application proxies them, which is why there is no bucket URL to link to.

## Posts and drafts

Posts use drafts. An anonymous request only ever sees `_status: "published"`, so an unpublished post is invisible rather than forbidden — it is simply absent from `docs` and from `totalDocs`.

## The one thing the public can write

`POST /api/applications` is open, because that is how someone applies to the club. Every other write needs an authenticated user with the right role.

The website does not use this endpoint. It posts through a server action that adds a honeypot field and a rate limit, both of which this endpoint lacks. If you are automating an application, prefer the form.

## Worked example

Every published post, with author and cover populated, newest first:

```bash
curl "https://taws.espol.edu.ec/api/posts?depth=1&limit=0&sort=-publishedAt"
```

```js
const res = await fetch(
  "https://taws.espol.edu.ec/api/posts?depth=1&limit=0&sort=-publishedAt",
);
const { docs } = await res.json();

for (const post of docs) {
  console.log(post.title, post.author?.fullName, post.cover?.url);
}
```

That runs anywhere: a server, a build script, or a page on your own site.
