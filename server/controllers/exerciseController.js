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
        const data = await Exercise.find()
            .limit(parseInt(req.query.limit))
            .skip(parseInt(req.query.limit) * (parseInt(req.query.page) - 1));
        Exercise.aggregate();
        res.json(data);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

export async function deleteExercise(req, res) {
    const _id = req.params.id;
    try {
        const deletedExercise = await Exercise.findByIdAndDelete(_id);
        res.json(deletedExercise);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}
