import React from 'react';

const SetInput = ({
    inputType,
    exercise,
    set,
    index,
    setExerciseForm,
    templateOrWorkout,
}) => {
    function handleChangeSet(e, type, index) {
        setExerciseForm(prev =>
            prev.map(prevExercise =>
                prevExercise._id === exercise._id
                    ? {
                          ...prevExercise,
                          sets: prevExercise.sets.map((set, setIndex) =>
                              setIndex === index
                                  ? type === 'weight'
                                      ? { ...set, weight: e.target.value }
                                      : { ...set, reps: e.target.value }
                                  : set
                          ),
                      }
                    : prevExercise
            )
        );
    }

    return (
        <input
            maxLength={7}
            type="number"
            defaultValue={set.inputType || ''}
            onChange={e => handleChangeSet(e, inputType, index)}
            disabled={templateOrWorkout === 'template' ? true : false}
            placeholder={
                templateOrWorkout === 'workout'
                    ? exercise.previousSets[index]?.weight
                    : ''
            }
        />
    );
};

export default SetInput;
