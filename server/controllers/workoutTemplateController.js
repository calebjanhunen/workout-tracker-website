import WorkoutTemplate from '../models/workoutTemplate.js';

export async function createWorkoutTemplate(req, res) {
    const { workoutName, exercises, createdBy } = req.body;

    try {
        const newWorkoutTemplate = WorkoutTemplate.create({
            workoutName,
            owner: req.user._id,
            exercises,
            createdBy: createdBy,
        });

        res.status(201).json(newWorkoutTemplate);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

export async function getWorkoutTemplates(req, res) {
    try {
        const data = await WorkoutTemplate.find({
            owner: req.user._id,
        })
            .populate('owner')
            .populate('createdBy');

        res.json(data);
    } catch (err) {
        res.status(400).json({ message: 'no' });
    }
}

export async function deleteWorkoutTemplate(req, res) {}
