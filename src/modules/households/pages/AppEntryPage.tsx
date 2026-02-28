import { Box, CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useMyHouseholds } from "../hooks/useMyHouseholds";
import { useHouseholdStore } from "../store/householdStore";

export function AppEntryPage() {
    const { data, isLoading } = useMyHouseholds();
    const activeHouseholdId = useHouseholdStore((s) => s.activeHouseholdId);
    const setActive = useHouseholdStore((s) => s.setActiveHouseholdId);

    if (isLoading) {
        return (
            <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    const households = data ?? [];
    if (households.length === 0) {
        // Fase futura: pantalla “Crear tu primer hogar”
        return <Navigate to="/app/no-households" replace />;
    }

    const exists = activeHouseholdId && households.some((h) => h.id === activeHouseholdId);
    const targetId = exists ? activeHouseholdId! : households[0].id;

    if (!exists) setActive(targetId);

    return <Navigate to={`/app/${targetId}/dashboard`} replace />;
}