import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "zh"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    locale =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return pathname.split("/")[1];

  // Check Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(",")[0]
      .split("-")[0]
      .toLowerCase();

    if (locales.includes(preferredLocale)) {
      return preferredLocale;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for:
  // - API routes
  // - Static files (_next/static)
  // - Images and public files
  // - Favicon
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/img/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    locale =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // Redirect if there is no locale
  if (!pathnameHasLocale) {
    const locale = getLocale(request);

    // For root path, redirect to language-specific root
    if (pathname === "/") {
      return NextResponse.redirect(
        new URL(`/${locale}`, request.url),
      );
    }

    // For other paths, add language prefix
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url),
    );
  }

  return NextResponse.next();
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
    "/((?!api|_next/static|_next/image|favicon.ico|images|img|files).*)",
  ],
};
