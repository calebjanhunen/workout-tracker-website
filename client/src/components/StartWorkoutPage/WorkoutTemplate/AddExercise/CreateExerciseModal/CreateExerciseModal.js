import React from "react";

import "./CreateExerciseModalStyles.css";
import {
    useCreateExerciseMutation,
    useGetExercisesQuery,
} from "../../../../../redux/features/api/workoutTrackerApi.js";

const CreateExerciseModal = ({ setShowModal }) => {
    const [exerciseName, setExerciseName] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [showInvalidInput, setShowInvalidInput] = React.useState(false);
    const [invalidInputReason, setInvalidInputReason] = React.useState("");
    const [createWorkout] = useCreateExerciseMutation();
    const { data: exercises } = useGetExercisesQuery();

    async function handleAddExercise() {
        if (!exerciseName) {
            setInvalidInputReason("Enter Exercise Name");
            return setShowInvalidInput(true);
        }

        //Checks if exercise already exists in database
        const exerciseAlreadyExists = exercises.filter(
            exercise =>
                exercise.name.toLowerCase() === exerciseName.toLowerCase()
        );

        console.log(exerciseAlreadyExists);

        if (exerciseAlreadyExists.length > 0) {
            setInvalidInputReason("Exercise Already Exists");
            return setShowInvalidInput(true);
        }

        setIsLoading(true);
        await createWorkout({ name: exerciseName });
        setIsLoading(false);

        setShowModal(false);
    }

    return (
        <div className="create-exercise-modal__background">
            <div className="create-exercise-modal__container">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="create-exercise-modal__close-btn">
                            <button onClick={() => setShowModal(false)}>
                                X
                            </button>
                        </div>
                        <div className="create-exercise-modal__content">
                            <h1>Create Exercise</h1>
                            <input
                                id="exercise-name"
                                className={
                                    showInvalidInput ? "text-input-error" : ""
                                }
                                name="create-exercise__exercise-name"
                                placeholder="Exercise name"
                                onChange={e => setExerciseName(e.target.value)}
                            />
                            <p
                                className={`invalid-input ${
                                    !showInvalidInput ? "hidden" : ""
                                }`}
                            >
                                {invalidInputReason}
                            </p>
                            <div className="create-exercise-modal__footer">
                                <button onClick={handleAddExercise}>
                                    Add to Workout
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CreateExerciseModal;
