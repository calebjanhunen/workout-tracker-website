import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const workoutSlice = createSlice({
    name: "workouts",
    initialState,
    reducers: {
        createWorkout: {
            reducer(state, action) {
                state = [...state, action.payload];
            },
            prepare(workoutName, exerciseForm) {
                return {
                    payload: {
                        name: workoutName,
                        exercises: exerciseForm,
                    },
                };
            },
        },
        getAllWorkouts: (state, action) => {},
        deleteWorkout: (state, action) => {},
        updateWorkout: (state, action) => {},
    },
});

export const { createWorkout, getAllWorkouts, deleteWorkout, updateWorkout } =
    workoutSlice.actions;

export const selectAllWorkouts = state => state.workouts;

export default workoutSlice.reducer;
