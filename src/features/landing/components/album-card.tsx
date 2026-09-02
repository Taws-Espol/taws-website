"use client";

import Image from "next/image";

import { AlbumViewer } from "@/features/landing/components/album-viewer";
import type { Album } from "@/features/landing/types/album";
import { formatAlbumDate } from "@/features/landing/utils/format-album-date";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Eyebrow, Heading } from "@/shared/components/ui/typography";

export function AlbumCard({ album }: { album: Album }) {
  const cover = typeof album.cover === "object" ? album.cover : null;

  return (
    <Dialog>
      <DialogTrigger
        className="group focus-visible:ring-ring flex flex-col gap-3 rounded-xl text-left focus-visible:ring-2 focus-visible:outline-none"
        aria-label={`Abrir el álbum ${album.title}`}
      >
        <div className="bg-muted relative aspect-[4/3] overflow-hidden rounded-xl">
          {cover?.url ? (
            <Image
              src={cover.url}
              alt={cover.alt ?? album.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : null}
        </div>

        <Heading as="h3" className="text-base">
          {album.title}
        </Heading>

        <Eyebrow className="text-foreground/50">
          {formatAlbumDate(album.date)} · {album.images.length} fotos
        </Eyebrow>

        {typeof album.event === "object" && album.event ? (
          <Eyebrow className="text-muted-foreground">
            {album.event.title}
          </Eyebrow>
        ) : null}
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogTitle>{album.title}</DialogTitle>
        <AlbumViewer album={album} />
      </DialogContent>
    </Dialog>
  );
}
