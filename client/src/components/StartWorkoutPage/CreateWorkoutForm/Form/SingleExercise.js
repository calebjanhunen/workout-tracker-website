import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faBars } from "@fortawesome/free-solid-svg-icons";

const SingleExercise = ({ exercise, setExerciseForm, reorder }) => {
    const [setArr, setSetArr] = React.useState([1]);
    const [numSets, setNumSets] = React.useState(1);

    function handleDeleteExercise() {
        setExerciseForm(prev =>
            prev.filter(prevExercise => prevExercise._id !== exercise._id)
        );
    }

    function handleDeleteSet(set) {
        setNumSets(prev => prev - 1);
        setSetArr(prev => prev.slice(0, prev.length - 1));
        setExerciseForm(prev =>
            prev.map(prevExercise =>
                prevExercise._id === exercise._id
                    ? { ...prevExercise, numSets: numSets - 1 }
                    : prevExercise
            )
        );
    }

    function handleAddSet() {
        setNumSets(prev => prev + 1);
        setSetArr(prev => [...prev, numSets + 1]);
        setExerciseForm(prev =>
            prev.map(prevExercise =>
                prevExercise._id === exercise._id
                    ? { ...prevExercise, numSets: numSets + 1 }
                    : prevExercise
            )
        );
    }

    let exerciseDisplay;
    if (reorder) {
        exerciseDisplay = (
            <>
                <div className="single-exercise__header">
                    <FontAwesomeIcon className="reorder-icon" icon={faBars} />
                    <p>{exercise.name}</p>
                </div>
            </>
        );
    } else {
        exerciseDisplay = (
            <>
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
                <table className="set-table">
                    <tbody>
                        <tr>
                            <th className="set-table-header__set">Set</th>
                            <th className="set-table-header__weight">lbs</th>
                            <th className="set-table-header__reps">Reps</th>
                        </tr>
                        {setArr.map(set => (
                            <tr key={set} className="single-set-row">
                                <td className="set-table__set">{set}</td>
                                <td className="set-table__weight">
                                    <input
                                        maxLength={7}
                                        type="number"
                                        disabled
                                    />
                                </td>
                                <td className="set-table__reps">
                                    <input
                                        maxLength={7}
                                        type="number"
                                        disabled
                                    />
                                </td>
                                <td className="set-table__delete-set">
                                    <button
                                        onClick={() => handleDeleteSet(set)}
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    className="single-exercise__add-set"
                    onClick={handleAddSet}
                >
                    Add Set
                </button>
            </>
        );
    }

    return <div className="single-exercise">{exerciseDisplay}</div>;
};

export default SingleExercise;
