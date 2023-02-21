// config router 
import { Routes, Route } from "react-router-dom";
// Pages 
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";
import { Auth } from "../auth/auth";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={<Auth Item={<Home />} />} />
            <Route path="/sigup" element={<SignUp />} />
        </Routes>
    )
}

export default Router; 