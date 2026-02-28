import { Box } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

const drawerWidth = 260;

export function AppLayout() {
    const { householdId } = useParams();

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar drawerWidth={drawerWidth} householdId={householdId!} />
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Header drawerWidth={drawerWidth} />
                <Box component="main" sx={{ flex: 1, p: 3, backgroundColor: "background.default" }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}