import type { NextApiRequest, NextApiResponse } from "next";
import type { Task } from "@/types/task";
import withAuth from "@/utils/withAuth";

export let tasks: Task[] = [
  {
    id: "1",
    title: "Complete the financial report",
    description:
      "Prepare the financial report for Q1 and submit it for review.",
    status: "todo",
    assignedTo: {
      id: "1",
      name: "Bilal Hussain",
    },
    createdAt: "2025-04-25T12:30:00Z",
    updatedAt: "2025-04-25T12:30:00Z",
    priority: "high",
    dueDate: "2025-04-30",
  },
  {
    id: "2",
    title: "Organize team meeting",
    description:
      "Set up a meeting to discuss the next project phase and timelines.",
    status: "in-progress",
    assignedTo: {
      id: "2",
      name: "Ahmad Khan",
    },
    createdAt: "2025-04-20T10:00:00Z",
    updatedAt: "2025-04-26T14:15:00Z",
    priority: "medium",
    dueDate: "2025-04-28",
  },
  {
    id: "3",
    title: "Prepare client presentation",
    description:
      "Create a presentation for the client showcasing our recent work.",
    status: "done",
    assignedTo: {
      id: "3",
      name: "Fatima Ali",
    },
    createdAt: "2025-04-10T09:00:00Z",
    updatedAt: "2025-04-20T11:00:00Z",
    priority: "low",
    dueDate: "2025-04-15",
  },
  {
    id: "4",
    title: "Fix the security issue",
    description:
      "Investigate and resolve the security vulnerability in the app.",
    status: "in-progress",
    assignedTo: {
      id: "1",
      name: "Bilal Hussain",
    },
    createdAt: "2025-04-23T08:30:00Z",
    updatedAt: "2025-04-25T16:45:00Z",
    priority: "high",
    dueDate: "2025-04-27",
  },
  {
    id: "5",
    title: "Update website content",
    description: "Edit and update the content on the company website.",
    status: "todo",
    assignedTo: {
      id: "2",
      name: "Ahmad Khan",
    },
    createdAt: "2025-04-22T14:00:00Z",
    updatedAt: "2025-04-22T14:00:00Z",
    priority: "medium",
    dueDate: "2025-05-05",
  },
  {
    id: "6",
    title: "Design the new feature",
    description:
      "Work on the UI/UX design for the new feature to be added to the app.",
    status: "done",
    assignedTo: {
      id: "3",
      name: "Fatima Ali",
    },
    createdAt: "2025-04-18T11:00:00Z",
    updatedAt: "2025-04-19T12:30:00Z",
    priority: "low",
    dueDate: "2025-04-20",
  },
  {
    id: "7",
    title: "Research competitor products",
    description:
      "Research and analyze competitor products to understand market trends.",
    status: "in-progress",
    assignedTo: {
      id: "1",
      name: "Bilal Hussain",
    },
    createdAt: "2025-04-24T16:45:00Z",
    updatedAt: "2025-04-25T09:30:00Z",
    priority: "high",
    dueDate: "2025-04-29",
  },
  {
    id: "8",
    title: "Plan marketing strategy",
    description:
      "Develop a marketing strategy for the upcoming product launch.",
    status: "todo",
    assignedTo: {
      id: "2",
      name: "Ahmad Khan",
    },
    createdAt: "2025-04-15T13:00:00Z",
    updatedAt: "2025-04-15T13:00:00Z",
    priority: "medium",
    dueDate: "2025-05-10",
  },
];

function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  const taskIndex = tasks.findIndex((task) => task.id === id);
  const task = tasks[taskIndex];

  switch (req.method) {
    case "GET":
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      return res.status(200).json(task);

    case "PUT":
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      const { title, description, status, assignedTo, priority, dueDate } =
        req.body;

      const updatedTask: Task = {
        ...task,
        title: title ?? task.title,
        description: description ?? task.description,
        status: status ?? task.status,
        assignedTo: assignedTo ?? task.assignedTo,
        priority: priority ?? task.priority,
        dueDate: dueDate ?? task.dueDate,
        updatedAt: new Date().toISOString(),
      };

      tasks[taskIndex] = updatedTask;
      //status broadcast
      return res.status(200).json(updatedTask);

    case "DELETE":
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      tasks = tasks.filter((t) => t.id !== id);
      return res.status(204).end();

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}

export default withAuth(handler);
