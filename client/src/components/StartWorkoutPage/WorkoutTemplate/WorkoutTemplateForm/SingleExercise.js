import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import "./FormStyles.css";

const SingleExercise = ({ exercise, setExerciseForm }) => {
    const [numSets, setNumSets] = React.useState(1);

    // const setsDisplay =

    function handleDeleteExercise() {
        setExerciseForm(prev =>
            prev.filter(prevExercise => prevExercise._id !== exercise._id)
        );
    }

    return (
        <div className="single-exercise">
            <div className="single-exercise__header">
                <p>{exercise.name}</p>
                <button
                    onClick={handleDeleteExercise}
                    className="delete-exercise__btn"
                >
                    <FontAwesomeIcon
                        className="delete-exercise-icon"
                        icon={faTrashAlt}
                    />
                </button>
            </div>
            <button>Add Set</button>
        </div>
    );
};

export default SingleExercise;
