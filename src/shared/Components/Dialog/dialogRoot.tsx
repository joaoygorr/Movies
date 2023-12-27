import { Dialog } from 'primereact/dialog';
import { ReactNode } from 'react';

type DialogRootProps = {
    children: ReactNode,
    header: string,
    visible: boolean,
    onHide: () => void,
    width: string
}

export const DialogRoot = ({ children, header, visible, onHide, width }: DialogRootProps) => {
    return (
        <Dialog header={header} draggable={false} visible={visible} onHide={onHide} style={{ width: width }}>
            {children}
        </Dialog>
    )
}