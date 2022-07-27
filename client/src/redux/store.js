import { configureStore } from "@reduxjs/toolkit";

import workoutTemplateReducer from "./reducer/workoutTemplateSlice";
import { workoutTrackerApi } from "./api/workoutTrackerApi";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./reducer/authSlice";

export const store = configureStore({
    reducer: {
        workoutTemplate: workoutTemplateReducer,
        // [workoutTrackerApi.reducerPath]: workoutTrackerApi.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({}).concat([apiSlice.middleware]),
    devTools: true,
});
