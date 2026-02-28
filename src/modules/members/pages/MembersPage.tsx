import AddIcon from "@mui/icons-material/Add";
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { AddMemberDialog } from "../components/AddMemberDialog";
import { MemberCard } from "../components/MemberCard";
import { useMembers } from "../hooks/useMembers";
import { HouseholdRole } from "../types/members.types";

export function MembersPage() {
    const { householdId } = useParams();
    if (!householdId) return null;

    const [open, setOpen] = useState(false);
    const { data, isLoading, isError } = useMembers(householdId);
    const members = data ?? [];

    const kpis = useMemo(() => {
        const owners = members.filter((m) => m.role === HouseholdRole.Owner).length;
        const admins = members.filter((m) => m.role === HouseholdRole.Admin).length;
        const regular = members.filter((m) => m.role === HouseholdRole.Member).length;
        return { total: members.length, owners, admins, regular };
    }, [members]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "stretch", sm: "flex-start" },
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >
                <Box>
                    <Typography variant="h4" fontWeight={800}>Miembros</Typography>
                    <Typography color="text.secondary">
                        Gestiona los miembros del hogar y sus roles.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpen(true)}
                    sx={{ alignSelf: { xs: "stretch", sm: "auto" }, borderRadius: 3, py: 1.2 }}
                >
                    Añadir miembro
                </Button>
            </Box>

            {/* KPIs */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
                    gap: 2,
                }}
            >
                <KpiCard title="Total" value={kpis.total} />
                <KpiCard title="Owners" value={kpis.owners} />
                <KpiCard title="Admins" value={kpis.admins} />
                <KpiCard title="Members" value={kpis.regular} />
            </Box>

            {/* List */}
            <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                    {isLoading && (
                        <Box sx={{ py: 6, display: "grid", placeItems: "center" }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {isError && (
                        <Box sx={{ py: 6 }}>
                            <Typography color="error" fontWeight={700}>
                                Error cargando miembros
                            </Typography>
                        </Box>
                    )}

                    {!isLoading && !isError && members.length === 0 && (
                        <Box sx={{ py: 6 }}>
                            <Typography fontWeight={800}>No hay miembros</Typography>
                            <Typography color="text.secondary">
                                Añade el primer miembro para colaborar en el hogar.
                            </Typography>
                        </Box>
                    )}

                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
                        {members.map((m) => (
                            <MemberCard key={m.memberId} member={m} householdId={householdId} />
                        ))}
                    </Box>
                </CardContent>
            </Card>

            <AddMemberDialog open={open} onClose={() => setOpen(false)} householdId={householdId} />
        </Box>
    );
}

function KpiCard({ title, value }: { title: string; value: number }) {
    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography color="text.secondary" variant="body2">
                    {title}
                </Typography>
                <Typography variant="h4" fontWeight={900}>
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
}