import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {},
};

export const workoutTemplateSlice = createSlice({
    name: "workoutTemplate",
    initialState,
    reducers: {
        setWorkoutTemplate: (state, action) => {
            console.log("set");
            state.value = action.payload;
        },
    },
});

export const { setWorkoutTemplate } = workoutTemplateSlice.actions;

export default workoutTemplateSlice.reducer;
