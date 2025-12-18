import { NextResponse } from "next/server";

/**
 * Next.js 16 Middleware
 * Edge-safe, no client hooks
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const type = request.cookies.get("user-type")?.value;
  const isSubscribe = request.cookies.get("isSubscribe")?.value;

  const isPublicPath =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/manager/login" ||
    pathname === "/vendor/login" ||
    pathname === "/company/login";

  /* ---------------- Not logged in → private pages ---------------- */
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  /* ---------------- Vendor subscription rule ---------------- */
  if (
    token &&
    type === "0" &&
    !isSubscribe &&
    !pathname.startsWith("/plan") &&
    !pathname.startsWith("/advertise") &&
    !isPublicPath
  ) {
    return NextResponse.redirect(new URL("/advertise", request.url));
  }

  /* ---------------- Logged-in user visiting public pages ---------------- */
  if (token && isPublicPath) {
    if (type === "1") {
      return NextResponse.redirect(
        new URL("/manager/dashboard", request.url)
      );
    }
    if (type === "0") {
      return NextResponse.redirect(
        new URL("/vendor/dashboard", request.url)
      );
    }
    if (type === "2") {
      return NextResponse.redirect(
        new URL("/company/dashboard", request.url)
      );
    }
  }

  /* ---------------- Role-based access protection ---------------- */
  if (token && type !== "0" && pathname.startsWith("/vendor")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && type !== "1" && pathname.startsWith("/manager")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && type !== "2" && pathname.startsWith("/company")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

/* ---------------- Route matching ---------------- */
export const config = {
  matcher: [
    "/register",
    "/login",
    "/manager/:path*",
    "/vendor/:path*",
    "/company/:path*",
    "/plan/:path*",
    "/advertise",
  ],
};
