import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

import { setCredentials, clearState } from "redux/reducer/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers, { getState }) => {
        //attach access token to header on each request
        const accessToken = getState().auth.token;

        if (accessToken) {
            headers.set("authorization", `Bearer ${accessToken}`);
        }
        return headers;
    },
});

async function baseQueryWithReAuth(args, api, extraOptions) {
    try {
    } catch (err) {
        console.log(err);
    }
}

export const apiSlice = createApi({
    baseQuery,
    endpoints: builder => ({}),
});
