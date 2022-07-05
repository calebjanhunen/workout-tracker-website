import WorkoutTemplate from "../models/workoutTemplate.js";

export async function createWorkoutTemplate(req, res) {
    const newWorkoutTemplate = new WorkoutTemplate(req.body);
    try {
        await newWorkoutTemplate.save();
        res.status(201).json(newWorkoutTemplate);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

export async function getWorkoutTemplates(req, res) {
    try {
        const data = await WorkoutTemplate.find();
        res.json(data);
    } catch (err) {
        res.status(400).json({ message: "no" });
    }
}

export async function deleteWorkoutTemplate(req, res) {}
