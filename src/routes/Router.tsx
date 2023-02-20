// config router 
import { createBrowserRouter } from "react-router-dom";
// Pages 
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";

const Router = createBrowserRouter([
    {
        path: "/signin",
        element: <SignIn />
    },
    {
        path: "/home",
        element: <Home />
    }
])

export default Router;
