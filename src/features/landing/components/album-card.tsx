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
import { Heading, Text } from "@/shared/components/ui/typography";

export function AlbumCard({ album }: { album: Album }) {
  const cover = typeof album.cover === "object" ? album.cover : null;

  return (
    <Dialog>
      <DialogTrigger
        className="group bg-card focus-visible:ring-ring shadow-soft hover:shadow-lift flex flex-col overflow-hidden rounded-3xl text-left transition-shadow focus-visible:ring-2 focus-visible:outline-none"
        aria-label={`Abrir el álbum ${album.title}`}
      >
        <div className="bg-surface relative aspect-[4/3] w-full overflow-hidden">
          {cover?.url ? (
            <Image
              src={cover.url}
              alt={cover.alt ?? album.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5 p-6">
          <Heading as="h3" variant="card">
            {album.title}
          </Heading>

          <Text variant="caption" className="text-muted-foreground">
            {formatAlbumDate(album.date)} · {album.images.length} fotos
          </Text>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-5xl">
        <DialogTitle>{album.title}</DialogTitle>
        <AlbumViewer album={album} />
      </DialogContent>
    </Dialog>
  );
}
