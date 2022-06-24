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
        const date = new Date();
        try {
            const response = await axios.post(WORKOUTS_URL, {
                ...newWorkout,
                createdAt: date,
            });
            return response.data;
        } catch (err) {
            return err.message;
        }
    }
);

export const deleteWorkout = createAsyncThunk("/deleteWorkout", async id => {
    try {
        await axios.delete(`${WORKOUTS_URL}/${id}`, id);
        return id;
    } catch (err) {
        return err.message;
    }
});

export const updateWorkout = createAsyncThunk(
    "/updateWorkout",
    async workout => {
        try {
            const response = await axios.patch(
                `${WORKOUTS_URL}/${workout._id}`,
                workout
            );

            return response.data;
        } catch (err) {
            return err.message;
        }
    }
);
