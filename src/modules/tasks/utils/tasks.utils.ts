import dayjs from "dayjs";
import { type TaskDto, TaskStatus } from "../types/tasks.types";

export function isOverdue(task: TaskDto): boolean {
    if (!task.dueAtUtc) return false;
    if (task.status === TaskStatus.Completed) return false;
    return dayjs(task.dueAtUtc).isBefore(dayjs());
}