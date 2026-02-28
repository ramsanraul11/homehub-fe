import AddIcon from "@mui/icons-material/Add";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { CreateTaskDialog } from "../components/CreateTaskDialog";
import { TaskCard } from "../components/TaskCard";
import { TaskFiltersBar, type TaskFiltersValue } from "../components/TaskFiltersBar";
import { useTasks } from "../hooks/useTasks";
import { type TaskQuery, TaskStatus } from "../types/tasks.types";

type TabKey = "all" | "pending" | "inprogress" | "completed" | "overdue";

export function TasksPage() {
    const { householdId } = useParams();
    if (!householdId) return null;

    const [tab, setTab] = useState<TabKey>("all");
    const [filters, setFilters] = useState<TaskFiltersValue>({
        search: "",
        dueFrom: "",
        dueTo: "",
        overdueOnly: false,
    });
    const [openCreate, setOpenCreate] = useState(false); const query: TaskQuery = useMemo(() => {
        const base: TaskQuery = {};

        if (filters.dueFrom) base.dueFromUtc = new Date(filters.dueFrom).toISOString();
        if (filters.dueTo) base.dueToUtc = new Date(filters.dueTo).toISOString();
        if (filters.overdueOnly) base.overdue = true;

        // tabs siguen mandando status/overdue (pero overdueOnly manda)
        switch (tab) {
            case "pending":
                return { ...base, status: TaskStatus.Pending };
            case "inprogress":
                return { ...base, status: TaskStatus.InProgress };
            case "completed":
                // Si overdueOnly está activo, “completed + overdue” no tiene sentido.
                // Lo dejamos tal cual: backend decidirá, o puedes ignorar status si overdueOnly.
                return filters.overdueOnly ? base : { ...base, status: TaskStatus.Completed };
            case "overdue":
                return { ...base, overdue: true };
            default:
                return base;
        }
    }, [tab, filters]);

    const { data, isLoading, isError } = useTasks(householdId, query);
    const tasks = data ?? [];

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Header de página */}
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
                    <Typography variant="h4" fontWeight={800} sx={{ fontSize: { xs: 34, sm: 40 } }}>
                        Tareas
                    </Typography>
                    <Typography color="text.secondary">
                        Organiza tareas del hogar, asígnalas y marca completadas.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenCreate(true)}
                    sx={{
                        alignSelf: { xs: "stretch", sm: "auto" },
                        borderRadius: 3,
                        py: 1.2,
                    }}
                >
                    Nueva tarea
                </Button>
            </Box>
            <TaskFiltersBar
                value={filters}
                onChange={setFilters}
                onReset={() =>
                    setFilters({ search: "", dueFrom: "", dueTo: "", overdueOnly: false })
                }
            />
            {/* Tabs */}
            <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ pb: 0 }}>
                    <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto">
                        <Tab value="all" label="Todas" />
                        <Tab value="pending" label="Pendientes" />
                        <Tab value="inprogress" label="En progreso" />
                        <Tab value="completed" label="Completadas" />
                        <Tab
                            value="overdue"
                            label={
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    Vencidas <Chip size="small" label="!" />
                                </Box>
                            }
                        />
                    </Tabs>
                </CardContent>

                <Divider />

                <CardContent>
                    {isLoading && (
                        <Box sx={{ py: 6, display: "grid", placeItems: "center" }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {isError && (
                        <Box sx={{ py: 6 }}>
                            <Typography color="error" fontWeight={700}>
                                Error cargando tareas
                            </Typography>
                            <Typography color="text.secondary">
                                Revisa la consola/red y que el householdId sea válido.
                            </Typography>
                        </Box>
                    )}

                    {!isLoading && !isError && tasks.length === 0 && (
                        <Box sx={{ py: 6 }}>
                            <Typography fontWeight={800}>No hay tareas</Typography>
                            <Typography color="text.secondary">
                                Crea tu primera tarea para empezar a organizar el hogar.
                            </Typography>
                        </Box>
                    )}

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                        {tasks.map((t) => (
                            <TaskCard key={t.id} task={t} householdId={householdId} />
                        ))}
                    </Box>
                </CardContent>
            </Card>

            <CreateTaskDialog open={openCreate} onClose={() => setOpenCreate(false)} householdId={householdId} />
        </Box>
    );
}