import { NextRequest, NextResponse } from "next/server";

import { getImage, getRecentPlayed } from "@/lib/emby";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  if (searchParams.has("img")) {
    const Id = searchParams.get("img");
    const resp = await getImage(Id);
    if (resp.ok) {
      return resp;
    } else {
      return NextResponse.error();
    }
  } else {
    const recentPlayed = await getRecentPlayed();
    return NextResponse.json(recentPlayed);
  }
}
