import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "../../modules/auth/pages/LoginPage";
import { AppLayout } from "../layout/AppLayout/AppLayout";
import { AuthGuard } from "./guards";

import { DashboardPage } from "../../modules/dashboard/pages/DashboardPage";
import { InventoryPage } from "../../modules/inventory/pages/InventoryPage";
import { MembersPage } from "../../modules/members/pages/MembersPage";
import { NoticesPage } from "../../modules/notices/pages/NoticesPage";
import { ShoppingPage } from "../../modules/shopping/pages/ShoppingPage";
import { TasksPage } from "../../modules/tasks/pages/TasksPage";

export const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/app" replace /> },

    { path: "/login", element: <LoginPage /> },

    {
        element: <AuthGuard />,
        children: [
            // En /app luego haremos redirección al primer household (cuando consumamos /households)
            { path: "/app", element: <Navigate to="/app/placeholder/dashboard" replace /> },

            {
                path: "/app/:householdId",
                element: <AppLayout />,
                children: [
                    { path: "dashboard", element: <DashboardPage /> },
                    { path: "tasks", element: <TasksPage /> },
                    { path: "notices", element: <NoticesPage /> },
                    { path: "inventory", element: <InventoryPage /> },
                    { path: "shopping", element: <ShoppingPage /> },
                    { path: "members", element: <MembersPage /> },
                ],
            },
        ],
    },
]);