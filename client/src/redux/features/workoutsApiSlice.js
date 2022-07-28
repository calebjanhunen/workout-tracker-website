import { apiSlice } from "redux/api/apiSlice";

export const workoutApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getWorkouts: builder.query({
            query: () => "/workouts",
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetWorkoutsQuery } = workoutApiSlice;
