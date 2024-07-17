import { Navigate } from "react-router-dom";

import { useAuth } from "@/app/providers/redux-provider";
import { LoginForm } from "@/features/user/login";

export const LoginPage = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return (
            <Navigate
                to="/replenishments"
                replace
            />
        );
    }

    return <LoginForm />;
};
