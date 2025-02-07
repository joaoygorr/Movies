import { ReactNode } from "react";
import "./modal.styled.scss";

interface ModalProps {
    children: ReactNode;
    hidden: (visible: boolean) => any;
}

export const Modal = ({ children, hidden }: ModalProps) => {
    return (
        <div className="modal-box shadow-lg">
            <div className="container modal lg:px-32 rounded-lg">
                <div className="children">
                    <div className="button-close">
                        <button
                            type="button"
                            onClick={() => hidden(false)}
                            className="hover:text-gray-300"
                        >
                            x
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};
