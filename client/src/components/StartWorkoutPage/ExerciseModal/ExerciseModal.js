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
    exerciseInfo,
    setExerciseInfo,
    exerciseName,
    setExerciseName,
    exerInfoComponents,
    setExInfoComponents,
}) => {
    if (showExerciseModal === false) return null;

    function addSet() {
        const id = nanoid();
        setExerciseInfo([...exerciseInfo, { reps: "", weight: "", id }]);

        setExInfoComponents(prev => {
            return [
                ...prev,
                <SetForm
                    key={nanoid()}
                    id={id}
                    setExerciseInfo={setExerciseInfo}
                />,
            ];
        });
    }

    function removeSet(id) {
        setExerciseInfo(exerciseInfo.filter(eachSet => eachSet.id !== id));
        setExInfoComponents(
            exerInfoComponents.filter(comp => comp.props.id !== id)
        );
    }

    function clearExerciseModal(e) {
        setExerciseInfo([]);
        setExInfoComponents([]);
        setExerciseName("");
        setShowExerciseModal(prev => !prev);
    }

    function submitExercise(e) {
        setExerciseForm(prev => {
            return [...prev, { exerciseName, exerciseInfo, id: nanoid() }];
        });
        clearExerciseModal(e);
    }

    function editExercise(e) {
        setExerciseForm(prev => {
            return prev.map(info => {
                if (info.id === exerToEdit.id) {
                    return {
                        exerciseName,
                        exerciseInfo,
                        id: exerToEdit.id,
                    };
                } else {
                    return info;
                }
            });
        });
        clearExerciseModal(e);
    }

    return (
        <div className="exercise-modal">
            <div className="exercise-modal__content">
                <div className="exercise-modal__header">
                    <input
                        defaultValue={isEdit ? exerToEdit.exerciseName : ""}
                        type="text"
                        required
                        name="exerciseName"
                        placeholder="Enter Exercise Name..."
                        // autoComplete="off"
                        onChange={e => setExerciseName(e.target.value)}
                    />
                    <button onClick={e => clearExerciseModal(e)}>X</button>
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
                    <button
                        onClick={e => {
                            if (!isEdit) submitExercise(e);
                            else editExercise(e);
                        }}
                    >
                        {isEdit ? "Confirm Edit" : "Submit Exercise"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExerciseModal;
