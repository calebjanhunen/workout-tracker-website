import { apiSlice } from "redux/api/apiSlice";
import { createApi } from "@reduxjs/toolkit/dist/query";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => {
                console.log(credentials);
                return {
                    url: "/users/login",
                    method: "POST",
                    body: { ...credentials },
                };
            },
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/users/logout",
                method: "POST",
            }),
        }),
    }),
});

export const { useLoginMutation } = authApiSlice;
