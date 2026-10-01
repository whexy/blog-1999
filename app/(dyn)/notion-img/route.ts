import { NextRequest, NextResponse } from "next/server";

// Hosts that react-notion-x / notion-utils `defaultMapImageUrl`
// produces for images, plus the hosts Notion redirects them to.
const allowedHosts = new Set([
  "www.notion.so",
  "notion.so",
  "app.notion.com",
  "file.notion.so",
  "img.notionusercontent.com",
  "prod-files-secure.s3.us-west-2.amazonaws.com",
  "images.unsplash.com",
]);
const allowedHostSuffixes = [".notion-static.com"];
// Shared S3 endpoints: only Notion's legacy bucket path.
const s3Hosts = new Set([
  "s3.us-west-2.amazonaws.com",
  "s3-us-west-2.amazonaws.com",
]);
const s3PathPrefix = "/secure.notion-static.com/";

const maxBytes = 15 * 1024 * 1024;
const maxRedirects = 3;
const fetchTimeoutMs = 15_000;

const isAllowedUrl = (url: URL): boolean =>
  url.protocol === "https:" &&
  url.username === "" &&
  url.password === "" &&
  (url.port === "" || url.port === "443") &&
  (allowedHosts.has(url.hostname) ||
    allowedHostSuffixes.some(s => url.hostname.endsWith(s)) ||
    (s3Hosts.has(url.hostname) &&
      url.pathname.startsWith(s3PathPrefix)));

const errorResponse = (message: string, status: number) =>
  NextResponse.json(
    { error: message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );

/**
 * Fetches `url`, following up to `maxRedirects` redirects manually
 * so that every hop is re-validated against the allowlist.
 */
async function fetchAllowed(
  url: URL,
  signal: AbortSignal,
): Promise<Response | undefined> {
  let current = url;
  for (let hop = 0; hop <= maxRedirects; hop++) {
    if (!isAllowedUrl(current)) return undefined;
    const resp = await fetch(current, {
      redirect: "manual",
      signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; NotionImageProxy/1.0)",
      },
    });
    if (resp.status < 300 || resp.status >= 400) return resp;
    const location = resp.headers.get("location");
    await resp.body?.cancel();
    if (!location) return undefined;
    current = new URL(location, current);
  }
  return undefined;
}

/** Reads the body, aborting once it exceeds `maxBytes`. */
async function readLimited(
  resp: Response,
): Promise<Uint8Array | undefined> {
  if (!resp.body) return new Uint8Array(0);
  const reader = resp.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      return undefined;
    }
    chunks.push(value);
  }
  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body;
}

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");
  if (!rawUrl) {
    return errorResponse("URL parameter is required", 400);
  }

  let imageUrl: URL;
  try {
    imageUrl = new URL(rawUrl);
  } catch {
    return errorResponse("Invalid URL parameter", 400);
  }
  if (!isAllowedUrl(imageUrl)) {
    return errorResponse("URL host is not allowed", 403);
  }

  try {
    const resp = await fetchAllowed(
      imageUrl,
      AbortSignal.timeout(fetchTimeoutMs),
    );
    if (!resp) {
      return errorResponse("Redirect target is not allowed", 403);
    }
    if (!resp.ok) {
      await resp.body?.cancel();
      return errorResponse("Failed to fetch image", 502);
    }

    const contentType = (resp.headers.get("content-type") ?? "")
      .split(";")[0]
      .trim()
      .toLowerCase();
    // SVG can carry script, so only raster images are proxied.
    if (
      !contentType.startsWith("image/") ||
      contentType.includes("svg")
    ) {
      await resp.body?.cancel();
      return errorResponse("Upstream is not a raster image", 415);
    }

    const declaredLength = Number(resp.headers.get("content-length"));
    if (declaredLength > maxBytes) {
      await resp.body?.cancel();
      return errorResponse("Image too large", 413);
    }
    const body = await readLimited(resp);
    if (!body) return errorResponse("Image too large", 413);

    return new NextResponse(body as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(body.byteLength),
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "default-src 'none'; sandbox",
        "Cache-Control":
          "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400",
        "CDN-Cache-Control": "public, max-age=31536000",
        "Vercel-CDN-Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return errorResponse("Internal server error", 502);
  }
}
