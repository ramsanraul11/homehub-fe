import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTaskMutations } from "../hooks/useTaskMutations";

//TODO: Refactor
const schema = z.object({
    email: z.string().email("Email inválido"),
});

type FormValues = z.infer<typeof schema>;

export function AssignTaskDialog({
    open,
    onClose,
    householdId,
    taskId,
}: {
    open: boolean;
    onClose: () => void;
    householdId: string;
    taskId: string;
}) {
    const { assignTask } = useTaskMutations(householdId);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    const submit = handleSubmit(async (v) => {
        await assignTask.mutateAsync({ taskId, email: v.email });
        reset();
        onClose();
    });

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Asignar tarea</DialogTitle>

            <DialogContent>
                <Box sx={{ mt: 1 }}>
                    <TextField
                        label="Email del miembro"
                        fullWidth
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={submit} disabled={assignTask.isPending}>
                    Asignar
                </Button>
            </DialogActions>
        </Dialog>
    );
}