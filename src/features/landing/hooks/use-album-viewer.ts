"use client";

import { useCallback, useEffect, useState } from "react";

export function useAlbumViewer(imageCount: number) {
  const [index, setIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setIndex((current) => (current - 1 + imageCount) % imageCount);
  }, [imageCount]);

  const goToNext = useCallback(() => {
    setIndex((current) => (current + 1) % imageCount);
  }, [imageCount]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") goToPrevious();
      if (event.key === "ArrowRight") goToNext();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

  return { index, goToPrevious, goToNext };
}
