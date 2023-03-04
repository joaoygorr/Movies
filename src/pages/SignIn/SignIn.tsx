import { useState } from "react";
//Styled
import { Button } from "../../shared/Components/Button/button";
import { BoxButton, BoxInput, BoxSignIn, ContainerSignIn } from "./SignIn.styled";
//service
import { SessionService } from "../../shared/services/Session";
//hoks
import useForm from "../../shared/hooks/useForm";

const SignIn = () => {
    const [token, setToken] = useState("");
    const [{ value }, handleChange] = useForm();

    const handleSubmit = () => {
        const { getToken, postSession, postSessionWithLogin } = SessionService;
        getToken().then(json => console.log(json.request_token));
    

        value.request_token = token;
        console.log("🚀 ~ file: SignIn.tsx:20 ~ handleSubmit ~ value:", value)

        // postSessionWithLogin(value);
    };

    return (
        <ContainerSignIn>
            <BoxSignIn className="grid grid-cols-1 grid-rows-4">
                <div>
                    <h1 className="title">
                        login
                        <hr className="mt-3" />
                    </h1>
                </div>
                <BoxInput>
                    <label>
                        usuário*
                        <input
                            className="required:border-red-500 focus:ring-0"
                            type="text"
                            name="username"
                            placeholder="Digite seu usuário..."
                            onChange={handleChange}
                        />
                    </label>
                </BoxInput>

                <BoxInput>
                    <label>
                        senha*
                        <input
                            className="required:border-red-500 focus:ring-0"
                            type="password"
                            name="password"
                            placeholder="Digite sua senha..."
                            onChange={handleChange}
                        />
                    </label>
                </BoxInput>

                <BoxButton>
                    <Button typeButton="submit" textButton="entrar" clickButton={handleSubmit} classButton="bg-indigo-700" />
                </BoxButton>
            </BoxSignIn>
        </ContainerSignIn>
    )
}

export default SignIn;