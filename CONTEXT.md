# Context

Glossary for the TAWS website. TAWS is a student research group at ESPOL (Guayaquil), part of the FIEC, working on web, mobile and data science since 2007.

This file defines what our words mean. It carries no implementation detail — for decisions and their rationale see `docs/adr/`.

## People

### User

An account that can sign into the Payload admin and edit site content. A User is **not** a person shown on the public site.

`User.role` (`admin` / `editor` / `viewer`) is about **permissions in the CMS** and nothing else. Never use "role" to mean someone's job in the club — see Position.

### Member

A person who belongs, or belonged, to TAWS and is shown publicly on the site.

A Member has no account and no relationship to a User. Someone can be both — a Member who also administers the site — but the site models those as two unrelated records, because the reasons to be one have nothing to do with the reasons to be the other.

A Member is never deleted. When someone leaves the club they become an **alumnus**; their record and the year they joined are kept.

### Position

A Member's job inside the club — president, coordinator, plain member. Distinct from `User.role`, which is CMS permissions. When we say "cargo" in Spanish we mean Position.

### Active member

A Member with status `active`. The count shown on the landing page ("32 miembros activos") is the number of active Members, computed from the data — never typed in by hand.

### Alumnus

A Member with status `alumni`. Someone who was in TAWS and no longer is. Kept forever; the club has close to twenty years of them.

### Major

The ESPOL degree programme a Member is enrolled in ("carrera"). Not to be confused with Work area.

## Content

### Work area

One of the fields TAWS works in — web, mobile, machine learning, data science, IoT, research. Work areas are part of the site's design and narrative rather than editable content, so they live in the repository, not in the CMS. They are the single taxonomy: Projects and Applications both classify against this same list.

### Project

Something TAWS builds or researches. A Project belongs to one or more Work areas, is `active` or `completed`, and may credit the Members who worked on it. One Project at a time may be **featured** — the large card at the top of the projects section.

A Project has no page of its own. Its card links out to the repository or the paper, which is where the real content lives.

### Event

Something the club organises on a date — a talk, a workshop, a fair. **Upcoming** and **past** are not stored; they are derived by comparing the event's start against the current time. There is no flag anyone has to remember to flip.

### Album

A set of images published together under a title and a date — what the site calls the gallery. An Album **may** point at an Event, in which case it is that Event's photos and inherits its occasion. An Album that points at nothing is a loose set: the lab, a meeting, the everyday.

The gallery is never a flat pile of individual photos. The unit of publication is the Album.

### Post

A blog article, written by a Member — never by a User. A Post is a **draft** until it is published; only published Posts are visible on the site or through the public API.

Reading time is derived from the content, not authored.

## Recruitment

### Application

A submission from a student who wants to join TAWS: their name, institutional email, major and areas of interest.

Applications are the only thing the public can write to this site, and they contain real students' personal data. **They are never publicly readable** — not on the site, not through the API. Only `admin` and `editor` Users can read them.

### Recruitment window

The period during which the club accepts Applications. **Open** and **closed** are derived from the current date against the window's dates — nobody toggles a switch. Outside the window the application form is not rendered at all.

The window's dates change every semester, so unlike the rest of the site's narrative they are editable from the CMS.
