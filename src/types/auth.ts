export interface User {
  id: string;
  username: string;
  role: "Admin" | "User";
  password: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}
