import { Routes, Route } from "react-router-dom";
import { Film } from "@/pages/Film/film";
import Home from "@/pages/Home/Home";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/film/:id" element={<Film />} />
        </Routes>
    )
}

export default Router; 