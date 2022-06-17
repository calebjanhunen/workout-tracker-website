import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";

import { updateWorkout } from "../../../../actions/workoutActions.js";

import "./EditWorkoutFormStyles.css";

const EditWorkoutForm = ({
    title,
    date,
    exercises,
    id,
    setShowEditForm,
    setReload,
}) => {
    const dispatch = useDispatch();
    const [workoutName, setWorkoutName] = React.useState(title);
    const [exerciseForm, setExerciseForm] = React.useState(exercises);

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
        console.log(updatedExercise);
        setExerciseForm(prev =>
            prev.map(exercise =>
                exercise._id === exerciseId ? updatedExercise : exercise
            )
        );
    }

    //TODO: Change it to delete the one actually wanting to delete
    function handleDeleteSet(exerciseId, setId) {
        const exercise = getExercise(exerciseId);

        const updatedExercise = {
            exerciseName: exercise[0].exerciseName,
            exerciseInfo: exercise[0].exerciseInfo.filter(
                set => set._id !== setId
            ),
            _id: exercise[0]._id,
        };
        // console.log(updatedExercise.exerciseInfo);
        changeExerciseForm(exerciseId, updatedExercise);
    }

    function handleSubmit() {
        console.log(exerciseForm);
        dispatch(
            updateWorkout(id, {
                name: workoutName,
                exercises: exerciseForm,
                _id: id,
            })
        );
        setReload(prev => !prev);
        setShowEditForm(false);
    }

    function displayWorkoutInfo() {
        return (
            <div className="workout-card__more-info">
                {exerciseForm.map((exercise, index) => (
                    <div key={index} className="exercise">
                        <h3 className="exercise-name">
                            {exercise.exerciseName}
                        </h3>
                        {exercise.exerciseInfo.map((info, index) => (
                            <div
                                key={index}
                                className="edit-form-exercise-info"
                            >
                                <p className="edit-form-exercise-info__set">
                                    Set {index + 1}
                                </p>
                                <input
                                    name="edit-form-exercise-info__weight"
                                    type="text"
                                    inputMode="numeric"
                                    defaultValue={info.weight}
                                    onChange={e =>
                                        handleEditSetValue(
                                            e,
                                            exercise._id,
                                            index,
                                            "weight"
                                        )
                                    }
                                />
                                <p>lbs</p>
                                <input
                                    name="edit-form-exercise-info__reps"
                                    type="text"
                                    inputMode="numeric"
                                    defaultValue={info.reps}
                                    onChange={e =>
                                        handleEditSetValue(
                                            e,
                                            exercise._id,
                                            index,
                                            "reps"
                                        )
                                    }
                                />
                                <p>reps</p>
                                <button
                                    className="delete-set-btn"
                                    onClick={() =>
                                        handleDeleteSet(exercise._id, info._id)
                                    }
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
                        <button className="delete-exercise-btn">
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
                    defaultValue={title}
                    onChange={e => setWorkoutName(e.target.value)}
                />
                <button className="submit-btn" onClick={handleSubmit}>
                    ✓
                </button>
            </div>
            <div className="workout-card__time-values">
                <h2 className="time-values__date">
                    {moment(date).format("MMM DD")}
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
                <button className="add-exercise-btn">Add Exercise</button>
            </div>
        </div>
    );
};

export default EditWorkoutForm;
