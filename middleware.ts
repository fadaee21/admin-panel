import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const hasToken = req.cookies.has("token");
  const isAuthPath = req.nextUrl.pathname.startsWith("/auth/login");
  console.log(hasToken, isAuthPath);
  if (!hasToken && !isAuthPath) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (hasToken && isAuthPath) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/", "/auth/:path*"],
};
