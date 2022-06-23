import { configureStore } from "@reduxjs/toolkit";

import workoutReducer from "./features/workouts/workoutSlice.js";

export const store = configureStore({
    reducer: {
        workouts: workoutReducer,
    },
});
