import { zodResolver } from "@hookform/resolvers/zod";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTaskMutations } from "../hooks/useTaskMutations";
import { TaskPriority } from "../types/tasks.types";

const schema = z.object({
    title: z.string().min(1, "Título requerido"),
    description: z.string().optional(),
    priority: z.nativeEnum(TaskPriority),
    dueAtUtc: z.string().optional(), // lo convertimos a ISO si usas datetime-local
});

type FormValues = z.infer<typeof schema>;

export function CreateTaskDialog({
    open,
    onClose,
    householdId,
}: {
    open: boolean;
    onClose: () => void;
    householdId: string;
}) {
    const { createTask } = useTaskMutations(householdId);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { priority: TaskPriority.Medium },
    });

    const submit = handleSubmit(async (v) => {
        await createTask.mutateAsync({
            title: v.title,
            description: v.description ?? null,
            priority: v.priority,
            dueAtUtc: v.dueAtUtc ? new Date(v.dueAtUtc).toISOString() : null,
        });
        reset();
        onClose();
    });

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Nueva tarea</DialogTitle>

            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                    <TextField
                        label="Título"
                        {...register("title")}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />

                    <TextField
                        label="Descripción"
                        multiline
                        minRows={3}
                        {...register("description")}
                    />

                    <TextField select label="Prioridad" defaultValue={TaskPriority.Medium} {...register("priority")}>
                        <MenuItem value={TaskPriority.Low}>Baja</MenuItem>
                        <MenuItem value={TaskPriority.Medium}>Media</MenuItem>
                        <MenuItem value={TaskPriority.High}>Alta</MenuItem>
                    </TextField>

                    <TextField
                        label="Vence (opcional)"
                        type="datetime-local"
                        InputLabelProps={{ shrink: true }}
                        {...register("dueAtUtc")}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={submit} disabled={createTask.isPending}>
                    Crear
                </Button>
            </DialogActions>
        </Dialog>
    );
}