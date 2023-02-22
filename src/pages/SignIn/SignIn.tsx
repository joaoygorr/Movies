//Styled
import { Button } from "../../shared/Components/Button/button";
import { BoxButton, BoxInput, BoxSignIn, ContainerSignIn } from "./SignIn.styled";

const SignIn = () => {
    return (
        <ContainerSignIn>
            <BoxSignIn className="grid grid-cols-1 grid-rows-3">
                <BoxInput>
                    <label>
                        usuário
                        <input className="required:border-red-500" type="email" name="email" placeholder="you@example.com" />
                    </label>
                </BoxInput>

                <BoxInput>
                    <label>
                        senha
                        <input className="required:border-red-500" type="password" name="password" />
                    </label>
                </BoxInput>

                <BoxButton>
                    <Button typeButton="submit" textButton="entrar" classButton="bg-cyan-500" />
                </BoxButton>
            </BoxSignIn>
        </ContainerSignIn>
    )
}

export default SignIn;