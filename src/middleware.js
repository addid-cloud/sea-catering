import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  const protectedPaths = ["/subscription"];

  if (protectedPaths.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/register", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token || decode.role !== "admin") {
      return NextResponse.redirect(new URL("/dashBoardAdmin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/subscription", "/dashboard/:path*"],
};
