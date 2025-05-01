export type TaskStatus = "todo" | "in-progress" | "done";

export interface AssignedTo {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  assignedTo?: AssignedTo;
  createdAt: string;
  updatedAt: string;
  priority?: "low" | "medium" | "high";
  dueDate?: string;
}
