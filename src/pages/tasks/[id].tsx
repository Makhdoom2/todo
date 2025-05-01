import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import { Task } from "@/types/task";
import { FiArrowLeft } from "react-icons/fi";
import { users } from "../api/signup";
import Cookies from "js-cookie";

const TaskDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const token = Cookies.get("token");
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [originalTask, setOriginalTask] = useState<Task | null>(null);
  const dispatch = useDispatch();
  const allTasks = useSelector((state: RootState) => state?.tasks?.tasks);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "assignedTo") {
      //as now demo purpose I have to save id and name in assign to.
      const selectedUser = users.find((user) => user.id === value);
      setTask((prev) =>
        prev
          ? {
              ...prev,
              [name]: selectedUser
                ? { id: selectedUser.id, name: selectedUser.username }
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
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to update task");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
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
      setIsChanged(
        task.title !== originalTask.title ||
          task.description !== originalTask.description ||
          task.status !== originalTask.status ||
          task.priority !== originalTask.priority
      );
    }
  }, [task, originalTask]);

  if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
  if (!task) return <div>Task not found</div>;

  return (
    <FormWrapper>
      <BackArrow onClick={() => router.back()}>
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
            <option value="">Select</option>
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
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
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
