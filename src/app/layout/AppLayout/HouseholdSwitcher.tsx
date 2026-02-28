import { Box, MenuItem, Select, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useHouseholds } from "../../../modules/households/hooks/useHouseholds";
import { useHouseholdStore } from "../../../modules/households/store/householdStore";

export function HouseholdSwitcher() {
    const { data } = useHouseholds();
    const households = data ?? [];
    const { householdId } = useParams();
    const activeHouseholdId = useHouseholdStore((s) => s.activeHouseholdId);
    const setActive = useHouseholdStore((s) => s.setActiveHouseholdId);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const currentId = householdId ?? activeHouseholdId ?? (households[0]?.id ?? "");
    const current = useMemo(
        () => households.find((h) => h.id === currentId),
        [households, currentId]
    );

    if (!current) {
        return (
            <Box>
                <Typography fontWeight={700}>Hogar</Typography>
                <Typography variant="caption" color="text.secondary">Cargando…</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Select
                size="small"
                value={currentId}
                onChange={(e) => {
                    const nextId = e.target.value as string;
                    setActive(nextId);
                    navigate(`/app/${nextId}/dashboard`);
                }}
                sx={{
                    fontWeight: 700,
                    "& .MuiSelect-select": { py: 0.6, px: 1.2 },
                    borderRadius: 2,
                    minWidth: { xs: 180, sm: 220 },
                }}
            >
                {households.map((h) => (
                    <MenuItem key={h.id} value={h.id}>
                        {h.name}
                    </MenuItem>
                ))}
            </Select>

            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                {isMobile ? " " : current.currencyCode ? `Moneda: ${current.currencyCode}` : " "}
            </Typography>
        </Box>
    );
}