import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public paths that don't require authentication
const publicPaths = ["/signin", "/signup", "/verify", "/api/auth/signup", "/api/auth/signin", "/api/auth/verify"];

// Paths that should redirect to dashboard if already authenticated
const authPaths = ["/signin", "/signup"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  const isPublicPath = publicPaths.some(
    (publicPath) => path === publicPath || path.startsWith(publicPath + "/")
  );
  const isAuthPath = authPaths.includes(path);

  // If user is logged in and trying to access auth pages, redirect to dashboard
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  // If user is not logged in and trying to access protected pages, redirect to signin
  if (!isPublicPath && !token && path !== "/") {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/profile/:path*",
    "/signin",
    "/signup",
    "/verify",
  ],
};
