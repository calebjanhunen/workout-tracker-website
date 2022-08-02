import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { setCredentials, clearState } from "redux/reducer/authSlice";

//production: https://janhunen-workout-tracker-api.herokuapp.com
//dev: http://localhost:5000

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        //attach access token to header on each request
        const accessToken = getState().auth.accessToken;
        if (accessToken) {
            headers.set("authorization", `Bearer ${accessToken}`);
        }
        return headers;
    },
});

async function baseQueryWithReAuth(args, api) {
    let result = await baseQuery(args, api);

    if (result.error?.status === 403) {
        const refreshResult = await baseQuery("/users/refresh", api);

        api.dispatch(
            setCredentials({
                user: refreshResult.data.username,
                accessToken: refreshResult.data.accessToken,
            })
        );

        result = await baseQuery(args, api);
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    tagTypes: ["workouts", "exercises", "workoutTemplates"],
    endpoints: builder => ({}),
});
