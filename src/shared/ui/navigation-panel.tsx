import { NavLink } from "react-router-dom";

import { cn } from "../lib/tailwind-merge";

interface NavigationLink {
    id: number;
    uri: string;
    label: string;
}

interface NavigationProps extends React.ComponentProps<"nav"> {
    links: NavigationLink[];
}

export const NavigationPanel: React.FC<NavigationProps> = ({
    className,
    links,
    ...props
}) => {
    return (
        <nav
            className={cn("", className)}
            {...props}
        >
            <ul className="flex gap-4 p-3">
                {links.map(link => (
                    <li key={link.id}>
                        <NavLink
                            to={link.uri}
                            className="text-semibold text-xl aria-[current=page]:text-blue-500"
                        >
                            {link.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
