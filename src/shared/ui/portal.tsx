import ReactDOM from "react-dom";

export interface PortalElement<T extends HTMLElement>
    extends React.HTMLAttributes<T> {
    renderElement?: T | null;
}

export const Portal = <T extends HTMLElement>({
    children,
    renderElement
}: PortalElement<T>) => {
    return ReactDOM.createPortal(children, renderElement || document.body);
};
