import React from "react";
import { nanoid } from "nanoid";

import "./WorkoutFormStyles.css";
import ExerciseModal from "../ExerciseModal/ExerciseModal";
import SetForm from "../SetForm/SetForm";
import { useCreateWorkoutMutation } from "../../../../redux/features/api/workoutTrackerApi";

const WorkoutForm = ({ setShowWorkoutForm, setIsSubmitted, setIsLoading }) => {
    const [workoutName, setWorkoutName] = React.useState("");
    const [exerciseName, setExerciseName] = React.useState("");
    const [exerciseForm, setExerciseForm] = React.useState([]);
    const [exerciseInfo, setExerciseInfo] = React.useState([]);
    const [exerInfoComponents, setExInfoComponents] = React.useState([]);
    const [showExerciseModal, setShowExerciseModal] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [exerToEdit, setExerToEdit] = React.useState({});

    const [createWorkout] = useCreateWorkoutMutation();

    function closeWorkoutForm() {
        setWorkoutName("");
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

    async function handleSubmit() {
        if (workoutName === "") return console.log("Enter workout name");

        setIsLoading(true);
        await createWorkout({ name: workoutName, exercises: exerciseForm });
        setIsLoading(false);

        closeWorkoutForm();
        setIsSubmitted(true);
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
            <div id="form" className={showExerciseModal ? "is-blurred" : ""}>
                <input
                    id="workout-form__name"
                    name="workoutName"
                    type="text"
                    placeholder="Enter Workout Name..."
                    onChange={e => setWorkoutName(e.target.value)}
                />
                {exerciseForm && displayExercises()}

                <button
                    onClick={e => {
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
