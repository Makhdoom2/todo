import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export interface AuthenticatedUser {
  id: string;
  username: string;
  role: "Admin" | "User";
}

export const withAuth = (
  handler: (req: NextRequest, user: AuthenticatedUser) => Promise<NextResponse>
) => {
  return async (req: NextRequest) => {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

      const user: AuthenticatedUser = {
        username: decoded.username,
        role: decoded.role,
        id: decoded.id,
      };

      // Pass user to handler
      return handler(req, user);
    } catch (error) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }
  };
};
