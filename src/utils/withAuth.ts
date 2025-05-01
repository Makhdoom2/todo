import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export interface AuthenticatedNextApiRequest extends NextApiRequest {
  user: { id: string; username: string; role: "Admin" | "User" };
}

const withAuth = (handler: Function) => {
  return async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

      (req as AuthenticatedNextApiRequest).user = {
        username: decoded.username,
        role: decoded.role,
        id: decoded.id,
      };

      //   console.log("END POINT AUTH TESTING", decoded);

      return handler(req as AuthenticatedNextApiRequest, res);
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };
};

export default withAuth;
