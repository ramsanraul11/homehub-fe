import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { AppBar, Avatar, Box, IconButton, TextField, Toolbar, Typography } from "@mui/material";
import { useAuthStore } from "../../../modules/auth/store/authStore";

type Props = { drawerWidth: number };

export function Header({ drawerWidth }: Props) {
    const logout = useAuthStore((s) => s.logout);

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                ml: `${drawerWidth}px`,
                width: `calc(100% - ${drawerWidth}px)`,
                borderBottom: 1,
                borderColor: "divider",
                backgroundColor: "background.paper",
                color: "text.primary",
            }}
        >
            <Toolbar sx={{ gap: 2 }}>
                {/* Aquí irá el HouseholdSwitcher real (cuando implementemos /households) */}
                <Box>
                    <Typography fontWeight={700}>Casa Principal</Typography>
                    <Typography variant="caption" color="text.secondary">4 miembros</Typography>
                </Box>

                <Box sx={{ flex: 1 }} />

                <TextField size="small" placeholder="Buscar..." sx={{ width: 320 }} />

                <IconButton>
                    <NotificationsNoneIcon />
                </IconButton>

                <IconButton onClick={() => logout()}>
                    <Avatar sx={{ width: 32, height: 32 }}>R</Avatar>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}