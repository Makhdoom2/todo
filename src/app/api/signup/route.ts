import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { User } from "@/types/auth";

export const users: User[] = [
  {
    id: "0",
    username: "admin",
    password: "admin123",
    role: "Admin",
  },
  {
    id: "1",
    username: "bilal",
    password: "user123",
    role: "User",
  },
  {
    id: "2",
    username: "ahmad",
    password: "user123",
    role: "User",
  },
  {
    id: "3",
    username: "fatima",
    password: "user123",
    role: "User",
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      username,
      password,

      role,
    }: {
      username: string;
      password: string;

      role: "Admin" | "User";
    } = req.body;

    const userExists = users.find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser: User = {
      id: (users.length + 1).toString(),
      username,
      password,

      role,
    };

    users.push(newUser);

    const token = jwt.sign(
      { username: newUser.username, role: newUser.role, id: newUser.id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token, user: newUser });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
