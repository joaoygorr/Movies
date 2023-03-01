type Props = {
    typeButton: "submit" | "button" | "reset" | undefined;
    classButton: string;
    textButton: string;
    clickButton?: () => any;
}

export const Button = ({ typeButton, classButton, textButton, clickButton }: Props) => {
    const handleClick = () => {
        if (clickButton) {
            clickButton();
        }
    }

    return <button type={typeButton} className={classButton} onClick={handleClick}>{textButton}</button>
}