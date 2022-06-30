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
            query: ({ pageNum, resultsPerPage }) =>
                `/exercises?limit=${resultsPerPage}&page=${pageNum}`,
            providesTags: ["Exercises"],
        }),
        getExerciseById: builder.query({
            query: id => `/exercises/${id}`,
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
        deleteExercise: builder.mutation({
            query: id => ({
                url: `/exercises/${id}`,
                method: "DELETE",
                body: id,
            }),
            invalidatesTags: ["Exercises"],
        }),
    }),
});

export const {
    useGetExercisesQuery,
    useGetExercisesByPageQuery,
    useGetExerciseByIdQuery,
    useCreateExerciseMutation,
    useDeleteExerciseMutation,
} = exercisesApi;
