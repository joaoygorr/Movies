import { ReactNode } from "react"

interface DetailsRootProps {
    children: ReactNode
}

export function DetailsContent({ children }: DetailsRootProps) {
    return (
        <div className="md:ml-24">
            {children}
        </div>
    )
}