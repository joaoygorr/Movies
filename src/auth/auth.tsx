import SignIn from "../pages/SignIn/SignIn";

export const Auth = ({ Item }) => {
    const signed = 0;

    return signed > 0 ? <Item /> : <SignIn />;
}
