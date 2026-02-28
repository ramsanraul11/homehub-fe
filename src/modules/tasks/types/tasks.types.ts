// Enums según swagger (int)
export enum TaskPriority {
  Low = 1,
  Medium = 2,
  High = 3,
}

export enum TaskStatus {
  Pending = 1,
  InProgress = 2,
  Completed = 3,
  Cancelled = 4, // si lo usas así en backend; si no, renombra, pero el int 4 existe.
}

// DTO mínimo (ajústalo al JSON real si difiere)
export type TaskDto = {
  id: string;
  householdId: string;
  title: string;
  description?: string | null;
  priority: TaskPriority;  // 1..3
  status: TaskStatus;      // 1..4
  dueAtUtc?: string | null;
  createdAtUtc: string;
  completedAtUtc?: string | null;
};

export type CreateTaskCommand = {
  title: string;
  description?: string | null;
  priority: TaskPriority;
  dueAtUtc?: string | null;
};

export type AssignTaskCommand = { email: string };

export type TaskQuery = {
  status?: TaskStatus;
  assignedUserId?: string;
  dueFromUtc?: string;
  dueToUtc?: string;
  overdue?: boolean;
};