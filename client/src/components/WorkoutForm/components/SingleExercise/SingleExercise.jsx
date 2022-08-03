import { Delete, Reorder } from '@mui/icons-material';
import React from 'react';

import './SingleExercise.css';

const SingleExercise = ({ exercise, setExerciseForm, reorder }) => {
    // console.log(exercise);

    function handleDeleteExercise() {
        setExerciseForm(prev =>
            prev.filter(prevExercise => prevExercise._id !== exercise._id)
        );
    }

    function handleDeleteSet(index) {
        setExerciseForm(prev =>
            prev.map(prevExercise =>
                prevExercise._id === exercise._id
                    ? {
                          ...prevExercise,
                          sets: prevExercise.sets.filter(
                              (_, setIndex) => setIndex !== index
                          ),
                      }
                    : prevExercise
            )
        );
    }

    function handleAddSet() {
        setExerciseForm(prev =>
            prev.map(prevExercise =>
                prevExercise._id === exercise._id
                    ? {
                          ...prevExercise,
                          sets: [
                              ...prevExercise.sets,
                              { weight: null, reps: null },
                          ],
                      }
                    : prevExercise
            )
        );
    }

    function handleChangeSet(e, type, index) {
        setExerciseForm(prev =>
            prev.map(prevExercise =>
                prevExercise._id === exercise._id
                    ? {
                          ...prevExercise,
                          sets: prevExercise.sets.map((set, setIndex) =>
                              setIndex === index
                                  ? type === 'WEIGHT'
                                      ? { ...set, weight: e.target.value }
                                      : { ...set, reps: e.target.value }
                                  : set
                          ),
                      }
                    : prevExercise
            )
        );
    }

    let exerciseDisplay;
    if (reorder) {
        exerciseDisplay = (
            <>
                <div className="single-exercise__header">
                    <Reorder />
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
                        <Delete />
                    </button>
                </div>
                <table className="set-table">
                    <tbody>
                        <tr>
                            <th className="set-table-header__set">Set</th>
                            <th className="set-table-header__weight">lbs</th>
                            <th className="set-table-header__reps">Reps</th>
                        </tr>
                        {exercise.sets.map((set, index) => (
                            <tr key={index} className="single-set-row">
                                <td className="set-table__set">{index + 1}</td>
                                <td className="set-table__weight">
                                    <input
                                        maxLength={7}
                                        type="number"
                                        value={set.weight || ''}
                                        onChange={e =>
                                            handleChangeSet(e, 'WEIGHT', index)
                                        }
                                    />
                                </td>
                                <td className="set-table__reps">
                                    <input
                                        maxLength={7}
                                        type="number"
                                        value={set.reps || ''}
                                        onChange={e =>
                                            handleChangeSet(e, 'REPS', index)
                                        }
                                    />
                                </td>
                                <td className="set-table__delete-set">
                                    <button
                                        onClick={() => handleDeleteSet(index)}
                                    >
                                        <Delete />
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
