import React from 'react';
import { Route, Routes } from 'react-router-dom';

import WorkoutForm from 'components/WorkoutForm/WorkoutForm';
import {
    CreateWorkoutForm,
    CreateWorkoutTemplate,
    Explore,
    Home,
    Login,
    PageNotFound,
    Profile,
    SelectWorkoutTemplate,
    WorkoutHistory,
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
                            path="select-workout-template"
                            element={<SelectWorkoutTemplate />}
                        />
                        <Route
                            path="select-workout-template/create-workout-form"
                            element={<CreateWorkoutForm />}
                        />
                        <Route
                            path="create-workout-template"
                            element={<CreateWorkoutTemplate />}
                        />
                        <Route
                            path="workout-history"
                            element={<WorkoutHistory />}
                        />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Route>

                <Route path="/*" element={<PageNotFound />} />
            </Route>
        </Routes>
    );
};

export default App;
