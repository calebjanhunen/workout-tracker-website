import mongoose from "mongoose";

const workoutTemplateSchema = mongoose.Schema({
    workoutName: {
        type: String,
        required: true,
    },
    exercises: [
        {
            name: String,
            numSets: Number,
            _id: mongoose.Schema.Types.ObjectId,
        },
    ],
});

const WorkoutTemplate = mongoose.model(
    "WorkoutTemplate",
    workoutTemplateSchema
);

export default WorkoutTemplate;
