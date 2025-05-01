"use client";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import {
  Container,
  CreateButton,
  Header,
  LogoutButton,
  TaskListHeader,
  TaskListTitle,
  UserInfo,
  UserName,
  UserRole,
} from "@/styles/Dashboard";
import TaskList from "@/components/Views/TaskList/TaskList";
import { logout } from "@/store/authSlice";
import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";
import { resetTasks } from "@/store/tasksSlice";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleCreateTask = () => {
    router.push("/tasks/create");
  };

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(logout());
    dispatch(resetTasks());
    router.push("/login");
  };

  return (
    <Container>
      {/* <Title>Welcome, {user?.username}</Title>
      <SubText>Role: {user?.role}</SubText> */}

      <Header>
        <UserInfo>
          <UserName>Welcome, {user?.username}</UserName>
          <UserRole>Role: {user?.role}</UserRole>
        </UserInfo>
        <LogoutButton onClick={handleLogout}>
          <FiLogOut size={20} style={{ marginRight: "8px" }} />
          Logout
        </LogoutButton>
      </Header>
      <TaskListHeader>
        <TaskListTitle>Task List</TaskListTitle>
        <CreateButton onClick={handleCreateTask}>Create New Task</CreateButton>
      </TaskListHeader>
      <TaskList />
    </Container>
  );
};

export default Dashboard;
