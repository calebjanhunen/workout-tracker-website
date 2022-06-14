import mongoose from "mongoose";

import Workout from "../models/workout.js";

export async function createWorkout(req, res) {
    const newWorkout = new Workout(req.body);

    try {
        await newWorkout.save();
        res.json(newWorkout);
    } catch (err) {
        res.status(400).json({ message: "Could not create workout" });
    }
}

export async function getWorkouts(req, res) {
    try {
        const data = await Workout.find();
        res.json(data);
    } catch (err) {
        res.status(400).json({ message: "Could not get workouts" });
    }
}
