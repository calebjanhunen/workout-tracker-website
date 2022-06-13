import React from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";

import "./WorkoutFormStyles.css";
import ExerciseModal from "../ExerciseModal/ExerciseModal";
import { createWorkout } from "../../../actions/workoutActions.js";

const WorkoutForm = () => {
    const dispatch = useDispatch();
    const [workoutName, setWorkoutName] = React.useState("");
    const [exerciseForm, setExerciseForm] = React.useState([]);
    const [workoutForm, setWorkoutForm] = React.useState({
        name: "",
        exercises: [],
    });
    const [showExerciseModal, setShowExerciseModal] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [exerToEdit, setExerToEdit] = React.useState({});

    function displayExerciseModal(exercise = undefined) {
        setShowExerciseModal(prev => !prev);
        exercise ? setIsEdit(true) : setIsEdit(false);
        setExerToEdit(exercise);
    }

    function deleteExercise(id) {
        setExerciseForm(exerciseForm.filter(exercise => exercise.id !== id));
    }

    function handleSubmit() {
        setWorkoutForm(_ => {
            return {
                name: workoutName,
                exercises: exerciseForm,
            };
        });
        console.log(workoutForm);
        dispatch(createWorkout(workoutForm));
    }

    function displayExercises() {
        const display = exerciseForm.map(exercise => {
            const setRepWeightDisplay = exercise.exerciseInfo.map(
                (info, index) => {
                    return (
                        <div key={index} className="exercise-display-info">
                            <p className="exercise-info__set">
                                Set {index + 1}:
                            </p>
                            <p className="exercise-info__reps">
                                {info.reps} Reps
                            </p>
                            <p className="exercise-info__weight">
                                {info.weight} lbs
                            </p>
                        </div>
                    );
                }
            );

            return (
                <div key={nanoid()} className="exercise-display">
                    <div className="exercise-display__values">
                        <h1>{exercise.exerciseName}</h1>
                        {setRepWeightDisplay}
                    </div>
                    <div className="exercise-display__btns">
                        <button
                            onClick={() => {
                                setIsEdit(true);
                                displayExerciseModal(exercise);
                            }}
                        >
                            Edit Exercise
                        </button>
                        <button onClick={() => deleteExercise(exercise.id)}>
                            Delete Exercise
                        </button>
                    </div>
                </div>
            );
        });

        return display;
    }

    return (
        <div className="App">
            <div id="form">
                <input
                    id="workout-form__name"
                    name="workoutName"
                    type="text"
                    placeholder="Enter Workout Name..."
                    onChange={e => setWorkoutName(e.target.value)}
                />
                {exerciseForm && displayExercises()}

                <button
                    onClick={() => {
                        setIsEdit(false);
                        displayExerciseModal();
                    }}
                >
                    Add Exercise
                </button>
                <button onClick={handleSubmit}>Submit Workout</button>
            </div>
            <ExerciseModal
                showExerciseModal={showExerciseModal}
                setShowExerciseModal={setShowExerciseModal}
                setExerciseForm={setExerciseForm}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                exerToEdit={exerToEdit}
            />
        </div>
    );
};

export default WorkoutForm;
