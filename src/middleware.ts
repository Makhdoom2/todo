import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const publicPaths = ["/", "/signup"];

  /**
   * jsonwebtoken library internally uses Node's crypto module -> which Edge Runtime doesn't support
   * (because it uses Web APIs, not Node.js APIs).
   * so im using jose now for verification of token
   */

  async function verifyJwt(token: string) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      // console.log("DECODED:", payload);
      return payload;
    } catch (err) {
      console.error("JWT VERIFY ERROR:", err);
      return false;
    }
  }
  const isPublicPath = publicPaths.includes(req.nextUrl.pathname);
  //if auth
  const isAuthenticated = !!token && verifyJwt(token);

  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isPublicPath && !isAuthenticated) {
    return NextResponse.next();
  }

  if (isAuthenticated) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: ["/", "/dashboard", "/signup", "/tasks"],
};
