"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createTask } from "@/store/tasksSlice";
import { AssignedTo, Task } from "@/types/task";
import {
  Form,
  FormGroup,
  FormWrapper,
  Input,
  Label,
  Select,
  SubmitButton,
  Textarea,
  Title,
} from "./styles";
import { BackArrow } from "@/styles/TaskDetail";
import { FiArrowLeft } from "react-icons/fi";
import Cookies from "js-cookie";
import useUsers from "@/app/tasks/[id]/use-users";

const TaskForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { data: users } = useUsers();

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      const token = Cookies.get("token");

      const selectedUser = users.find((user) => user.id === data.assignedTo);

      if (!selectedUser) {
        alert("Assigned user not found");
        setLoading(false);
        return;
      }

      const newTask: Task = {
        id: new Date().toISOString(),
        title: data.title,
        status: data.status,
        description: data.description,
        priority: data.priority,
        assignedTo: {
          id: selectedUser.id,
          name: selectedUser.name,
        },
        dueDate: data.dueDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log("Submitting Task:", newTask);

      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });

      if (!res.ok) {
        throw new Error("Failed to create task");
      }

      const createdTask = await res.json();

      dispatch(createTask(createdTask));

      router.push("/");
    } catch (err) {
      console.error("Error in creating task:", err);
      alert("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper>
      <BackArrow onClick={() => router.back()}>
        <FiArrowLeft size={24} />
      </BackArrow>
      <Title>Create Task</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            placeholder="enter title..."
            {...register("title", { required: "Title is required" })}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="status">Status</Label>
          <Select id="status" {...register("status")}>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="priority">Priority</Label>
          <Select id="priority" {...register("priority")}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="assignedTo">Assigned To</Label>
          <Select id="assignedTo" {...register("assignedTo")}>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input type="date" id="dueDate" {...register("dueDate")} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="description..."
          />
        </FormGroup>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Task"}
        </SubmitButton>
      </Form>
    </FormWrapper>
  );
};

export default TaskForm;
