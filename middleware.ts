import { NextRequest, NextResponse } from "next/server";
import { AUTHENTICATION_COOKIE } from "@/features/auth/constants";
import { unauthenticatedRoutes } from "@/common/constants/route";

const PUBLIC_PATHS = unauthenticatedRoutes.map(r => r.path) as readonly string[];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  console.log("la route :", pathname);

  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) return;

  const token = req.cookies.get(AUTHENTICATION_COOKIE)?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp)$).*)",
  ],
};
