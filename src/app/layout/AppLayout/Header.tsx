import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../modules/auth/store/authStore";
import { HouseholdSwitcher } from "./HouseholdSwitcher";

type Props = { drawerWidth: number };

export function Header({ drawerWidth }: Props) {
    const logout = useAuthStore((s) => s.logout);
    const nav = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const effectiveMl = isMobile ? 0 : drawerWidth;
    const effectiveWidth = isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`;

    const [anchor, setAnchor] = useState<null | HTMLElement>(null);

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                ml: `${effectiveMl}px`,
                width: effectiveWidth,
                borderBottom: 1,
                borderColor: "divider",
                backgroundColor: "background.paper",
                color: "text.primary",
                top: 0,
                zIndex: 1201,
            }}
        >
            <Toolbar
                sx={{
                    gap: 1.5,
                    minHeight: { xs: 56, md: 64 },
                    pt: { xs: "env(safe-area-inset-top)", md: 0 },
                }}
            >
                <HouseholdSwitcher />

                <Box sx={{ flex: 1 }} />

                <IconButton>
                    <NotificationsNoneIcon />
                </IconButton>

                <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
                    <Avatar sx={{ width: 32, height: 32 }}>R</Avatar>
                </IconButton>

                <Menu open={!!anchor} anchorEl={anchor} onClose={() => setAnchor(null)}>
                    <MenuItem
                        onClick={() => {
                            setAnchor(null);
                            nav("/app/households");
                        }}
                    >
                        <ListItemIcon>
                            <HomeWorkIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Casas" />
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            setAnchor(null);
                            logout();
                        }}
                    >
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Cerrar sesión" />
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}