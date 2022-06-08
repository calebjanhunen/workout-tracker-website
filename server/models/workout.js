import mongoose from "mongoose";

const workoutSchema = mongoose.Schema({
    name: String,
    exercises: [
        {
            exerciseName: String,
            exerciseInfo: [
                {
                    set: Number,
                    reps: Number,
                    weight: Number,
                },
            ],
        },
    ],
});

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;
