import { ImgHTMLAttributes, ReactNode } from "react";

interface ImageRootProps extends ImgHTMLAttributes<HTMLImageElement> {
    children?: ReactNode;
}

export function ImageContent({ children, ...props }: ImageRootProps) {
    return (
        <div className="flex-none info-image">
            <img {...props} />
            {children}
        </div>
    );
}
