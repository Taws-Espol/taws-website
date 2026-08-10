import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "");

  if (!token || token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  if (!tag) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  revalidateTag(tag, "max");

  return NextResponse.json({ ok: true });
}
