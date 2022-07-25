import mongoose from "mongoose";

const workoutSchema = mongoose.Schema({
    name: String,
    owner: mongoose.Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        default: Date.now,
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
