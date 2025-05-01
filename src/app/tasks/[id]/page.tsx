"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateTask } from "@/store/tasksSlice";
import {
  Form,
  FormGroup,
  FormWrapper,
  Input,
  Label,
  LoadingMessage,
  Select,
  SubmitButton,
  Textarea,
  Title,
  BackArrow,
} from "@/styles/TaskDetail";
import { AssignedTo, Task } from "@/types/task";
import { FiArrowLeft } from "react-icons/fi";
import Cookies from "js-cookie";
import { User } from "@/types/auth";
import useUsers from "./use-users";

const TaskDetails = () => {
  const router = useRouter();

  const params = useParams();
  const id = params.id;
  console.log("Task ID from URL: ", id);

  const token = Cookies.get("token");
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [originalTask, setOriginalTask] = useState<Task | null>(null);
  const dispatch = useDispatch();
  const allTasks = useSelector((state: RootState) => state?.tasks?.tasks);
  const { data: users } = useUsers();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "assignedTo") {
      //as now demo purpose I have to save id and name in assign to.
      const selectedUser = users?.find((user: AssignedTo) => user.id === value);
      setTask((prev) =>
        prev
          ? {
              ...prev,
              [name]: selectedUser
                ? { id: selectedUser.id, name: selectedUser.name }
                : undefined,
            }
          : null
      );
    } else {
      setTask((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || !id) return;
    setSaving(true);

    try {
      // const token = Cookies.get("token");

      console.log("SUBMIT ID:", task.id, "id:", id);
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });

      if (!res.ok) throw new Error("Failed to update task");

      const updated = await res.json();

      // updte local state and store
      setTask(updated);
      dispatch(updateTask(updated));

      // redirect to dashboard
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Failed to update task");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    // console.log("TESTING:", id);
    if (!id) return;

    const existingTask = allTasks.find((t) => t.id === id);
    if (existingTask) {
      setTask(existingTask);
      setOriginalTask(existingTask);
      setLoading(false);
    } else {
      fetch(`/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTask(data);
          setOriginalTask(data);
          dispatch(updateTask(data));
          setLoading(false);
        })
        .catch((err) => {
          console.error("failed to fetch task:", err);
          setLoading(false);
        });
    }
  }, [id, allTasks, dispatch]);

  useEffect(() => {
    if (task && originalTask) {
      const hasChanged =
        task.title !== originalTask.title ||
        task.description !== originalTask.description ||
        task.status !== originalTask.status ||
        task.priority !== originalTask.priority ||
        task.assignedTo?.id !== originalTask.assignedTo?.id;

      setIsChanged(hasChanged);
    }
  }, [task, originalTask]);

  if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
  if (!task) return <div>Task not found</div>;

  return (
    <FormWrapper>
      <BackArrow onClick={() => router.push("/")}>
        <FiArrowLeft size={24} />
      </BackArrow>
      <Title>Task</Title>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            value={task.description || ""}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="status">Status</Label>
          <Select name="status" value={task.status} onChange={handleChange}>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="priority">Priority</Label>
          <Select
            name="priority"
            value={task.priority || ""}
            onChange={handleChange}
          >
            {/* <option value="">Select</option> */}
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="assignedTo">Assigned To</Label>
          <Select
            name="assignedTo"
            value={task.assignedTo?.id || ""}
            onChange={handleChange}
          >
            {/* <option value="">Select User</option> */}
            {users.map((user: AssignedTo) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
        </FormGroup>

        <SubmitButton type="submit" disabled={saving || !isChanged}>
          {saving ? "Saving..." : "Save Changes"}
        </SubmitButton>
      </Form>
    </FormWrapper>
  );
};

export default TaskDetails;
