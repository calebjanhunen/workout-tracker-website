import Workout from '../models/workout.js';

export async function createWorkout(req, res) {
    const { name, exercises } = req.body;

    try {
        const newWorkout = await Workout.create({
            name,
            owner: req.user._id,
            exercises,
        });

        res.status(201).json(newWorkout);
    } catch (err) {
        res.status(400).json({ message: 'Could not create workout' });
    }
}

export async function getWorkouts(req, res) {
    try {
        const data = await Workout.find({ owner: req.user._id }).sort({
            createdAt: -1,
        });
        res.json(data);
    } catch (err) {
        res.status(400).json({ message: 'Could not get workouts' });
    }
}

export async function deleteWorkout(req, res) {
    const _id = req.params.id;
    try {
        const workoutToDelete = await Workout.findByIdAndDelete(_id);
        res.json(workoutToDelete);
    } catch (err) {
        res.status(400).json({ message: 'Could not delete workout' });
    }
}

export async function updateWorkout(req, res) {
    const _id = req.params.id;
    // console.log(req.body);
    // console.log(mongoose.isValidObjectId(req.body.exercises[0].exerciseInfo[0]));
    try {
        const workoutToUpdate = await Workout.findByIdAndUpdate(_id, {
            ...req.body,
        });
        res.json(workoutToUpdate);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}
