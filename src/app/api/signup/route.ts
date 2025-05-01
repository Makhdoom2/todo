import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/types/auth";
import { getUsers, saveUsers } from "@/utils/users";

export async function POST(req: NextRequest) {
  const {
    username,
    password,
    role,
  }: { username: string; password: string; role: "Admin" | "User" } =
    await req.json();

  const users = getUsers();
  const userExists = users.find(
    (user: User) => user.username.toLowerCase() === username.toLowerCase()
  );

  if (userExists) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const newUser: User = {
    id: (users.length + 1).toString(),
    username,
    password,
    role,
  };

  users.push(newUser);
  saveUsers(users);

  const token = jwt.sign(
    { username: newUser.username, role: newUser.role, id: newUser.id },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  //   console.log("DATA:",token)
  // return;
  return NextResponse.json({ token, user: newUser }, { status: 200 });
}

export async function GET() {
  const users = getUsers();

  const userList = users.map(({ id, username }: any) => ({
    id,
    name: username,
  }));
  return NextResponse.json(userList, { status: 200 });
}
