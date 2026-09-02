import type { Payload } from "payload";

import {
  SEED_ALBUMS,
  SEED_APPLICATIONS,
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

/** One upload, reused everywhere: the seed proves the wiring, not the artwork. */
async function uploadPlaceholder(payload: Payload) {
  const data = makePlaceholderImage(1200, 800, [120, 140, 170]);

  return payload.create({
    collection: "media",
    data: { alt: "Imagen de ejemplo" },
    file: {
      data,
      mimetype: "image/png",
      name: "placeholder.png",
      size: data.length,
    },
  });
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

  const placeholder = await uploadPlaceholder(payload);

  const members = [];
  for (const member of SEED_MEMBERS) {
    members.push(
      await payload.create({
        collection: "members",
        data: { ...member, photo: placeholder.id },
      }),
    );
  }

  for (const project of SEED_PROJECTS) {
    await payload.create({
      collection: "projects",
      data: {
        ...project,
        areas: [...project.areas],
        cover: placeholder.id,
        members: members.slice(0, 2).map((member) => member.id),
      },
    });
  }

  const events = [];
  for (const event of SEED_EVENTS) {
    const { daysFromNow: offset, ...rest } = event;
    events.push(
      await payload.create({
        collection: "events",
        data: {
          ...rest,
          cover: placeholder.id,
          startsAt: daysFromNow(offset),
        },
      }),
    );
  }

  for (const album of SEED_ALBUMS) {
    const images = Array.from({ length: album.imageCount }, (_, i) => ({
      image: placeholder.id,
      caption: `Foto ${i + 1}`,
    }));

    await payload.create({
      collection: "gallery",
      data: {
        title: album.title,
        date: daysFromNow(album.daysFromNow),
        cover: placeholder.id,
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
        cover: placeholder.id,
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
