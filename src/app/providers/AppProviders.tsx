import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { AppSnackbar } from "../../shared/ui/AppSnackbar";
import { theme } from "../theme/theme";
import { AuthBootstrap } from "./AuthBootstrap";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthBootstrap>
          {children}
          <AppSnackbar />
        </AuthBootstrap>
      </ThemeProvider>
    </QueryClientProvider>
  );
}