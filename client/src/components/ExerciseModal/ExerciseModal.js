import React from "react";
import { nanoid } from "nanoid";

import "./ExerciseModalStyles.css";
import SetForm from "../ExerciseForm/SetForm/SetForm";

const ExerciseModal = ({
    showExerciseModal,
    setShowExerciseModal,
    setWorkoutForm,
}) => {
    const [exerciseInfo, setExerciseInfo] = React.useState([]);
    const [exerciseName, setExerciseName] = React.useState("");
    const [exerInfoComponents, setExInfoComponents] = React.useState([]);

    if (showExerciseModal === false) return null;

    function addSet() {
        setExerciseInfo([...exerciseInfo, { reps: "", weight: "" }]);

        setExInfoComponents([
            ...exerInfoComponents,
            <SetForm key={nanoid()} setExerciseInfo={setExerciseInfo} />,
        ]);
    }

    console.log(exerciseInfo);
    return (
        <div className="exercise-modal">
            <div className="exercise-modal__content">
                <div className="exercise-modal__header">
                    <input
                        type="text"
                        name="exerciseName"
                        placeholder="Enter Exercise Name..."
                        // autoComplete="off"
                        onChange={e => setExerciseName(e.target.value)}
                    />
                </div>

                <div className="exercise-modal__body">
                    {exerInfoComponents &&
                        exerInfoComponents.map((info, index) => (
                            <div key={index} className="exercise-modal__info">
                                <h1>Set {index + 1}</h1>
                                {info}
                            </div>
                        ))}
                    <button onClick={addSet}>Add Set</button>
                    <form className="exercise-modal__form"></form>
                </div>
                <div className="exercise-modal__footer">
                    <button
                        onClick={() => {
                            setShowExerciseModal(prev => !prev);
                            setWorkoutForm(prev => {
                                return {
                                    ...prev,
                                    [exerciseName]: exerciseInfo,
                                };
                            });
                        }}
                    >
                        Submit Exercise
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExerciseModal;
