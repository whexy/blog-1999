import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale, type Language } from "@/lib/site";

/**
 * Pick the best supported locale from an Accept-Language header,
 * honoring quality values and order (e.g.
 * `fr-CH, fr;q=0.9, zh;q=0.8, en;q=0.7` → `zh`).
 */
function localeFromAcceptLanguage(
  header: string | null,
): Language | undefined {
  if (!header) return undefined;
  const ranked = header
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params
        .map(p => p.trim())
        .find(p => p.startsWith("q="));
      const q = qParam ? Number(qParam.slice(2)) : 1;
      return {
        lang: tag.trim().split("-")[0].toLowerCase(),
        q: Number.isNaN(q) ? 0 : q,
        index,
      };
    })
    .filter(entry => entry.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index);
  return ranked.map(entry => entry.lang).find(isLocale);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip non-localized routes and anything that looks like a file.
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/img/") ||
    pathname.startsWith("/notion-img") ||
    pathname === "/dyn" ||
    pathname.startsWith("/dyn/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const first = pathname.split("/")[1];
  const pathLocale = isLocale(first) ? first : undefined;
  const locale =
    pathLocale ??
    localeFromAcceptLanguage(
      request.headers.get("accept-language"),
    ) ??
    defaultLocale;

  // There is no post index page: /posts and /{lang}/posts go home.
  const rest = pathLocale
    ? pathname.slice(pathLocale.length + 1)
    : pathname;
  if (rest === "/posts" || rest === "/posts/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  if (pathLocale) return NextResponse.next();

  // No locale in the path: rewrite (not redirect) so CDN-cached
  // unprefixed URLs keep working.
  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Images and other static assets
     */
    "/((?!api|_next/static|_next/image|favicon.ico|giscus.css|robots.txt|images|img|files).*)",
  ],
};
