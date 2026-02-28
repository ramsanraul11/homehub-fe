import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    Box,
    Card,
    CardContent,
    Checkbox,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { useTaskMutations } from "../hooks/useTaskMutations";
import { type TaskDto, TaskPriority, TaskStatus } from "../types/tasks.types";
import { AssignTaskDialog } from "./AssignTaskDialog";
import { isOverdue } from "../utils/tasks.utils";

function priorityLabel(p: TaskPriority) {
    if (p === TaskPriority.High) return "Alta";
    if (p === TaskPriority.Medium) return "Media";
    return "Baja";
}

function statusChip(s: TaskStatus) {
    switch (s) {
        case TaskStatus.Pending:
            return <Chip size="small" label="Pendiente" />;
        case TaskStatus.InProgress:
            return <Chip size="small" label="En progreso" />;
        case TaskStatus.Completed:
            return <Chip size="small" label="Completada" />;
        default:
            return <Chip size="small" label={`Estado ${s}`} />;
    }
}

export function TaskCard({
    task,
    householdId,
}: {
    task: TaskDto;
    householdId: string;
}) {
    const { completeTask } = useTaskMutations(householdId);
    const overdue = isOverdue(task);
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const [openAssign, setOpenAssign] = useState(false);

    const dueText = task.dueAtUtc
        ? dayjs(task.dueAtUtc).format("DD/MM/YYYY HH:mm")
        : null;

    const isCompleted = task.status === TaskStatus.Completed;
    { overdue && <Chip size="small" label="Vencida" /> }
    return (
        <>
            <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                    <Checkbox
                        checked={isCompleted}
                        onChange={() => completeTask.mutate(task.id)}
                        disabled={isCompleted || completeTask.isPending}
                    />

                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                            <Typography fontWeight={700}>
                                {task.title}
                            </Typography>

                            {statusChip(task.status)}
                            <Chip size="small" label={`Prioridad: ${priorityLabel(task.priority)}`} />

                            {dueText && (
                                <Chip size="small" label={`Vence: ${dueText}`} />
                            )}
                        </Box>

                        {task.description && (
                            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                                {task.description}
                            </Typography>
                        )}
                    </Box>

                    <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
                        <MoreVertIcon />
                    </IconButton>

                    <Menu
                        anchorEl={menuAnchor}
                        open={!!menuAnchor}
                        onClose={() => setMenuAnchor(null)}
                    >
                        <MenuItem
                            onClick={() => {
                                setMenuAnchor(null);
                                setOpenAssign(true);
                            }}
                        >
                            Asignar por email
                        </MenuItem>

                        {!isCompleted && (
                            <MenuItem
                                onClick={() => {
                                    setMenuAnchor(null);
                                    completeTask.mutate(task.id);
                                }}
                            >
                                Marcar completada
                            </MenuItem>
                        )}
                    </Menu>
                </CardContent>
            </Card>

            <AssignTaskDialog
                open={openAssign}
                onClose={() => setOpenAssign(false)}
                householdId={householdId}
                taskId={task.id}
            />
        </>
    );
}