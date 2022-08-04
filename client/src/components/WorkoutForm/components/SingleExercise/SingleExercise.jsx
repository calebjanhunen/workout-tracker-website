import { Delete, Reorder } from '@mui/icons-material';
import React from 'react';

import './SingleExercise.css';

import { useGetExerciseByIdQuery } from 'redux/features/exercisesApiSlice';
import { capatalizeFirstLetter } from 'utils/functions/capatalizeFirstLetter';
import SetInput from '../SetInput/SetInput';

const SingleExercise = ({
    exercise,
    setExerciseForm,
    reorder,
    templateOrWorkout,
    setExerciseIdChanged,
}) => {
    const { data: exerciseDB } = useGetExerciseByIdQuery(exercise._id);

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
        setExerciseIdChanged(exercise._id);
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

    let exerciseDisplay;
    if (reorder) {
        exerciseDisplay = (
            <>
                <div className="single-exercise__header">
                    <Reorder />
                    <p>{capatalizeFirstLetter(exercise.name)}</p>
                </div>
            </>
        );
    } else {
        exerciseDisplay = (
            <>
                <div className="single-exercise__header">
                    <p>{capatalizeFirstLetter(exercise.name)}</p>
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
                                    <SetInput
                                        inputType="weight"
                                        exercise={exerciseDB}
                                        set={set}
                                        index={index}
                                        setExerciseForm={setExerciseForm}
                                        templateOrWorkout={templateOrWorkout}
                                    />
                                </td>
                                <td className="set-table__reps">
                                    <SetInput
                                        inputType="reps"
                                        exercise={exerciseDB}
                                        set={set}
                                        index={index}
                                        setExerciseForm={setExerciseForm}
                                        templateOrWorkout={templateOrWorkout}
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
