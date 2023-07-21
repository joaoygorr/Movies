import { Dialog } from 'primereact/dialog';
import { ReactNode } from 'react';
import { DialogFooter } from "./dialogFooter";

type DialogRootProps = {
    children: ReactNode,
    header: string,
    visible: boolean,
    onHide: () => void,
}

export const DialogRoot = ({ children, header, visible, onHide }: DialogRootProps) => {
    return (
        <Dialog header={header} draggable={false} visible={visible} onHide={onHide} footer={DialogFooter} style={{ width: '30%' }}>
            {children}
        </Dialog>
    )
}