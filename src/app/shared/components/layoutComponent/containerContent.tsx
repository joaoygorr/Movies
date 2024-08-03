import { ReactNode } from "react";
import "./layout.style.scss";

interface ContainerRootProps {
    children: ReactNode
}

export function ContainerContent({ children }: ContainerRootProps) {
    return (
        <div className="info">
            <div className=" info-box container flex flex-col md:flex-row">
                {children}
            </div>
        </div>
    )
}