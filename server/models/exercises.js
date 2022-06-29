import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;
