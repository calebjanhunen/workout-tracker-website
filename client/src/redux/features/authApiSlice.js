import { apiSlice } from "redux/api/apiSlice";

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
