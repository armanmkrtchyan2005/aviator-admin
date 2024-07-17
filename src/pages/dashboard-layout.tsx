import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { DashboardHeader } from "@/widgets/dashboard-header";
import { NavigationPanel } from "@/shared/ui/navigation-panel";
import { useSessionStorage } from "@/shared/lib/hooks/use-session-storage";
import { getDurationTimeLapse } from "@/shared/lib/helpers/get-duration-time-lapse";

const links = [
    { id: 1, label: "Пополнения", uri: "/replenishment" },
    { id: 2, label: "Выводы", uri: "/withdrawal" },
    { id: 3, label: "Пополнить баланс", uri: "/balance" },
    { id: 4, label: "Реквизиты", uri: "/requisite" }
];

export const DashboardLayout = () => {
    const { startDate, endDate } = getDurationTimeLapse();
    useSessionStorage("durationTimeLapse", { startDate, endDate });

    return (
        <>
            <DashboardHeader />
            <NavigationPanel links={links} />
            <main>
                <Suspense fallback={<pre>Suspense loading</pre>}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    );
};
