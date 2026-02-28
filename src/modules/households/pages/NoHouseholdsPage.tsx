import { Box, Button, Card, CardContent, Typography } from "@mui/material";

export function NoHouseholdsPage() {
    return (
        <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2 }}>
            <Card sx={{ width: 520, borderRadius: 3 }}>
                <CardContent>
                    <Typography variant="h5" fontWeight={800}>No tienes hogares aún</Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                        Crea tu primer hogar para empezar a gestionar tareas, avisos, inventario y lista de compra.
                    </Typography>
                    <Button variant="contained" sx={{ mt: 2 }}>
                        Crear hogar (próximo paso)
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}