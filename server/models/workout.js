import mongoose from 'mongoose';

const workoutSchema = mongoose.Schema({
    name: String,
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
    owner: mongoose.Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    public: {
        type: Boolean,
        default: false,
    },
    likeCount: {
        type: Number,
        default: 0,
    },
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;
