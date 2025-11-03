export type TaskStatus = "pending" | "in-progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo: string; // user id
  assignedToName: string; // user name for display
  createdBy: string; // user id
  createdAt: Date;
  dueDate: Date;
  progress: number; // 0-100
}
