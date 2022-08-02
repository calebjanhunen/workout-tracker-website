import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ExerciseList from 'components/ExerciseList/ExerciseList';
import {
    CreateWorkoutForm,
    Home,
    Login,
    PageNotFound,
    StartFromTemplate,
    StartWorkout,
    WorkoutHistory,
    WorkoutTemplate,
} from 'pages';
import Register from 'pages/Register/Register';
import PersistLogin from 'utils/auth/PersistLogin/PersistLogin';
import RequireAuth from 'utils/auth/RequireAuth';
import Layout from './components/Layout';

//TODO: reroute login to homepage if logged in
const App = () => {
    return (
        <Routes>
            <Route element={<PersistLogin />}>
                {/*Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/*Protected Routes */}
                <Route element={<RequireAuth />}>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
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

                    <Route path="/exercise-list" element={<ExerciseList />} />
                </Route>

                <Route path="/*" element={<PageNotFound />} />
            </Route>
        </Routes>
    );
};

export default App;
