import { create } from "zustand";
import { tokenService } from "../../../infrastructure/auth/tokenService";
import { authApi } from "../api/authApi";

type AuthState = {
    isAuthenticated: boolean;
    isBootstrapping: boolean;
    login: (email: string, password: string) => Promise<void>;
    bootstrap: () => Promise<void>;
    logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    isBootstrapping: true,

    async login(email, password) {
        const data = await authApi.login({ email, password });
        tokenService.setAccessToken(data.accessToken);
        tokenService.setRefreshToken(data.refreshToken);
        set({ isAuthenticated: true });
    },

    async bootstrap() {
        // Intento silencioso: si hay refreshToken, el primer 401 disparará refresh.
        // Si quieres “forzar refresh al arrancar”, puedes llamar directamente /auth/refresh aquí.
        const hasRefresh = !!tokenService.getRefreshToken();
        set({ isAuthenticated: hasRefresh, isBootstrapping: false });
    },

    async logout() {
        const rt = tokenService.getRefreshToken();
        try {
            if (rt) await authApi.logout(rt);
        } finally {
            tokenService.clear();
            set({ isAuthenticated: false });
        }
    },
}));