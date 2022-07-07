import mongoose from "mongoose";

const workoutSchema = mongoose.Schema({
    name: String,
    createdAt: {
        type: Date,
    },
    exercises: [
        {
            name: String,
            _id: mongoose.Schema.Types.ObjectId,
            sets: [
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
