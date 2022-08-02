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
    if (req.query.bodyPart !== 'all-body-parts')
        filter.bodyPart = req.query.bodyPart;

    if (req.query.searchQuery)
        filter.name = { $regex: req.query.searchQuery.toLowerCase() };

    try {
        const exercises = await Exercise.find(filter)
            .limit(20) //limit to 20 items per page
            .skip(20 * (parseInt(req.query.page) - 1)) //skip the limit number * page currently on
            .sort({ name: 1 }); //sort by name (alphabetical order));

        res.json({ num_found: exercises.length, exercises });
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
