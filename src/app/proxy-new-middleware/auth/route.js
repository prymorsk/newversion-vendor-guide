import { NextResponse } from "next/server";

export async function GET(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const type = request.cookies.get("user-type")?.value;

  const isPublicPath =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/manager/login" ||
    pathname === "/vendor/login" ||
    pathname === "/company/login";

  /* Vendor subscription redirect */
  if (type === "0" && token && !pathname.startsWith("/plan")) {
    return NextResponse.redirect(
      new URL("/advertise", request.url)
    );
  }

  /* Logged-in user hitting public pages */
  if (isPublicPath && token) {
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

  /* Not logged in */
  if (!isPublicPath && !token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  /* Role protection */
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
