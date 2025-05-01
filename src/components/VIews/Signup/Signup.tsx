"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";
import {
  Button,
  Card,
  ErrorMessage,
  Form,
  Input,
  InputGroup,
  SignupLink,
  SignupText,
  Title,
  Wrapper,
  Select,
} from "@/components/Views/Login/styles";
import Cookies from "js-cookie";

const Signup = () => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"Admin" | "User">("User");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      const data = await response.json();

      Cookies.set("token", data.token, { expires: 10000, secure: true });
      dispatch(setUser(data.user));

      router.push("/");
    } catch (err: any) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  return (
    <Wrapper>
      <Card>
        <Title>Sign Up</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSignup}>
          <InputGroup>
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="role">Role</label>
            <Select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as "Admin" | "User")}
              required
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </Select>
          </InputGroup>
          <Button type="submit">Sign Up</Button>
        </Form>
        <SignupText>
          Already have an account?{" "}
          <SignupLink onClick={() => router.push("/")}>Login</SignupLink>
        </SignupText>
      </Card>
    </Wrapper>
  );
};

export default Signup;
