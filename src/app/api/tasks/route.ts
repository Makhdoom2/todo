import { NextRequest, NextResponse } from "next/server";
import { Task } from "@/types/task";
import { AuthenticatedUser, withAuth } from "@/utils/withAuth";
import { getTasks, saveTasks } from "@/utils/tasks";

export const GET = withAuth(
  async (req: NextRequest, user: AuthenticatedUser) => {
    // console.log("TESTING ENDPOINT 2", user);
    const tasks = getTasks();

    if (user?.role === "Admin") {
      // id admin gets all tasks
      return NextResponse.json(tasks, { status: 200 });
    }

    // else filter tasks assigned to that user
    const userTasks = tasks.filter(
      (task: Task) => task?.assignedTo?.id === user?.id
    );
    return NextResponse.json(userTasks, { status: 200 });
  }
);

//create new task
export const POST = withAuth(
  async (req: NextRequest, user: AuthenticatedUser) => {
    const body: Task = await req.json();

    const { title, description, status, assignedTo, dueDate, priority } = body;

    const tasks = getTasks();
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

    // updated tasks list to the JSON file
    saveTasks(tasks);
    return NextResponse.json(newTask, { status: 201 });
  }
);
