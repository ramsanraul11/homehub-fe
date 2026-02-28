import { create } from "zustand";

type Severity = "success" | "error" | "info" | "warning";

type SnackbarState = {
    open: boolean;
    message: string;
    severity: Severity;
    show: (message: string, severity?: Severity) => void;
    close: () => void;
};

export const useSnackbarStore = create<SnackbarState>((set) => ({
    open: false,
    message: "",
    severity: "info",
    show: (message, severity = "info") => set({ open: true, message, severity }),
    close: () => set({ open: false }),
}));