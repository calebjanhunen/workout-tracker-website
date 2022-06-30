import React from "react";
import moment from "moment";

import TrashBinImage from "../../../../images/trash-bin.png";
import "./EditWorkoutFormStyles.css";
import { useUpdateWorkoutMutation } from "../../../../redux/features/api/workoutTrackerApi";
import DeleteWorkoutModal from "./DeleteWorkoutModal";

const EditWorkoutForm = ({
    workoutInfo,
    setShowEditForm,
    setChangedWorkoutId,
    setIsUpdating,
}) => {
    const [workoutName, setWorkoutName] = React.useState(workoutInfo.name);
    const [exerciseForm, setExerciseForm] = React.useState(
        workoutInfo.exercises
    );
    const [showDeleteWorkout, setShowDeleteWorkout] = React.useState(false);

    const [updateWorkout] = useUpdateWorkoutMutation();

    function getExercise(exerciseId) {
        return exerciseForm.filter(exercise => exercise._id === exerciseId);
    }

    function changeExerciseForm(exerciseId, updatedExercise) {
        setExerciseForm(prev =>
            prev.map(exercise =>
                exercise._id === exerciseId ? updatedExercise : exercise
            )
        );
    }

    function handleEditSetValue(e, exerciseId, setIndex, type) {
        const exercise = getExercise(exerciseId);

        const setToEdit = exercise[0].exerciseInfo.filter(
            (_, index) => index === setIndex
        );

        const updatedSet =
            type === "reps"
                ? { ...setToEdit[0], reps: Number(e.target.value) }
                : { ...setToEdit[0], weight: Number(e.target.value) };

        const updatedExercise = {
            ...exercise[0],
            exerciseInfo: exercise[0].exerciseInfo.map((set, index) =>
                index === setIndex ? updatedSet : set
            ),
        };

        changeExerciseForm(updatedExercise._id, updatedExercise);
    }

    function handleAddSet(exerciseId) {
        const exercise = getExercise(exerciseId);

        const updatedExercise = {
            exerciseName: exercise[0].exerciseName,
            exerciseInfo: [
                ...exercise[0].exerciseInfo,
                { reps: "", weight: "" },
            ],
            _id: exercise[0]._id,
        };

        setExerciseForm(prev =>
            prev.map(exercise =>
                exercise._id === exerciseId ? updatedExercise : exercise
            )
        );
    }

    function handleDeleteSet(e, exerciseId, setIndex) {
        e.target.parentElement.classList.add("fade-out-effect");
        setTimeout(() => {
            const exercise = getExercise(exerciseId);

            const updatedExercise = {
                exerciseName: exercise[0].exerciseName,
                exerciseInfo: exercise[0].exerciseInfo.filter(
                    (_, index) => index !== setIndex
                ),
                _id: exercise[0]._id,
            };

            changeExerciseForm(exerciseId, updatedExercise);
            e.target.parentElement.classList.remove("fade-out-effect");
        }, 300);
    }

    function handleAddExercise() {
        setExerciseForm(prev => [
            ...prev,
            { exerciseName: "", exerciseInfo: [{ reps: "", weight: "" }] },
        ]);
    }

    function handleDeleteExercise(e, exerciseIndex) {
        e.target.parentElement.classList.add("fade-out-effect");
        setTimeout(() => {
            setExerciseForm(prev =>
                prev.filter((_, index) => index !== exerciseIndex)
            );
            e.target.parentElement.classList.remove("fade-out-effect");
        }, 300);
    }

    function handleEditExerciseName(e, exerciseIndex) {
        setExerciseForm(prev =>
            prev.map((exercise, index) =>
                index === exerciseIndex
                    ? { ...exercise, exerciseName: e.target.value }
                    : exercise
            )
        );
    }

    async function handleSubmit() {
        let isInvalidSetInput = false;
        let isInvalidExerciseName = false;
        exerciseForm.forEach(exercise => {
            if (exercise.exerciseName === "") isInvalidExerciseName = true;
            exercise.exerciseInfo.forEach(set => {
                if (set.reps === "" || set.weight === "") {
                    isInvalidSetInput = true;
                }
            });
        });

        if (isInvalidSetInput) return console.log("Enter set or weight value");
        if (isInvalidExerciseName) return console.log("Enter exercise name");

        setIsUpdating(true);

        await updateWorkout({
            name: workoutName,
            exercises: exerciseForm,
            _id: workoutInfo._id,
            createdAt: workoutInfo.createdAt,
        });
        setIsUpdating(false);

        setChangedWorkoutId(workoutInfo._id);
        setShowEditForm(false);
    }

    function displayWorkoutInfo() {
        return (
            <div className="workout-card__more-info">
                {exerciseForm.map((exercise, exerciseIndex) => (
                    <div key={exerciseIndex} className="exercise">
                        <input
                            name="edit-form__exercise-name"
                            placeholder="Enter Exercise Name..."
                            value={exercise.exerciseName}
                            onChange={e =>
                                handleEditExerciseName(e, exerciseIndex)
                            }
                        />
                        {exercise.exerciseInfo.map((info, setIndex) => (
                            <div
                                key={setIndex}
                                className="edit-form-exercise-info visible"
                            >
                                <p className="edit-form-exercise-info__set">
                                    Set {setIndex + 1}
                                </p>
                                <input
                                    name="edit-form-exercise-info__weight"
                                    type="text"
                                    inputMode="numeric"
                                    value={info.weight}
                                    onChange={e =>
                                        handleEditSetValue(
                                            e,
                                            exercise._id,
                                            setIndex,
                                            "weight"
                                        )
                                    }
                                />
                                <p>lbs</p>
                                <input
                                    name="edit-form-exercise-info__reps"
                                    type="text"
                                    inputMode="numeric"
                                    value={info.reps}
                                    onChange={e =>
                                        handleEditSetValue(
                                            e,
                                            exercise._id,
                                            setIndex,
                                            "reps"
                                        )
                                    }
                                />
                                <p>reps</p>
                                <button
                                    className="delete-set-btn"
                                    onClick={e => {
                                        handleDeleteSet(
                                            e,
                                            exercise._id,
                                            setIndex
                                        );
                                    }}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                        <button
                            className="add-set-btn"
                            onClick={() => handleAddSet(exercise._id)}
                        >
                            Add Set
                        </button>
                        <button
                            className="delete-exercise-btn"
                            onClick={e =>
                                handleDeleteExercise(e, exerciseIndex)
                            }
                        >
                            Delete Exercise
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="edit-form-workout-card">
            <div className="workout-card__header">
                <input
                    name="edit-form__workoutName"
                    type="text"
                    defaultValue={workoutInfo.name}
                    onChange={e => setWorkoutName(e.target.value)}
                />
                <button className="submit-btn" onClick={handleSubmit}>
                    ✓
                </button>
                {showDeleteWorkout ? (
                    <DeleteWorkoutModal
                        setShowDeleteWorkout={setShowDeleteWorkout}
                        id={workoutInfo._id}
                        setDeletedWorkoutId={setChangedWorkoutId}
                        setIsUpdating={setIsUpdating}
                    />
                ) : (
                    <button
                        className="delete-btn"
                        onClick={() => {
                            setShowDeleteWorkout(prev => !prev);
                        }}
                    >
                        <img
                            src={TrashBinImage}
                            alt="Trash Bin"
                            className="trash-bin-img"
                        ></img>
                    </button>
                )}
            </div>
            <div className="workout-card__time-values">
                <h2 className="time-values__date">
                    {moment(workoutInfo.date).format("MMM DD")}
                </h2>
                <h2 className="time-values__workout-length">Workout Length</h2>
            </div>
            <div className="workout-card__workout-info">
                {displayWorkoutInfo()}
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <button
                    className="add-exercise-btn"
                    onClick={handleAddExercise}
                >
                    Add Exercise
                </button>
            </div>
        </div>
    );
};

export default EditWorkoutForm;
