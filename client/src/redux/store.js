import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./api/apiSlice";
import authReducer from "./reducer/authSlice";
import workoutTemplateReducer from "./reducer/workoutTemplateSlice";

export const store = configureStore({
    reducer: {
        workoutTemplate: workoutTemplateReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({}).concat([apiSlice.middleware]),
    devTools: true,
});
