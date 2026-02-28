import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CampaignIcon from "@mui/icons-material/Campaign";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../../../modules/auth/store/authStore";

const BOTTOM_NAV_HEIGHT = 64;

export function BottomNav() {
  const { householdId } = useParams();
  const nav = useNavigate();
  const { pathname } = useLocation();
  const logout = useAuthStore((s) => s.logout);

  const isCompact = useMediaQuery("(max-width:420px)");
  const base = householdId ? `/app/${householdId}` : "/app";

  const value =
    pathname.includes("/tasks") ? "tasks" :
    pathname.includes("/notices") ? "notices" :
    pathname.includes("/inventory") ? "inventory" :
    pathname.includes("/shopping") ? "shopping" :
    pathname.includes("/dashboard") ? "dashboard" :
    "dashboard";

  const [moreAnchor, setMoreAnchor] = useState<null | HTMLElement>(null);

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
        onChange={(_, v) => {
          if (v === "more") return;
          nav(`${base}/${v}`);
        }}
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

        <BottomNavigationAction
          label="Más"
          value="more"
          icon={<MoreHorizIcon />}
          onClick={(e) => setMoreAnchor(e.currentTarget)}
        />
      </BottomNavigation>

      <Menu
        anchorEl={moreAnchor}
        open={!!moreAnchor}
        onClose={() => setMoreAnchor(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        PaperProps={{ sx: { borderRadius: 3, minWidth: 230 } }}
      >
        <MenuItem
          onClick={() => {
            setMoreAnchor(null);
            nav("/app/households");
          }}
        >
          <ListItemIcon>
            <HomeWorkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Casas" secondary="Gestiona hogares" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            setMoreAnchor(null);
            if (householdId) nav(`/app/${householdId}/members`);
            else nav("/app");
          }}
        >
          <ListItemIcon>
            <GroupIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Miembros" secondary="Roles y acceso" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            setMoreAnchor(null);
            logout();
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </MenuItem>
      </Menu>
    </Paper>
  );
}