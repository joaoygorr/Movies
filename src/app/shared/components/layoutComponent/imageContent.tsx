import { ReactNode } from "react";

interface ImageRootProps {
    src: string;
    alt: string;
    className: string;
    children?: ReactNode;
}

export function ImageContent({
    alt,
    className,
    src,
    children
}: ImageRootProps) {
    return (
        <div className="flex-none info-image">
            <img src={src} alt={alt} className={className} />
            {children}
        </div>
    );
}
