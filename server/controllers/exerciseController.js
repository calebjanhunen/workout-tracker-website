import Exercise from "../models/exercises.js";

export async function createExercise(req, res) {
    const { name, bodyPart } = req.body;
    try {
        const newExercise = await Exercise.create({
            name,
            bodyPart,
            owner: req.user._id,
        });

        res.json(newExercise);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

export async function getExercises(req, res) {
    let filter =
        req.query.filter !== "All body parts"
            ? { owner: req.user._id, bodyPart: req.query.filter }
            : { owner: req.user._id };
    try {
        const data = await Exercise.find(filter)
            .limit(parseInt(req.query.limit))
            .skip(parseInt(req.query.limit) * (parseInt(req.query.page) - 1));
        res.json(data);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

export async function getExerciseById(req, res) {
    const _id = req.params.id;
    try {
        const exercise = await Exercise.findOne({ owner: req.user._id, _id });
        res.json(exercise);
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
