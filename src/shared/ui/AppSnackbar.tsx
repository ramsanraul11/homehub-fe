import { Alert, Snackbar } from "@mui/material";
import { useSnackbarStore } from "./snackbarStore";

export function AppSnackbar() {
    const { open, message, severity, close } = useSnackbarStore();

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={close} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
            <Alert onClose={close} severity={severity} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
}