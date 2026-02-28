import { AppBar, Toolbar, Box, IconButton, Avatar, useMediaQuery, useTheme, TextField } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import { useAuthStore } from "../../../modules/auth/store/authStore";
import { HouseholdSwitcher } from "./HouseholdSwitcher";

type Props = { drawerWidth: number };

export function Header({ drawerWidth }: Props) {
    const logout = useAuthStore((s) => s.logout);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const effectiveMl = isMobile ? 0 : drawerWidth;
    const effectiveWidth = isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`;

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
                top: 0
            }}
        >
            <Toolbar sx={{
                gap: 1.5,
                minHeight: { xs: 56, md: 64 },
                pt: { xs: "env(safe-area-inset-top)", md: 0 },
            }}>
                <HouseholdSwitcher />

                <Box sx={{ flex: 1 }} />

                {isMobile ? (
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                ) : (
                    <TextField size="small" placeholder="Buscar..." sx={{ width: 320 }} />
                )}

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