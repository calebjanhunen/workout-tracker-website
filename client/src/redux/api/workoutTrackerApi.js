import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const workoutTrackerApi = createApi({
    reducerPath: "workoutTrackerApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    tagTypes: ["workouts", "workoutTemplates"],
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
        /******************For workout templates********************** */
        getWorkoutTemplates: builder.query({
            query: () => "/workoutTemplates",
            providesTags: ["workoutTemplates"],
        }),
        createWorkoutTemplate: builder.mutation({
            query: workoutTemplate => ({
                url: "/workoutTemplates",
                method: "POST",
                body: workoutTemplate,
            }),
            invalidatesTags: ["workoutTemplates"],
        }),
        deleteWorkoutTemplate: builder.mutation({
            query: id => ({
                url: `/workoutTemplates/${id}`,
                method: "DELETE",
                body: id,
            }),
            invalidatesTags: ["workoutTemplates"],
        }),
        /***********************For Exercises**************************** */
        getExercises: builder.query({
            query: () => "/exercises",
            providesTags: ["Exercises"],
        }),
        getExercisesByQuery: builder.query({
            query: ({ pageNum, resultsPerPage, bodyPartFilter }) =>
                `/exercises?limit=${resultsPerPage}&page=${pageNum}&filter=${bodyPartFilter}`,
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
    /***********************For workouts*************** */
    useGetWorkoutsQuery,
    useCreateWorkoutMutation,
    useUpdateWorkoutMutation,
    useDeleteWorkoutMutation,
    /***************for workout templates************/
    useGetWorkoutTemplatesQuery,
    useCreateWorkoutTemplateMutation,
    useDeleteWorkoutTemplateMutation,
    /***********************FOr exercises*************** */
    useGetExercisesQuery,
    useGetExercisesByQueryQuery,
    useCreateExerciseMutation,
    useDeleteExerciseMutation,
} = workoutTrackerApi;
