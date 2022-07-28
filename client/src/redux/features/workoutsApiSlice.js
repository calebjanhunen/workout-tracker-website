import { apiSlice } from "redux/api/apiSlice";

export const workoutApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getWorkouts: builder.query({
            query: () => "/workouts",
            keepUnusedDataFor: 5,
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
        }),
        updateWorkout: builder.mutation({
            query: workout => ({
                url: `/workout/${workout._id}`,
                method: "PATCH",
                body: workout,
            }),
        }),
    }),
});

export const {
    useGetWorkoutsQuery,
    useCreateWorkoutMutation,
    useDeleteWorkoutMutation,
    useUpdateWorkoutMutation,
} = workoutApiSlice;
