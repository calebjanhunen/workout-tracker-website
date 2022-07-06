import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import workoutTemplateReducer from "./reducer/workoutTemplateSlice";
import { workoutTrackerApi } from "./features/api/workoutTrackerApi";

export const store = configureStore({
    reducer: {
        workoutTemplate: workoutTemplateReducer,
        [workoutTrackerApi.reducerPath]: workoutTrackerApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({}).concat([workoutTrackerApi.middleware]),
});
