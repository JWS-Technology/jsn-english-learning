import { NextRequest, NextResponse } from "next/server";
import { verifyEdgeToken } from "@/config/edge-auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const pathname = req.nextUrl.pathname;

  const auth = token ? await verifyEdgeToken(token) : null;

  if (pathname.startsWith("/admin")) {
    if (!auth || auth.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (pathname.startsWith("/api/materials")) {
    if (req.method !== "GET") {
      if (!auth || auth.role !== "admin") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/materials/:path*"],
};
