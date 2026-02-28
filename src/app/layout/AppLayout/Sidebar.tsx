import CampaignIcon from "@mui/icons-material/Campaign";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

type Props = { drawerWidth: number; householdId: string };

export function Sidebar({ drawerWidth, householdId }: Props) {
    const items = [
        { to: `/app/${householdId}/dashboard`, text: "Dashboard", icon: <DashboardIcon /> },
        { to: `/app/${householdId}/tasks`, text: "Tareas", icon: <TaskAltIcon /> },
        { to: `/app/${householdId}/notices`, text: "Avisos", icon: <CampaignIcon /> },
        { to: `/app/${householdId}/inventory`, text: "Inventario", icon: <Inventory2Icon /> },
        { to: `/app/${householdId}/shopping`, text: "Lista de compra", icon: <ShoppingCartIcon /> },
        { to: `/app/${householdId}/members`, text: "Miembros", icon: <GroupIcon /> },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
            }}
        >
            <Toolbar>
                <Box>
                    <Typography fontWeight={800}>HomeHub</Typography>
                    <Typography variant="caption" color="text.secondary">
                        Gestión del hogar
                    </Typography>
                </Box>
            </Toolbar>

            <List sx={{ px: 1 }}>
                {items.map((i) => (
                    <ListItemButton
                        key={i.to}
                        component={NavLink}
                        to={i.to}
                        sx={{
                            borderRadius: 2,
                            mb: 0.5,
                            "&.active": { backgroundColor: "action.selected" },
                        }}
                    >
                        <ListItemIcon>{i.icon}</ListItemIcon>
                        <ListItemText primary={i.text} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
}