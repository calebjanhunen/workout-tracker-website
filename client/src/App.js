import React from "react";
import { Routes, Route } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

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
import RequireAuth from "components/RequireAuth";
import PersistLogin from "components/PersistLogin";
import NavBar from "components/NavBar/NavBar";

//TODO: reroute login to homepage if logged in
const App = () => {
    return (
        <Routes>
            {/*Public routes */}
            <Route path="/" element={<Login />} />
            <Route element={<Layout />}>
                <Route element={<PersistLogin />}>
                    {/*Protected Routes */}
                    <Route element={<RequireAuth />}>
                        <Route index path="home" element={<Home />} />
                        <Route
                            path="start-workout"
                            element={<StartWorkout />}
                        />
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
                        <Route
                            path="workout-history"
                            element={<WorkoutHistory />}
                        />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
