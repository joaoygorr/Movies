interface ImageRootProps {
    src: string,
    alt: string,
    className: string
}

export function ImageContent({ alt, className, src }: ImageRootProps) {
    return (
        <div className="flex-none info-image">
            <img src={src} alt={alt} className={className} />
        </div>
    )
}