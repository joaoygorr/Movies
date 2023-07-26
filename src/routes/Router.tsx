import { Routes, Route } from "react-router-dom";
import { FilmDetails } from "@/pages/Film/filmDetails";
import Home from "@/pages/Home/Home";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/film/:id" element={<FilmDetails />} />
        </Routes>
    )
}

export default Router; 