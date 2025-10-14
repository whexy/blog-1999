import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  if (!searchParams.has("url")) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 },
    );
  }

  const imageUrl = searchParams.get("url");
  if (!imageUrl) {
    return NextResponse.json(
      { error: "Invalid URL parameter" },
      { status: 400 },
    );
  }

  try {
    const resp = await fetch(imageUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; NotionImageProxy/1.0)",
      },
    });

    if (!resp.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: resp.status },
      );
    }

    const buffer = await resp.arrayBuffer();
    const contentType =
      resp.headers.get("content-type") || "application/octet-stream";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control":
          "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400",
        "CDN-Cache-Control": "public, max-age=31536000",
        "Vercel-CDN-Cache-Control": "public, max-age=31536000",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
