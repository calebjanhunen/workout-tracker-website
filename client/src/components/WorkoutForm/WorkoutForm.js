import React from "react";
import { nanoid } from "nanoid";

import "./WorkoutFormStyles.css";
import ExerciseForm from "../ExerciseForm/ExerciseForm";
import ExerciseModal from "../ExerciseModal/ExerciseModal";

const WorkoutForm = () => {
    const [exerciseComponents, setExerciseComponents] = React.useState([]);
    const [workoutForm, setWorkoutForm] = React.useState({ name: "" });
    const [numExercises, setNumExercises] = React.useState(0);
    const [showExerciseModal, setShowExerciseModal] = React.useState(false);

    function addExercise() {
        setShowExerciseModal(prev => !prev);
        // setNumExercises(prev => prev + 1);
        // setWorkoutForm({
        //     ...workoutForm,
        //     [`exercise${numExercises}`]: { name: "" },
        // });
        // setExerciseComponents([
        //     ...exerciseComponents,
        //     <ExerciseForm
        //         key={nanoid()}
        //         // workoutForm={workoutForm}
        //         setWorkoutForm={setWorkoutForm}
        //         exerciseNum={numExercises}
        //     />,
        // ]);
    }

    // console.log(workoutForm);

    function removeExercise(e, exercise) {
        e.preventDefault();
        // console.log(exercise);
        setExerciseComponents(prevComp => {
            const index = prevComp.indexOf(exercise);
            const before = prevComp.slice(0, index);
            const after = prevComp.slice(index + 1);
            return before.concat(after);
        });
        setWorkoutForm(prevForm => {
            const tempForm = prevForm;
            const exerciseToDelete = `exercise${exercise.props.exerciseNum}`;
            console.log(exerciseToDelete);
            delete tempForm[exerciseToDelete];
            return tempForm;
        });
    }

    // console.log(exerciseComponents);
    // console.log(workoutForm);
    return (
        <div className="App">
            <div id="form">
                <form id="workout-form">
                    <input
                        id="txt--workout-name"
                        name="workoutName"
                        type="text"
                        placeholder="Workout Name"
                        onChange={e =>
                            setWorkoutForm({
                                ...workoutForm,
                                name: e.target.value,
                            })
                        }
                    />
                    {/* {exerciseComponents &&
                    exerciseComponents.map(comp => (
                        <div key={nanoid()} className="exercise-input">
                            {comp}
                            <button
                                id="btn--remove-exercise"
                                onClick={e => removeExercise(e, comp)}
                            >
                                Remove Exercise
                            </button>
                        </div>
                    ))} */}
                </form>
                <button onClick={addExercise}>Add Exercise</button>
                <button onClick={() => {}}>Submit Workout</button>
            </div>
            <ExerciseModal
                showExerciseModal={showExerciseModal}
                setShowExerciseModal={setShowExerciseModal}
                setWorkoutForm={setWorkoutForm}
            />
        </div>
    );
};

export default WorkoutForm;
