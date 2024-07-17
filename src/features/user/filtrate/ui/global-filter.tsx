import { useTableContext } from "@/shared/ui/table/use-table-context";
import { SearchFilter } from "@/shared/ui";

export const GlobalFilter = () => {
    const { setGlobalFilter } = useTableContext();

    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = event => {
        const { query } = event.currentTarget;
        setGlobalFilter(query.value);
    };

    const onResetHandler: React.FormEventHandler<HTMLFormElement> = () => {
        setGlobalFilter("");
    };

    return (
        <SearchFilter
            onSubmit={onSubmitHandler}
            onReset={onResetHandler}
        />
    );
};
