import { Suspense, lazy } from "react";
import "./App.css";
import { GridLoader } from "react-spinners";

const ReactRouterProvider = lazy(async () =>
    import("@/app/providers/react-router-provider").then(module => ({
        default: module.ReactRouterProvider
    }))
);

export const App = () => {
    return (
        <Suspense
            fallback={
                <GridLoader
                    color="red"
                    className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
            }
        >
            <ReactRouterProvider />
        </Suspense>
    );
};
