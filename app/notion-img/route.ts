import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  if (searchParams.has("url")) {
    const Id = searchParams.get("url");
    const resp = await fetch(Id);
    if (resp.ok) {
      return resp;
    } else {
      return NextResponse.error();
    }
  }
}
