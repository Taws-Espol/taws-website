import { ImageResponse } from "next/og";

import { getPostBySlug } from "@/features/blog/queries/get-post-by-slug";

import { getAppUrl } from "@/shared/utils/get-app-url";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "TAWS";

/**
 * A Post shares with its own cover rather than the site's group photo. The
 * card is generated at the ratio social platforms actually use, so the crop is
 * ours instead of each platform's.
 *
 * The cover is read through the application's own media route, which is the
 * only way to reach a bucket that is deliberately not public. If that call
 * cannot be made, the card falls back to the club's colours and the title
 * rather than failing the request.
 */
async function readCover(url: string | null) {
  if (!url) return null;

  try {
    const response = await fetch(url);

    if (!response.ok) return null;

    const buffer = Buffer.from(await response.arrayBuffer());
    const type = response.headers.get("content-type") ?? "image/png";

    return `data:${type};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const cover = typeof post?.cover === "object" ? post.cover : null;

  const coverUrl = cover?.url
    ? new URL(cover.url, getAppUrl()).toString()
    : null;

  /**
   * The bytes are read here rather than left to the renderer to fetch, so a
   * cover that cannot be reached degrades to the plain card instead of taking
   * the whole image down with it.
   */
  const coverData = await readCover(coverUrl);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: "#0b2186",
      }}
    >
      {coverData ? (
        <img
          src={coverData}
          alt=""
          width={size.width}
          height={size.height}
          style={{ objectFit: "cover" }}
        />
      ) : null}

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: size.width,
          height: size.height,
          display: "flex",
          flexDirection: "column",
          padding: 72,
          // Heavier where the title sits, light at the top, so a busy cover
          // never costs the words their contrast.
          backgroundImage:
            "linear-gradient(to bottom, rgba(11,33,134,0.25), rgba(11,33,134,0.92))",
        }}
      >
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            color: "#ff7723",
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: 2,
          }}
        >
          TAWS
        </div>

        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: 62,
            fontWeight: 700,
            lineHeight: 1.15,
          }}
        >
          {post?.title ?? "Blog"}
        </div>
      </div>
    </div>,
    size,
  );
}
