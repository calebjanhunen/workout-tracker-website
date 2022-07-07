import mongoose from "mongoose";

const workoutTemplateSchema = mongoose.Schema({
    workoutName: {
        type: String,
        required: true,
    },
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
});

const WorkoutTemplate = mongoose.model(
    "WorkoutTemplate",
    workoutTemplateSchema
);

export default WorkoutTemplate;
