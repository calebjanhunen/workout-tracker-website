import React from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";

import "./WorkoutFormStyles.css";
import ExerciseModal from "../ExerciseModal/ExerciseModal";
import { createWorkout } from "../../../actions/workoutActions.js";
import SetForm from "../SetForm/SetForm";

const WorkoutForm = ({ setShowWorkoutForm }) => {
    const dispatch = useDispatch();
    const [workoutName, setWorkoutName] = React.useState("");
    const [exerciseForm, setExerciseForm] = React.useState([]);
    const [exerciseInfo, setExerciseInfo] = React.useState([]);
    const [exerciseName, setExerciseName] = React.useState("");
    const [exerInfoComponents, setExInfoComponents] = React.useState([]);
    const [workoutForm, setWorkoutForm] = React.useState({
        name: "",
        exercises: [],
    });
    const [showExerciseModal, setShowExerciseModal] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [exerToEdit, setExerToEdit] = React.useState({});

    function closeWorkoutForm() {
        setWorkoutName("");
        setWorkoutForm({});
        setExerciseForm([]);
        setShowWorkoutForm(false);
    }

    function displayExerciseModal(exercise = undefined) {
        setShowExerciseModal(prev => !prev);
        setExerToEdit(exercise);
        if (exercise) {
            setIsEdit(true);
            setExerciseName(exercise.exerciseName);
            setExerciseInfo(exercise.exerciseInfo);
            setExInfoComponents(
                exercise.exerciseInfo.map(info => {
                    return (
                        <SetForm
                            key={nanoid()}
                            id={info.id}
                            setExerciseInfo={setExerciseInfo}
                            defaultRepsVal={info.reps}
                            defaultWeightVal={info.weight}
                        />
                    );
                })
            );
        } else {
            setIsEdit(false);
        }
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

        dispatch(
            createWorkout({
                name: workoutName,
                exercises: exerciseForm,
            })
        );
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
            <button onClick={closeWorkoutForm} className="close-workout-btn">
                X
            </button>
            <ExerciseModal
                showExerciseModal={showExerciseModal}
                setShowExerciseModal={setShowExerciseModal}
                setExerciseForm={setExerciseForm}
                isEdit={isEdit}
                exerToEdit={exerToEdit}
                exerciseInfo={exerciseInfo}
                setExerciseInfo={setExerciseInfo}
                exerciseName={exerciseName}
                setExerciseName={setExerciseName}
                exerInfoComponents={exerInfoComponents}
                setExInfoComponents={setExInfoComponents}
            />
        </div>
    );
};

export default WorkoutForm;