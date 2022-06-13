import React from "react";
import { nanoid } from "nanoid";

import "./ExerciseModalStyles.css";
import SetForm from "../SetForm/SetForm";
const ExerciseModal = ({
    showExerciseModal,
    setShowExerciseModal,
    setExerciseForm,
    isEdit,
    exerToEdit,
    setIsEdit,
}) => {
    const [exerciseInfo, setExerciseInfo] = React.useState([]);
    const [exerciseName, setExerciseName] = React.useState("");
    const [exerInfoComponents, setExInfoComponents] = React.useState([]);

    if (showExerciseModal === false) return null;

    function addSet() {
        const id = nanoid();
        setExerciseInfo([...exerciseInfo, { reps: "", weight: "", id }]);

        setExInfoComponents([
            ...exerInfoComponents,
            <SetForm
                key={nanoid()}
                id={id}
                setExerciseInfo={setExerciseInfo}
            />,
        ]);
    }

    function removeSet(id) {
        setExerciseInfo(exerciseInfo.filter(eachSet => eachSet.id !== id));
        setExInfoComponents(
            exerInfoComponents.filter(comp => comp.props.id !== id)
        );
    }

    function clearExerciseModal() {
        setExerciseInfo([]);
        setExInfoComponents([]);
        setShowExerciseModal(prev => !prev);
    }

    function submitExercise() {
        setExerciseForm(prev => {
            return [...prev, { exerciseName, exerciseInfo, id: nanoid() }];
        });
        clearExerciseModal();
    }

    // console.log(exerciseInfo);
    return (
        <div className="exercise-modal">
            <div className="exercise-modal__content">
                <div className="exercise-modal__header">
                    <form id="exercise-form">
                        <input
                            type="text"
                            required
                            name="exerciseName"
                            placeholder="Enter Exercise Name..."
                            // autoComplete="off"
                            onChange={e => setExerciseName(e.target.value)}
                        />
                    </form>
                    <button onClick={clearExerciseModal}>X</button>
                </div>

                <div className="exercise-modal__body">
                    {exerInfoComponents &&
                        exerInfoComponents.map((info, index) => (
                            <div key={index} className="exercise-modal__info">
                                <h1>Set {index + 1}</h1>
                                {info}
                                <button
                                    onClick={() => removeSet(info.props.id)}
                                >
                                    Remove Set
                                </button>
                            </div>
                        ))}
                    <button onClick={addSet}>Add Set</button>
                </div>
                <div className="exercise-modal__footer">
                    <button form="exercise-form" onClick={submitExercise}>
                        Submit Exercise
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExerciseModal;
