import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useHouseholdMutations } from "../hooks/useHouseholdMutations";

const schema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  currencyCode: z.string().min(3).max(3).optional(),
});

type FormValues = z.infer<typeof schema>;

export function CreateHouseholdDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { createHousehold } = useHouseholdMutations();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { currencyCode: "EUR" },
  });

  const submit = handleSubmit(async (v) => {
    await createHousehold.mutateAsync({
      name: v.name,
      currencyCode: (v.currencyCode ?? "EUR").toUpperCase(),
    });
    reset();
    onClose();
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Nueva casa</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Nombre"
            size="small"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Moneda (ISO)"
            size="small"
            {...register("currencyCode")}
            error={!!errors.currencyCode}
            helperText={errors.currencyCode?.message ?? "Ej: EUR"}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={submit} disabled={createHousehold.isPending}>
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
}