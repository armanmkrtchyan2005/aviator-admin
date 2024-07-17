interface EventType extends React.SyntheticEvent {}

export const composeEventHandlers = (
    external: ((event: EventType) => any) | undefined,
    internal: (event: EventType) => any
): ((event: EventType) => void) => {
    return function (event) {
        external?.(event);

        if (!event.defaultPrevented) {
            return internal(event);
        }
    };
};
