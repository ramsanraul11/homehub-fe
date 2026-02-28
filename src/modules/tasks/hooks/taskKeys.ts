import type { TaskQuery } from "../types/tasks.types";

export const taskKeys = {
    all: ["tasks"] as const,
    list: (householdId: string, query: TaskQuery) =>
        ["tasks", householdId, "list", query] as const,
};