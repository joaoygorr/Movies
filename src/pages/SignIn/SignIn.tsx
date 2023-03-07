import { Button } from "@/shared/Components";
//Styled
import { BoxButton, BoxInput, BoxSignIn, ContainerSignIn } from "./SignIn.styled";
//service
import { SessionService } from "../../shared/services/Session";
//hoks
import useForm from "../../shared/hooks/useForm";
import { IToken } from "@/shared/Interfaces";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
    const [{ value }, handleChange] = useForm();

    const handleSubmit = () => {
        const { getToken, postSessionWithLogin } = SessionService;
        getToken()?.then((token: IToken) => {
            value.request_token = token.request_token;
        });
        
        postSessionWithLogin(value);
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
            <ToastContainer />
        </ContainerSignIn>
    )
}

export default SignIn;