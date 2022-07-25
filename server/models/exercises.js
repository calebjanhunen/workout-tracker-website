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
    owner: mongoose.Schema.Types.ObjectId,
    previousSets: [
        {
            weight: Number,
            reps: Number,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;
