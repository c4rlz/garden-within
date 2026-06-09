import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const isLogin = pathname === "/login";
  const isAuthApi = pathname.startsWith("/api/auth");

  if (!isLoggedIn && !isLogin && !isAuthApi) {
    const login = new URL("/login", req.nextUrl);
    login.searchParams.set(
      "callbackUrl",
      pathname + req.nextUrl.search
    );
    return NextResponse.redirect(login);
  }

  if (isLoggedIn && (isLogin || pathname === "/")) {
    return NextResponse.redirect(new URL("/today", req.nextUrl));
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|images/|manifest.webmanifest).*)",
  ],
};
