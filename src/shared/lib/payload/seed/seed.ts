import type { Payload } from "payload";

import {
  SEED_ALBUMS,
  SEED_APPLICATIONS,
  SEED_COVERS,
  SEED_EVENTS,
  SEED_MEMBERS,
  SEED_POSTS,
  SEED_PROJECTS,
  SEED_USERS,
} from "./data.ts";
import { makePlaceholderImage } from "./make-placeholder-image.ts";

const PASSWORD = "test";

function daysFromNow(days: number) {
  return new Date(Date.now() + days * 86_400_000).toISOString();
}

function paragraph(text: string) {
  return {
    type: "paragraph",
    version: 1,
    children: [{ type: "text", text, version: 1 }],
  };
}

function richText(body: string) {
  return {
    root: {
      type: "root",
      version: 1,
      direction: null,
      format: "",
      indent: 0,
      children: [paragraph(body.repeat(4)), paragraph(body.repeat(3))],
    },
  } as never;
}

/**
 * A handful of flat colours rather than one shared image. The seed still proves
 * the upload path and nothing more, but with the listings paginated a page of
 * identical cards tells you nothing about whether you moved — or whether what
 * you are looking at is stale.
 */
async function uploadPlaceholders(payload: Payload) {
  const covers = [];

  for (const [index, colour] of SEED_COVERS.entries()) {
    const data = makePlaceholderImage(1200, 800, [...colour]);

    covers.push(
      await payload.create({
        collection: "media",
        data: { alt: `Imagen de ejemplo ${index + 1}` },
        file: {
          data,
          mimetype: "image/png",
          name: `placeholder-${index + 1}.png`,
          size: data.length,
        },
      }),
    );
  }

  return covers;
}

/**
 * Wipes the content collections and fills them again, so running it twice does
 * not stack duplicates. Users are left alone: deleting the account you are
 * logged in with is a bad surprise.
 */
export async function seed(payload: Payload) {
  const collections = [
    "applications",
    "gallery",
    "posts",
    "events",
    "projects",
    "members",
    "media",
  ] as const;

  for (const collection of collections) {
    await payload.delete({ collection, where: { id: { exists: true } } });
  }

  payload.logger.info("Cleared existing content.");

  for (const user of SEED_USERS) {
    const { totalDocs } = await payload.count({
      collection: "users",
      where: { email: { equals: user.email } },
    });

    if (totalDocs === 0) {
      await payload.create({
        collection: "users",
        data: { ...user, password: PASSWORD },
      });
    }
  }

  const covers = await uploadPlaceholders(payload);
  const cover = (index: number) => covers[index % covers.length].id;

  const members = [];
  for (const [index, member] of SEED_MEMBERS.entries()) {
    members.push(
      await payload.create({
        collection: "members",
        data: { ...member, photo: cover(index) },
      }),
    );
  }

  for (const [index, project] of SEED_PROJECTS.entries()) {
    /**
     * A different slice per Project, so the collaborator row is not the same
     * two faces on every card and the overflow counter has something to count.
     */
    const start = index % members.length;
    const size = 2 + (index % 4);

    await payload.create({
      collection: "projects",
      data: {
        ...project,
        areas: [...project.areas],
        cover: cover(index),
        members: members.slice(start, start + size).map((member) => member.id),
      },
    });
  }

  const events = [];
  for (const [index, event] of SEED_EVENTS.entries()) {
    const { daysFromNow: offset, ...rest } = event;
    events.push(
      await payload.create({
        collection: "events",
        data: {
          ...rest,
          cover: cover(index),
          startsAt: daysFromNow(offset),
        },
      }),
    );
  }

  for (const [index, album] of SEED_ALBUMS.entries()) {
    const images = Array.from({ length: album.imageCount }, (_, i) => ({
      image: cover(index + i),
      caption: `Foto ${i + 1}`,
    }));

    await payload.create({
      collection: "gallery",
      data: {
        title: album.title,
        date: daysFromNow(album.daysFromNow),
        cover: cover(index),
        images,
        event: album.eventSlug
          ? events.find((event) => event.slug === album.eventSlug)?.id
          : undefined,
      },
    });
  }

  for (const [index, post] of SEED_POSTS.entries()) {
    const { body, status, ...rest } = post;
    await payload.create({
      collection: "posts",
      data: {
        ...rest,
        cover: cover(index),
        author: members[index % members.length].id,
        publishedAt: daysFromNow(-index * 9),
        content: richText(body),
        _status: status,
      },
    });
  }

  for (const application of SEED_APPLICATIONS) {
    await payload.create({
      collection: "applications",
      data: { ...application, interests: [...application.interests] },
      overrideAccess: true,
    });
  }

  await payload.updateGlobal({
    slug: "recruitment",
    data: {
      opensAt: daysFromNow(-3),
      closesAt: daysFromNow(21),
      closedMessage:
        "La convocatoria está cerrada por ahora. Síguenos en redes para enterarte de la próxima.",
    },
  });

  payload.logger.info(
    `Seeded ${SEED_MEMBERS.length} members, ${SEED_PROJECTS.length} projects, ${SEED_EVENTS.length} events, ${SEED_ALBUMS.length} albums, ${SEED_POSTS.length} posts and ${SEED_APPLICATIONS.length} applications.`,
  );
  payload.logger.info(`Users share the password ${PASSWORD}.`);
}
