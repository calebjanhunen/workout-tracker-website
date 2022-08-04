import { Button, IconButton } from '@material-ui/core';
import { Add } from '@mui/icons-material';
import React from 'react';
import { capatalizeFirstLetter } from 'utils/functions/capatalizeFirstLetter';

import styles from './SingleExercise.module.css';

const SingleExercise = ({ exercise, exerciseForm, setExerciseForm }) => {
    function handleAddExercise() {
        let alreadyExistingExercise = [];
        if (exerciseForm)
            alreadyExistingExercise = exerciseForm.filter(
                exerciseInForm => exerciseInForm._id === exercise._id
            );

        if (alreadyExistingExercise.length === 0)
            if (exerciseForm) {
                setExerciseForm(prev => [
                    ...prev,
                    {
                        name: exercise.name,
                        _id: exercise._id,
                        sets: [
                            {
                                weight: null,
                                reps: null,
                            },
                        ],
                    },
                ]);
            } else {
                setExerciseForm([
                    {
                        name: exercise.name,
                        _id: exercise._id,
                        sets: [
                            {
                                weight: null,
                                reps: null,
                            },
                        ],
                    },
                ]);
            }
    }

    return (
        <div className={styles.singleExerciseContainer}>
            <h3>{capatalizeFirstLetter(exercise.name)}</h3>
            <IconButton component="button" onClick={handleAddExercise}>
                <Add />
            </IconButton>
        </div>
    );
};

export default SingleExercise;
