import AddIcon from "@mui/icons-material/Add";
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { CreateHouseholdDialog } from "../components/CreateHouseholdDialog";
import { HouseholdCard } from "../components/HouseholdCard";
import { useHouseholds } from "../hooks/useHouseholds";

export function HouseholdsManagePage() {
    const { data, isLoading, isError } = useHouseholds();
    const households = data ?? [];
    const [openCreate, setOpenCreate] = useState(false);

    const kpis = useMemo(() => {
        const total = households.length;
        const currencies = new Set(households.map((h) => h.currencyCode ?? "—"));
        const primaryCurrency = households[0]?.currencyCode ?? "—";
        return {
            total,
            currencies: currencies.size,
            primaryCurrency,
            hint: total === 0 ? "Crea tu primera casa" : "Selecciona una casa para abrirla",
        };
    }, [households]);

    return (
        <Box
            sx={{
                maxWidth: 1100,
                mx: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "stretch", sm: "center" },
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >
                <Box>
                    <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: -0.5 }}>
                        Casas
                    </Typography>
                    <Typography color="text.secondary">
                        Crea y gestiona tus hogares.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenCreate(true)}
                    sx={{
                        borderRadius: 3,
                        py: 1.2,
                        px: 2.2,
                        alignSelf: { xs: "stretch", sm: "auto" },
                    }}
                >
                    Nueva casa
                </Button>
            </Box>

            {/* KPI row (compact) */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
                    gap: 2,
                }}
            >
                <Kpi title="Total" value={kpis.total} />
                <Kpi title="Moneda principal" value={kpis.primaryCurrency} />
                <Kpi title="Monedas" value={kpis.currencies} />
                <Kpi title="Estado" value={kpis.hint} />
            </Box>

            {/* List container */}
            <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
                    {isLoading && (
                        <Box sx={{ py: 6, display: "grid", placeItems: "center" }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {isError && (
                        <Box sx={{ py: 6 }}>
                            <Typography color="error" fontWeight={800}>
                                Error cargando casas
                            </Typography>
                            <Typography color="text.secondary">
                                Revisa la conexión con la API.
                            </Typography>
                        </Box>
                    )}

                    {!isLoading && !isError && households.length === 0 && (
                        <EmptyState onCreate={() => setOpenCreate(true)} />
                    )}

                    {!isLoading && !isError && households.length > 0 && (
                        <>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                                <Typography fontWeight={800}>Tus casas</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {households.length} hogar(es)
                                </Typography>
                            </Box>

                            <Divider sx={{ mb: 2 }} />

                            {/* auto-fit => sin huecos raros */}
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                                    gap: 2,
                                }}
                            >
                                {households.map((h) => (
                                    <HouseholdCard key={h.id} household={h} />
                                ))}
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>

            <CreateHouseholdDialog open={openCreate} onClose={() => setOpenCreate(false)} />
        </Box>
    );
}

function Kpi({ title, value }: { title: string; value: string | number }) {
    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 2 }}>
                <Typography variant="caption" color="text.secondary">
                    {title}
                </Typography>
                <Typography fontWeight={900} sx={{ mt: 0.5, lineHeight: 1.1 }}>
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
    return (
        <Box sx={{ py: 7, textAlign: "center" }}>
            <Typography variant="h6" fontWeight={900}>
                No tienes casas todavía
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
                Crea tu primera casa para empezar a gestionar tareas, avisos e inventario.
            </Typography>

            <Button
                variant="contained"
                sx={{ mt: 3, borderRadius: 3, px: 3, py: 1.2 }}
                startIcon={<AddIcon />}
                onClick={onCreate}
            >
                Crear casa
            </Button>
        </Box>
    );
}