import Exercise from '../models/exercises.js';

export async function createExercise(req, res) {
    const { name, bodyPart } = req.body;
    try {
        const newExercise = await Exercise.create({
            name: name.toLowerCase(),
            bodyPart,
            owner: req.user._id,
        });

        res.json(newExercise);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

export async function getExercises(req, res) {
    let filter = { owner: req.user._id };
    if (req.query.bodyPart !== 'all-body-parts' && req.query.bodyPart)
        filter.bodyPart = req.query.bodyPart;

    try {
        const exercises = await Exercise.find(filter).sort({
            name: 1,
        }); //sort by name (alphabetical order));

        res.json(exercises);
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

export async function updateExercise(req, res) {
    const sets = req.body;
    const { id } = req.params;
    try {
        const exercise = await Exercise.findById(id);

        exercise.previousSets = sets;
        await exercise.save();

        // const updatedExercise =await Exercise.findByIdAndUpdate(id, {})
        res.sendStatus(200);
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
