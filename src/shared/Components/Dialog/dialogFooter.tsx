import { ReactNode } from "react"

type DialogFooterProps = {
    children: ReactNode,
    className: string
}

export const DialogFooter = ({ children, className }: DialogFooterProps) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}