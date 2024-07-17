import "./index.css";

import { cn } from "@/shared/lib/tailwind-merge";

import ImageNotAvailable from "@/assets/image-not-available.webp";

interface ZoomableImageProps extends React.ComponentProps<"img"> {
    src: string;
}

export const ZoomableImage: React.FC<ZoomableImageProps> = ({
    className,
    ...props
}) => {
    const onMouseMoveHandler: React.MouseEventHandler<
        HTMLImageElement
    > = event => {
        const target = event.currentTarget;
        const { x, y, height, width } = target.getBoundingClientRect();

        const horizontal = ((event.clientX - x) / width) * 100;
        const vertical = ((event.clientY - y) / height) * 100;

        target.style.setProperty("--x", horizontal + "%");
        target.style.setProperty("--y", vertical + "%");
    };

    const onErrorHandler: React.ReactEventHandler<HTMLImageElement> = event => {
        event.currentTarget.src = ImageNotAvailable;
    };

    return (
        <figure className="image-wrapper">
            <img
                className={cn("zoomable-image", className)}
                onMouseMove={onMouseMoveHandler}
                onError={onErrorHandler}
                {...props}
            />
        </figure>
    );
};
