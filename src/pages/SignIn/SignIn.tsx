import { useState, ChangeEvent, useEffect } from "react";
//Styled
import { Button } from "../../shared/Components/Button/button";
import { BoxButton, BoxInput, BoxSignIn, ContainerSignIn } from "./SignIn.styled";
//class 
import { Session } from "../../shared/Classes/session.class";
//service
import { SessionService } from "../../shared/services/Session";

const SignIn = () => {
    const [user, setUser] = useState("");
    const [passoword, setPassword] = useState("");

    const handleChangeUser = (event: ChangeEvent<HTMLInputElement>) => {
        setUser(event.currentTarget.value);
    };

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    };

    const handleSubmit = () => {
        const { getToken, postSession, postSessionWithLogin } = SessionService;
        const token = getToken()
        console.log("🚀 ~ file: SignIn.tsx:25 ~ handleSubmit ~ token:", token)

        // const loginUser = new Session(user, passoword, token);
        // postSessionWithLogin(loginUser)
    }

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
                            name="user"
                            placeholder="Digite seu usuário..."
                            onChange={(event) => handleChangeUser(event)}
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
                            onChange={(event) => handleChangePassword(event)}
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