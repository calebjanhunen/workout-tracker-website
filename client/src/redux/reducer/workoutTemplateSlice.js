import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {},
};

export const workoutTemplateSlice = createSlice({
    name: "workoutTemplate",
    initialState,
    reducers: {
        setWorkoutTemplate: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setWorkoutTemplate } = workoutTemplateSlice.actions;

export default workoutTemplateSlice.reducer;
