import CampaignIcon from "@mui/icons-material/Campaign";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { BottomNavigation, BottomNavigationAction, Paper, useMediaQuery } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const BOTTOM_NAV_HEIGHT = 64;

export function BottomNav() {
    const isCompact = useMediaQuery("(max-width:420px)");
    const { householdId } = useParams();
    const nav = useNavigate();
    const { pathname } = useLocation();

    const base = `/app/${householdId}`;

    // value basado en ruta
    const value =
        pathname.includes("/tasks") ? "tasks" :
            pathname.includes("/notices") ? "notices" :
                pathname.includes("/inventory") ? "inventory" :
                    pathname.includes("/shopping") ? "shopping" :
                        pathname.includes("/members") ? "members" :
                            "dashboard";

    return (
        <Paper
            elevation={12}
            sx={{
                position: "fixed",
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1300,
                height: `calc(${BOTTOM_NAV_HEIGHT}px + env(safe-area-inset-bottom))`,
                pb: "env(safe-area-inset-bottom)",
                display: "flex",
                alignItems: "stretch",
            }}
        >
            <BottomNavigation
                showLabels={!isCompact}
                value={value}
                onChange={(_, v) => nav(`${base}/${v}`)}
                sx={{
                    width: "100%",
                    height: BOTTOM_NAV_HEIGHT,
                    "& .MuiBottomNavigationAction-root": { minWidth: 0, px: 0.5 },
                    "& .MuiBottomNavigationAction-label": { fontSize: 11 },
                }}
            >
                <BottomNavigationAction label="Inicio" value="dashboard" icon={<DashboardIcon />} />
                <BottomNavigationAction label="Tareas" value="tasks" icon={<TaskAltIcon />} />
                <BottomNavigationAction label="Avisos" value="notices" icon={<CampaignIcon />} />
                <BottomNavigationAction label="Inventario" value="inventory" icon={<Inventory2Icon />} />
                <BottomNavigationAction label="Compra" value="shopping" icon={<ShoppingCartIcon />} />
                <BottomNavigationAction label="Miembros" value="members" icon={<GroupIcon />} />
            </BottomNavigation>
        </Paper>
    );
}