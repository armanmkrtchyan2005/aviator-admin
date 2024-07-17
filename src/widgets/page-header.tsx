import { LogoutButton } from "@/features/user/logout";
import { useFetchUserInfoQuery } from "@/entities/user";
import { cn } from "@/shared/lib/tailwind-merge";

interface PageHeaderProps extends React.ComponentProps<"header"> {}

export const PageHeader: React.FC<PageHeaderProps> = ({
    className,
    children,
    ...props
}) => {
    const { data: user, isLoading } = useFetchUserInfoQuery();

    return (
        <header
            className={cn(
                "flex items-center justify-between leading-none",
                className
            )}
            {...props}
        >
            <h1 className="text-2xl font-semibold leading-none">{children}</h1>
            {isLoading ? (
                <span className="h-3 w-72 animate-pulse rounded-full bg-slate-400" />
            ) : (
                <span>
                    Добро пожаловать, <strong>{user?.login}</strong>
                    <LogoutButton>Выйти</LogoutButton>
                </span>
            )}
        </header>
    );
};
