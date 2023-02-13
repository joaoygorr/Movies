type Props = {
    classBtn: string;
    typeBtn: "button" | "reset" | "submit" | undefined;
    textBtn?: string;
}

export default function Button({ classBtn, textBtn, typeBtn }: Props) {
    return <button className={classBtn} type={typeBtn}>{textBtn}</button>
}