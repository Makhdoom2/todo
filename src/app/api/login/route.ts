import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { users } from "./signup";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password }: { username: string; password: string } =
      req.body;

    const user = users.find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const token = jwt.sign(
      { username: user.username, role: user.role, id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token, user });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
