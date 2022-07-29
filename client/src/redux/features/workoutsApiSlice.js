import { apiSlice } from "redux/api/apiSlice";

export const workoutApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getWorkouts: builder.query({
            query: () => "/workouts",
            keepUnusedDataFor: 5,
            providesTags: ["workouts"],
        }),
        createWorkout: builder.mutation({
            query: workout => ({
                url: "/workouts",
                method: "POST",
                body: workout,
            }),
        }),
        deleteWorkout: builder.mutation({
            query: id => ({
                url: `/workouts/${id}`,
                method: "DELETE",
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
    }),
});

export const {
    useGetWorkoutsQuery,
    useCreateWorkoutMutation,
    useDeleteWorkoutMutation,
    useUpdateWorkoutMutation,
} = workoutApiSlice;
