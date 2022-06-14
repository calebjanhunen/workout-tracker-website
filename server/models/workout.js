import mongoose from "mongoose";

const workoutSchema = mongoose.Schema({
    name: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    exercises: [
        {
            exerciseName: String,
            exerciseInfo: [
                {
                    reps: Number,
                    weight: Number,
                },
            ],
        },
    ],
});

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;
