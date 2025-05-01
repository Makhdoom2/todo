import type { Task } from "@/types/task";
import { getTasks, saveTasks } from "@/utils/tasks";
import { AuthenticatedUser, withAuth } from "@/utils/withAuth";
import { NextRequest, NextResponse } from "next/server";

//get task by id
export const GET = withAuth(
  async (req: NextRequest, user: AuthenticatedUser) => {
    const id = req.nextUrl.pathname.split("/").pop()!;
    if (!id) {
      return NextResponse.json({ message: "Invalid task ID" }, { status: 400 });
    }

    const tasks = getTasks();
    const task = tasks.find((t: Task) => t.id === id);

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    // if the user is an admin, send the task
    if (user.role === "Admin") {
      return NextResponse.json(task);
    }

    // else check the userid does with task.assign id
    if (task.assignedTo?.id !== user.id) {
      return NextResponse.json(
        { message: "Unauthorized: You do not have access to this task" },
        { status: 403 }
      );
    }

    return NextResponse.json(task);
  }
);

//updatetask by id
export const PUT = withAuth(async (req: NextRequest) => {
  const id = req.nextUrl.pathname.split("/").pop()!;

  if (!id) {
    return NextResponse.json({ message: "Invalid task ID" }, { status: 400 });
  }

  const tasks = getTasks();
  const taskIndex = tasks.findIndex((t: Task) => t.id === id);
  const task = tasks[taskIndex];

  if (!task) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  const body = await req.json();

  const updatedTask = {
    ...task,
    title: body.title ?? task.title,
    description: body.description ?? task.description,
    status: body.status ?? task.status,
    assignedTo: body.assignedTo ?? task.assignedTo,
    priority: body.priority ?? task.priority,
    dueDate: body.dueDate ?? task.dueDate,
    updatedAt: new Date().toISOString(),
  };

  tasks[taskIndex] = updatedTask;
  saveTasks(tasks);
  return NextResponse.json(updatedTask);
});

//delete task by id
export const DELETE = withAuth(async (req: NextRequest) => {
  const id = req.nextUrl.pathname.split("/").pop()!;

  // console.log("TESTING:", id);
  // let id = body.id;
  if (!id) {
    return NextResponse.json({ message: "Invalid task ID" }, { status: 400 });
  }
  const tasks = getTasks();
  const taskIndex = tasks.findIndex((t: Task) => t.id === id);

  if (taskIndex === -1) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  tasks.splice(taskIndex, 1);
  saveTasks(tasks);
  return new NextResponse(null, { status: 204 });
});
