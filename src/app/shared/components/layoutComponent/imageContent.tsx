import { ReactNode } from "react";
import {
    LazyLoadImage,
    LazyLoadImageProps
} from "react-lazy-load-image-component";

interface ImageRootProps extends LazyLoadImageProps {
    children?: ReactNode;
}

export function ImageContent({ children, ...props }: ImageRootProps) {
    return (
        <div className="flex-none info-image">
            <LazyLoadImage {...props} />
            {children}
        </div>
    );
}
