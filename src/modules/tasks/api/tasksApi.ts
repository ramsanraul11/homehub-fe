import { httpClient } from "../../../infrastructure/http/httpClient";
import type { CreateTaskCommand, TaskDto, TaskQuery } from "../types/tasks.types";

export const tasksApi = {
    list: async (householdId: string, query: TaskQuery) => {
        const { data } = await httpClient.get<TaskDto[]>(
            `/households/${householdId}/tasks`,
            { params: query }
        );
        return data;
    },

    create: async (householdId: string, cmd: CreateTaskCommand) => {
        const { data } = await httpClient.post<TaskDto>(
            `/households/${householdId}/tasks`,
            cmd
        );
        return data;
    },

    assign: async (householdId: string, taskId: string, email: string) => {
        await httpClient.post(
            `/households/${householdId}/tasks/${taskId}/assign`,
            { email }
        );
    },

    complete: async (householdId: string, taskId: string) => {
        await httpClient.post(
            `/households/${householdId}/tasks/${taskId}/complete`
        );
    },
};