import { Box, Button, Card, CardContent, FormControlLabel, Switch, TextField } from "@mui/material";

export type TaskFiltersValue = {
    search: string;          // client-side
    dueFrom: string;         // datetime-local string
    dueTo: string;           // datetime-local string
    overdueOnly: boolean;    // server-side
};

export function TaskFiltersBar({
    value,
    onChange,
    onReset,
}: {
    value: TaskFiltersValue;
    onChange: (next: TaskFiltersValue) => void;
    onReset: () => void;
}) {
    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr 260px" },
                        gap: 2,
                        alignItems: "center",
                    }}
                >
                    <TextField
                        size="small"
                        label="Buscar"
                        placeholder="Título o descripción…"
                        value={value.search}
                        onChange={(e) => onChange({ ...value, search: e.target.value })}
                        fullWidth
                    />

                    <TextField
                        label="Desde"
                        size="small"
                        type="datetime-local"
                        InputLabelProps={{ shrink: true }}
                        value={value.dueFrom}
                        onChange={(e) => onChange({ ...value, dueFrom: e.target.value })}
                    />

                    <TextField
                        label="Hasta"
                        size="small"
                        type="datetime-local"
                        InputLabelProps={{ shrink: true }}
                        value={value.dueTo}
                        onChange={(e) => onChange({ ...value, dueTo: e.target.value })}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            flexWrap: "wrap",
                            justifyContent: { xs: "flex-start", md: "flex-end" },
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={value.overdueOnly}
                                    onChange={(e) => onChange({ ...value, overdueOnly: e.target.checked })}
                                />
                            }
                            label="Vencidas"
                        />

                        <Button variant="outlined" onClick={onReset}>
                            Limpiar
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}