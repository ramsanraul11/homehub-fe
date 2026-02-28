import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { env } from "../../app/config/env";
import { createRefreshCoordinator } from "../auth/refreshCoordinator";
import { tokenService } from "../auth/tokenService";

type AuthResponse = {
    accessToken: string;
    refreshToken: string;
};

const raw = axios.create({
    baseURL: env.apiBaseUrl,
    headers: { "Content-Type": "application/json" },
});

export const httpClient = axios.create({
    baseURL: env.apiBaseUrl,
    headers: { "Content-Type": "application/json" },
});

httpClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = tokenService.getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const refresh = createRefreshCoordinator<AuthResponse>(async () => {
    const refreshToken = tokenService.getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token");

    const { data } = await raw.post<AuthResponse>("/auth/refresh", { refreshToken });

    tokenService.setAccessToken(data.accessToken);
    tokenService.setRefreshToken(data.refreshToken);
    return data;
});

httpClient.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        const original = error.config as any;
        const status = error.response?.status;

        // Evita loop infinito
        if (status === 401 && !original?._retry) {
            original._retry = true;
            try {
                await refresh();
                const token = tokenService.getAccessToken();
                if (token) original.headers.Authorization = `Bearer ${token}`;
                return httpClient(original);
            } catch {
                tokenService.clear();
                // Aquí NO redirigimos desde infraestructura: lo gestiona el AuthStore/Guard
            }
        }
        return Promise.reject(error);
    }
);