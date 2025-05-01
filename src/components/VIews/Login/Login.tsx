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
} from "@/components/Views/Login/styles";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      // console.log("Testing DataTOKEN", data.token);
      // return;
      Cookies.set("token", data.token, { expiresIn: "1h", secure: true });

      dispatch(setUser(data.user));

      // redirect to dashboard
      router.push("/");
    } catch (err: any) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <Wrapper>
      <Card>
        <Title>Login</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleLogin}>
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
          <Button type="submit">Login</Button>
        </Form>
        <SignupText>
          Don't have an account?{" "}
          <SignupLink onClick={() => router.push("/signup")}>
            Sign up
          </SignupLink>
        </SignupText>
      </Card>
    </Wrapper>
  );
};

export default Login;
