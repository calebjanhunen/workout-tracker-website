import React from "react";
import { Routes, Route } from "react-router-dom";

import StartWorkoutPage from "./components/StartWorkoutPage/StartWorkoutPage.js";
import Home from "./components/HomePage/Home.js";
import ViewWorkouts from "./components/ViewWorkoutsPage/ViewWorkoutsPage.js";

const Main = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/startWorkout" element={<StartWorkoutPage />} />
            <Route exact path="/viewWorkouts" element={<ViewWorkouts />} />
        </Routes>
    );
};

export default Main;
