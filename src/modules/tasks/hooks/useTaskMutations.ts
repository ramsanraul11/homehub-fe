import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "../api/tasksApi";
import type { CreateTaskCommand } from "../types/tasks.types";
import { taskKeys } from "./taskKeys";
import { useSnackbarStore } from "../../../shared/ui/snackbarStore";

export function useTaskMutations(householdId: string) {
    const qc = useQueryClient();
    const show = useSnackbarStore.getState().show;

    const invalidate = async () => {
        await qc.invalidateQueries({ queryKey: taskKeys.all });
    };

    const createTask = useMutation({
        mutationFn: (cmd: CreateTaskCommand) => tasksApi.create(householdId, cmd),
        onSuccess: async () => { await invalidate(); show("Tarea creada", "success"); },
        onError: () => show("No se pudo crear la tarea", "error")
    });

    const assignTask = useMutation({
        mutationFn: (p: { taskId: string; email: string }) =>
            tasksApi.assign(householdId, p.taskId, p.email),
        onSuccess: async () => { await invalidate(); show("Tarea asignada", "success"); },
        onError: () => show("No se pudo asignar la tarea", "error")
    });

    const completeTask = useMutation({
        mutationFn: (taskId: string) => tasksApi.complete(householdId, taskId),
        onSuccess: async () => { await invalidate(); show("Tarea completada", "success"); },
        onError: () => show("No se pudo completar la tarea", "error")
    });

    return { createTask, assignTask, completeTask };
}