import React from "react";
import { Routes, Route } from "react-router-dom";

import StartWorkoutPage from "./components/StartWorkoutPage/StartWorkoutPage.js";
import Home from "./components/HomePage/Home.js";
import WorkoutHistory from "./components/ViewWorkoutsPage/WorkoutHistoryPage.js";
import WorkoutTemplatePage from "./components/CreateWorkoutTemplatePage/WorkoutTemplatePage.js";
import StartFromTemplatePage from "./components/StartWorkoutPage/StartFromTemplatePage/StartFromTemplatePage.js";

const Main = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/start-workout" element={<StartWorkoutPage />} />
            <Route
                exact
                path="/create-workout-template"
                element={<WorkoutTemplatePage />}
            />
            <Route exact path="/WorkoutHistory" element={<WorkoutHistory />} />
            <Route
                exact
                path="/start-from-template"
                element={<StartFromTemplatePage />}
            />
        </Routes>
    );
};

export default Main;
