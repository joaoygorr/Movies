// config router 
import { Routes, Route } from "react-router-dom";
import { Auth } from "../context/auth/auth";
// Pages 
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={<Auth Item={<Home />} />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    )
}

export default Router; 