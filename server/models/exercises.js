import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    bodyPart: {
        type: String,
        required: true,
    },
    previousSets: [
        {
            weight: Number,
            reps: Number,
        },
    ],
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;
