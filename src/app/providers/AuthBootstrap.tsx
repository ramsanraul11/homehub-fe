import { type PropsWithChildren, useEffect } from "react";
import { useAuthStore } from "../../modules/auth/store/authStore";

export function AuthBootstrap({ children }: PropsWithChildren) {
    const bootstrap = useAuthStore((s) => s.bootstrap);

    useEffect(() => {
        bootstrap();
    }, [bootstrap]);

    return <>{children}</>;
}