import { apiSlice } from 'redux/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query: credentials => ({
                url: '/users/register',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        login: builder.mutation({
            query: credentials => ({
                url: '/users/login',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/users/logout',
                method: 'POST',
            }),
        }),
        refreshAccessToken: builder.query({
            query: () => '/users/refresh',
        }),
        getuserById: builder.query({
            query: id => `/users/${id}`,
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useLazyRefreshAccessTokenQuery,
    useGetuserByIdQuery,
} = authApiSlice;
