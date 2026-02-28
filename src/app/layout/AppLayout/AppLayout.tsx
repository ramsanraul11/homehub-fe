import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

const drawerWidth = 260;

export function AppLayout() {
    const { householdId } = useParams();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    if (!householdId) return null;

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", width: "100%" }}>
            {!isMobile && <Sidebar drawerWidth={drawerWidth} householdId={householdId} />}

            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
                <Header drawerWidth={drawerWidth} />

                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        minWidth: 0,
                        px: { xs: 2, md: 3 },
                        py: { xs: 2, md: 3 },
                        pb: { xs: `calc(64px + env(safe-area-inset-bottom) + 16px)`, md: 3 },
                        overflowX: "hidden",
                    }}
                >
                    <Outlet />
                </Box>
            </Box>

            {isMobile && <BottomNav />}
        </Box>
    );
}