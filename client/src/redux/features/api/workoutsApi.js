import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const workoutsApi = createApi({
    reducerPath: "workoutsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    tagTypes: ["workouts"],
    endpoints: builder => ({
        getWorkouts: builder.query({
            query: () => "/workouts",
            providesTags: ["workouts"],
        }),
        createWorkout: builder.mutation({
            query: workout => ({
                url: "/workouts",
                method: "POST",
                body: workout,
            }),
            invalidatesTags: ["workouts"],
        }),
        updateWorkout: builder.mutation({
            query: workout => ({
                url: `/workouts/${workout._id}`,
                method: "PATCH",
                body: workout,
            }),
            invalidatesTags: ["workouts"],
        }),
        deleteWorkout: builder.mutation({
            query: id => ({
                url: `/workouts/${id}`,
                method: "DELETE",
                body: id,
            }),
            invalidatesTags: ["workouts"],
        }),
    }),
});

export const {
    useGetWorkoutsQuery,
    useCreateWorkoutMutation,
    useUpdateWorkoutMutation,
    useDeleteWorkoutMutation,
} = workoutsApi;
