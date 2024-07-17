import { useMemo } from "react";
import { useStateSelector } from "./use-state-selector";

export const useAuth = () => {
    const token = useStateSelector(state => state.auth.token);
    const isAuthenticated = useStateSelector(
        state => state.auth.isAuthenticated
    );

    return useMemo(
        () => ({
            token,
            isAuthenticated
        }),
        [token, isAuthenticated]
    );
};
