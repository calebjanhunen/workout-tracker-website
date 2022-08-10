import mongoose from 'mongoose';

const workoutTemplateSchema = mongoose.Schema({
    workoutName: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
});

const WorkoutTemplate = mongoose.model(
    'WorkoutTemplate',
    workoutTemplateSchema
);

export default WorkoutTemplate;
