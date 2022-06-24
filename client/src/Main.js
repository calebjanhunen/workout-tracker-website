import React from "react";
import { Routes, Route } from "react-router-dom";

import StartWorkoutPage from "./components/StartWorkoutPage/StartWorkoutPage.js";
import Home from "./components/HomePage/Home.js";
import WorkoutHistory from "./components/ViewWorkoutsPage/WorkoutHistoryPage.js";

const Main = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/startWorkout" element={<StartWorkoutPage />} />
            <Route exact path="/WorkoutHistory" element={<WorkoutHistory />} />
        </Routes>
    );
};

export default Main;
