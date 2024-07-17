import { Suspense, lazy } from "react";
import {
    createBrowserRouter,
    RouterProvider as Provider,
    Navigate
} from "react-router-dom";

import { LoginPage } from "@/pages/login-page";
import { PrivateRoute } from "@/shared/ui/private-route";
import { DashboardLayout } from "@/pages/dashboard-layout";

import { PreviewReplenishmentDialog } from "@/features/replenishment/preview";

import { GridLoader } from "react-spinners";
import { ConfirmReplenishmentDialog } from "@/features/replenishment/confirm";
import { CancelReplenishmentDialog } from "@/features/replenishment/cancel";
import { ConfirmWithdrawalDialog } from "@/features/withdrawal/confirm";
import { CancelWithdrawalDialog } from "@/features/withdrawal/cancel";

import { ErrorPage } from "@/pages/error-page";

const ReplenishmentsPage = lazy(async () =>
    import("@/pages/replenishments-page").then(module => ({
        default: module.ReplenishmentsPage
    }))
);

const WithdrawPage = lazy(async () =>
    import("@/pages/withdrawal-page").then(module => ({
        default: module.WithdrawalPage
    }))
);

const BalancePage = lazy(async () =>
    import("@/pages/balance-page").then(module => ({
        default: module.BalancePage
    }))
);

const RequisitePage = lazy(async () =>
    import("@/pages/requisite-page").then(module => ({
        default: module.RequisitePage
    }))
);

const router = createBrowserRouter([
    {
        path: "login",
        element: <LoginPage />
    },
    {
        path: "/",
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to="/replenishment" />
            },
            {
                path: "replenishment",
                element: (
                    <Suspense
                        fallback={
                            <GridLoader
                                color="red"
                                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                            />
                        }
                    >
                        <PrivateRoute asChild>
                            <ReplenishmentsPage />
                        </PrivateRoute>
                    </Suspense>
                ),
                children: [
                    {
                        path: ":replenishmentId/confirm",
                        element: <ConfirmReplenishmentDialog />
                    },
                    {
                        path: ":replenishmentId/cancel",
                        element: <CancelReplenishmentDialog />
                    },
                    {
                        path: "preview/:replenishmentId/card",
                        element: <PreviewReplenishmentDialog />
                    },
                    {
                        path: "preview/:replenishmentId/receipt",
                        element: <PreviewReplenishmentDialog />
                    }
                ]
            },
            {
                path: "withdrawal",
                element: (
                    <Suspense
                        fallback={
                            <GridLoader
                                color="red"
                                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                            />
                        }
                    >
                        <PrivateRoute asChild>
                            <WithdrawPage />
                        </PrivateRoute>
                    </Suspense>
                ),
                children: [
                    {
                        path: ":withdrawalId/confirm",
                        element: <ConfirmWithdrawalDialog />
                    },
                    {
                        path: ":withdrawalId/cancel",
                        element: <CancelWithdrawalDialog />
                    }
                ]
            },
            {
                path: "balance",
                element: (
                    <Suspense
                        fallback={
                            <GridLoader
                                color="red"
                                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                            />
                        }
                    >
                        <PrivateRoute asChild>
                            <BalancePage />
                        </PrivateRoute>
                    </Suspense>
                )
            },
            {
                path: "requisite",
                element: (
                    <Suspense
                        fallback={
                            <GridLoader
                                color="red"
                                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                            />
                        }
                    >
                        <PrivateRoute asChild>
                            <RequisitePage />
                        </PrivateRoute>
                    </Suspense>
                )
            },
            {
                path: "*",
                element: <Navigate to="/replenishment" />
            }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/login" />
    }
]);

export const ReactRouterProvider = () => {
    return <Provider router={router} />;
};
