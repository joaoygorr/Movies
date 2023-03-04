import { ChangeEvent, useState } from "react";

const useForm = () => {
    const [value, setValue] = useState({});

    // console.log("🚀 ~ file: SignIn.tsx:15 ~ SignIn ~ value:", value)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const auxValues: any = { ...value };
        auxValues[e.currentTarget.name] = e.currentTarget.value;
        setValue(auxValues)
    };

    return [{ value }, handleChange] as any;
};

export default useForm; 