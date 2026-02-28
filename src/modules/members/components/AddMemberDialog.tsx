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
import { useMemberMutations } from "../hooks/useMemberMutations";
import { HouseholdRole } from "../types/members.types";

const schema = z.object({
    email: z.string().email("Email inválido"),
    role: z.nativeEnum(HouseholdRole),
});

type FormValues = z.infer<typeof schema>;

export function AddMemberDialog({
    open,
    onClose,
    householdId,
}: {
    open: boolean;
    onClose: () => void;
    householdId: string;
}) {
    const { addMember } = useMemberMutations(householdId);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { role: HouseholdRole.Member },
    });

    const submit = handleSubmit(async (v) => {
        await addMember.mutateAsync({ email: v.email, role: v.role });
        reset();
        onClose();
    });

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Añadir miembro</DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                    <TextField
                        label="Email"
                        size="small"
                        fullWidth
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        select
                        label="Rol"
                        size="small"
                        defaultValue={HouseholdRole.Member}
                        {...register("role")}
                    >
                        <MenuItem value={HouseholdRole.Owner}>Owner</MenuItem>
                        <MenuItem value={HouseholdRole.Admin}>Admin</MenuItem>
                        <MenuItem value={HouseholdRole.Member}>Member</MenuItem>
                    </TextField>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={submit} disabled={addMember.isPending}>
                    Añadir
                </Button>
            </DialogActions>
        </Dialog>
    );
}