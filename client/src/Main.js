import React from "react";
import { Routes, Route } from "react-router-dom";

import StartWorkoutPage from "./components/StartWorkoutPage/StartWorkoutPage.js";
import Home from "./components/Home";

const Main = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/startWorkout" element={<StartWorkoutPage />} />
        </Routes>
    );
};

export default Main;
