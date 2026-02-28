const ACCESS_TOKEN_KEY = "homehub.accessToken"; // opcional persistir
const REFRESH_TOKEN_KEY = "homehub.refreshToken";

let accessTokenMemory: string | null = null;

export const tokenService = {
  getAccessToken(): string | null {
    return accessTokenMemory;
  },
  setAccessToken(token: string | null) {
    accessTokenMemory = token;
    // Si quieres persistir access token (menos seguro):
    // token ? localStorage.setItem(ACCESS_TOKEN_KEY, token) : localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  setRefreshToken(token: string | null) {
    if (token) localStorage.setItem(REFRESH_TOKEN_KEY, token);
    else localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  clear() {
    accessTokenMemory = null;
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};