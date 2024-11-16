import { ReactNode } from "react";
import "./modal.styled.scss";

interface ModalProps {
    children: ReactNode;
}

export const Modal = ({ children }: ModalProps) => {
    return (
        <div className="modal-box shadow-lg">
            <div className="container modal lg:px-32 rounded-lg">
                <div className="children">{children}</div>
            </div>
        </div>
    );
};
