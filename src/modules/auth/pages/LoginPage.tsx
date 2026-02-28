import { Alert, Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export function LoginPage() {
    const login = useAuthStore((s) => s.login);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onSubmit = async () => {
        setError(null);
        try {
            await login(email, password);
            navigate("/app", { replace: true });
        } catch {
            setError("Credenciales inválidas o error de servidor.");
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2 }}>
            <Card sx={{ width: 420, borderRadius: 3 }}>
                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box>
                        <Typography variant="h5" fontWeight={800}>HomeHub</Typography>
                        <Typography variant="body2" color="text.secondary">Accede a tu hogar</Typography>
                    </Box>

                    {error && <Alert severity="error">{error}</Alert>}

                    <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <Button variant="contained" onClick={onSubmit} sx={{ py: 1.2 }}>
                        Entrar
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}