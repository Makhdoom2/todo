import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUsers } from "@/utils/users";
import { User } from "@/types/auth";

export async function POST(req: NextRequest) {
  const { username, password }: { username: string; password: string } =
    await req.json();

  const users = getUsers();

  const user = users.find(
    (user: User) => user.username.toLowerCase() === username.toLowerCase()
  );

  if (!user) {
    return NextResponse.json(
      { message: "invalid credentials" },
      { status: 401 }
    );
  }

  if (user.password !== password) {
    return NextResponse.json(
      { message: "invalid credentials" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { username: user.username, role: user.role, id: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  //   console.log("DATA:",token)
  // return;

  return NextResponse.json({ token, user });
}
