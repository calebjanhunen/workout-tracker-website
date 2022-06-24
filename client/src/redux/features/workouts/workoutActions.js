import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const WORKOUTS_URL = "http://localhost:5000/workouts";

export const fetchWorkouts = createAsyncThunk("/fetchWorkouts", async () => {
    try {
        const response = await axios.get(WORKOUTS_URL);
        return response.data;
    } catch (err) {
        return err.message;
    }
});

export const createWorkout = createAsyncThunk(
    "/postWorkouts",
    async newWorkout => {
        try {
            const response = await axios.post(WORKOUTS_URL, newWorkout);
            return response.data;
        } catch (err) {
            return err.message;
        }
    }
);
