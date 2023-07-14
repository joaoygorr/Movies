// config router 
import { Routes, Route } from "react-router-dom";
// Pages 
// import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/signin" element={<SignIn />} /> */}
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    )
}

export default Router; 