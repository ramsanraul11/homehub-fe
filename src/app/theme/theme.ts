import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "light",
    },
    shape: { borderRadius: 12 },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: { width: "100%", overflowX: "hidden" },
                body: { width: "100%", overflowX: "hidden" },
                "#root": { width: "100%", overflowX: "hidden" },
            },
        },
    },
});