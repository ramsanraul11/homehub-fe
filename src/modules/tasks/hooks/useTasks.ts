import { useQuery } from "@tanstack/react-query";
import { tasksApi } from "../api/tasksApi";
import type { TaskQuery } from "../types/tasks.types";
import { taskKeys } from "./taskKeys";

export function useTasks(householdId: string, query: TaskQuery) {
    return useQuery({
        queryKey: taskKeys.list(householdId, query),
        queryFn: () => tasksApi.list(householdId, query),
    });
}