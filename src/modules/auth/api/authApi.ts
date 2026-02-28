import { httpClient } from "../../../infrastructure/http/httpClient";

export type LoginCommand = { email: string; password: string };
export type RegisterCommand = { email: string; password: string };

export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
};

export const authApi = {
    login: async (cmd: LoginCommand) => {
        const { data } = await httpClient.post<AuthResponse>("/auth/login", cmd);
        return data;
    },
    register: async (cmd: RegisterCommand) => {
        await httpClient.post("/auth/register", cmd);
    },
    logout: async (refreshToken: string) => {
        await httpClient.post("/auth/logout", { refreshToken });
    },
};