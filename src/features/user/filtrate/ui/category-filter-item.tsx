interface CategoryFilterItemProps extends React.ComponentProps<"li"> {}

export const CategoryFilterItem: React.FC<CategoryFilterItemProps> = ({
    ...props
}) => {
    return (
        <li
            role="option"
            className="cursor-pointer text-nowrap first-letter:uppercase aria-selected:font-medium aria-selected:text-blue-500"
            {...props}
        />
    );
};
