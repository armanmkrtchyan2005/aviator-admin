import { useRef } from "react";
import { useFetchUserInfoQuery } from "@/entities/user";
import { useTableContext } from "@/shared/ui/table";

interface AvailableWithdrawalFilter {
    type: "available";
    id: string | undefined;
}

interface ActiveWithdrawalFilter {
    type: "active";
    id: string | undefined;
}

interface AllWithdrawalFilter {
    type: "all";
    id?: never;
}

type WithdrawalFilter =
    | AvailableWithdrawalFilter
    | ActiveWithdrawalFilter
    | AllWithdrawalFilter;

const tabs = [
    { label: "Доступные", value: "available" },
    { label: "Активные", value: "active" },
    { label: "Все", value: "all" }
] as const;

export const Tabs = () => {
    const { table } = useTableContext();
    const { data: user } = useFetchUserInfoQuery();

    const activeTabIndex = useRef(0);

    const onClickHandler = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        index: number,
        { type, id }: WithdrawalFilter
    ) => {
        if (!table) return;

        const currentTab = event.currentTarget;
        const tabList = currentTab.parentElement!.children;
        tabList[activeTabIndex.current].setAttribute("aria-selected", "false");
        currentTab.setAttribute("aria-selected", "true");
        activeTabIndex.current = index;

        // const columns = ;
        const actions = table
            .getAllColumns()
            .filter(column => column.id === "action")[0];
        actions.setFilterValue({
            type: type,
            id: id
        });
    };

    return (
        <div className="col-start-1 col-end-3 mx-auto flex w-max items-center justify-center rounded-full border-2 border-slate-300">
            {tabs.map((tab, i) => (
                <button
                    key={i}
                    aria-selected={i === activeTabIndex.current}
                    onClick={event =>
                        onClickHandler(
                            event,
                            i,
                            tab.value !== "all"
                                ? {
                                      type: tab.value,
                                      id: user?._id
                                  }
                                : {
                                      type: tab.value
                                  }
                        )
                    }
                    className="min-w-32 rounded-full transition-colors duration-150 aria-selected:bg-slate-700 aria-selected:font-medium aria-selected:text-white aria-[selected=false]:hover:text-red-500"
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};
