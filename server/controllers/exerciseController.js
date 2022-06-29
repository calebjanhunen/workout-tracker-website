import Exercise from "../models/exercises.js";

export async function createExercise(req, res) {
    const newExercise = new Exercise(req.body);
    try {
        await newExercise.save();
        res.json(newExercise);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

export async function getExercises(req, res) {
    try {
        const data = await Exercise.find();
        res.json(data);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

export async function getExercisesByPage(req, res) {
    const pageNum = req.params.page;
    try {
        const data = await Exercise.find()
            .limit(10)
            .skip(10 * (pageNum - 1));
        res.json(data);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

export async function deleteExercise(req, res) {
    const _id = req.params.id;
    try {
        await Exercise.findByIdAndDelete(_id);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}
