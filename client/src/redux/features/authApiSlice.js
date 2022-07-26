import { apiSlice } from "redux/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({}),
        login: builder.mutation({
            query: credentials => ({
                url: "/login",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        logout: builder.mutation({}),
        refreshAccessToken: builder.query({}),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useLazyRefreshAccessTokenQuery,
} = authApiSlice;
