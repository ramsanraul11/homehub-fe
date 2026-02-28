import { Box, CircularProgress } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../modules/auth/store/authStore";

export function AuthGuard() {
    const { isAuthenticated, isBootstrapping } = useAuthStore();
    const location = useLocation();

    if (isBootstrapping) {
        return (
            <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}