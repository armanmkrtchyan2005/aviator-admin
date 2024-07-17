import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/app/providers/redux-provider";

interface PrivateRouteProps {
    to?: string;
    asChild?: boolean;
    children?: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
    to = "/login",
    asChild = false,
    children
}) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
        asChild ? (
            children
        ) : (
            <Outlet />
        )
    ) : (
        <Navigate
            to={to}
            replace={true}
        />
    );
};
