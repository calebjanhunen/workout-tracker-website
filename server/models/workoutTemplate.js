import mongoose from "mongoose";

const workoutTemplateSchema = mongoose.Schema({
    workoutName: {
        type: String,
        required: true,
    },
    owner: mongoose.Schema.Types.ObjectId,
    exercises: [
        {
            name: String,
            _id: mongoose.Schema.Types.ObjectId,
            sets: [
                {
                    weight: Number,
                    reps: Number,
                },
            ],
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const WorkoutTemplate = mongoose.model(
    "WorkoutTemplate",
    workoutTemplateSchema
);

export default WorkoutTemplate;
