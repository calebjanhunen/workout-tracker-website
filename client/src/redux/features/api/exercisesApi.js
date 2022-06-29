import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const exercisesApi = createApi({
    reducerPath: "exercisesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    tagTypes: ["Exercises"],
    endpoints: builder => ({
        getExercises: builder.query({
            query: () => "/exercises",
            providesTags: ["Exercises"],
        }),
        getExercisesByPage: builder.query({
            query: page => ({
                url: `/exercises/${page}`,
                method: "GET",
            }),
            providesTags: ["Exercises"],
        }),
        createExercise: builder.mutation({
            query: exercise => ({
                url: "/exercises",
                method: "POST",
                body: exercise,
            }),
            invalidatesTags: ["Exercises"],
        }),
    }),
});

export const {
    useGetExercisesQuery,
    useGetExercisesByPageQuery,
    useCreateExerciseMutation,
} = exercisesApi;
