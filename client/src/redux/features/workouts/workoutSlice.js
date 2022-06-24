import { createSlice } from "@reduxjs/toolkit";
import { fetchWorkouts, createWorkout } from "./workoutActions";

const initialState = {
    workouts: [],
    status: "idle", //idle, loading, succeeded, failed
    error: null,
};

export const workoutSlice = createSlice({
    name: "workouts",
    initialState,
    extraReducers(builder) {
        builder
            .addCase(fetchWorkouts.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchWorkouts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.workouts = action.payload;
            })
            .addCase(fetchWorkouts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createWorkout.fulfilled, (state, action) => {
                state.status = "succeeeded";
                state.workouts = [...state.workouts, action.payload];
            });
    },
});

export const { getAllWorkouts, deleteWorkout, updateWorkout } =
    workoutSlice.actions;

export const selectAllWorkouts = state => state.workouts.workouts;
export const getWorkoutsStatus = state => state.workouts.status;
export const getWorkoutsError = state => state.workouts.error;

export default workoutSlice.reducer;
