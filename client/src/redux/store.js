import { configureStore } from "@reduxjs/toolkit";

import workoutTemplateReducer from "./reducer/workoutTemplateSlice";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./reducer/authSlice";

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
