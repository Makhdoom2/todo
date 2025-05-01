import { Task } from "@/types/task";
import { NextApiResponse } from "next";
import { tasks } from "./[id]";
import withAuth, { AuthenticatedNextApiRequest } from "@/utils/withAuth";

function handler(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
  const user = req?.user;

  // console.log("TESTING ENDPOINT 2", req);
  if (req.method === "GET") {
    if (user?.role === "Admin") {
      // if admin send all tasks
      return res.status(200).json(tasks);
    }
    ///else specific tasks of taht user.
    const userTasks = tasks.filter((task) => task?.assignedTo?.id === user?.id);
    return res.status(200).json(userTasks);
  }

  if (req.method === "POST") {
    const { title, description, status, assignedTo, dueDate, priority }: Task =
      req.body;
    const newTask: Task = {
      id: (tasks.length + 1).toString(),
      title,
      description,
      status,
      assignedTo,
      priority,
      dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    return res.status(201).json(newTask);
  }

  res.status(405).json({ message: "Method Not Allowed" });
}

export default withAuth(handler);
