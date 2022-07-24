import React from "react";
import { Routes, Route } from "react-router-dom";

import {
    StartWorkout,
    StartFromTemplate,
    CreateWorkoutForm,
    Home,
    WorkoutHistory,
    WorkoutTemplate,
    Login,
} from "pages";
import Layout from "./components/Layout";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/*Public routes */}
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                {/*Protected Routes */}
                <Route path="start-workout" element={<StartWorkout />} />
                <Route
                    path="start-workout/start-from-template"
                    element={<StartFromTemplate />}
                />
                <Route
                    path="start-workout/create-workout-form"
                    element={<CreateWorkoutForm />}
                />
                <Route
                    path="create-workout-template"
                    element={<WorkoutTemplate />}
                />
                <Route path="workout-history" element={<WorkoutHistory />} />
            </Route>
        </Routes>
    );
};

export default App;
