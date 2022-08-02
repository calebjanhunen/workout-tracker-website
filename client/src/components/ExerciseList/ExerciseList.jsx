import React, { useState } from 'react';

import { Typography } from '@material-ui/core';
import styles from './ExerciseList.module.css';

import { useGetExercisesByQueryQuery } from 'redux/features/exercisesApiSlice';
import SingleExercise from './components/SingleExercise/SingleExercise';

const ExerciseList = ({ exerciseForm, setExerciseForm }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [pageNum, setPageNum] = useState(1);
    const [bodyPart, setBodyPart] = useState('all-body-parts');
    const {
        data: exercises,
        isLoading,
        isError,
        isSuccess,
    } = useGetExercisesByQueryQuery({ bodyPart });

    let exerciseDisplay;
    if (isLoading) {
        exerciseDisplay = <p>Loading...</p>;
    } else if (isSuccess) {
        let matchingExercises = [...exercises];
        if (searchQuery) {
            matchingExercises = exercises.filter(exercise =>
                exercise.name.includes(searchQuery.toLowerCase())
            );
        }
        exerciseDisplay = matchingExercises.map(exercise => (
            <SingleExercise
                key={exercise._id}
                exercise={exercise}
                exerciseForm={exerciseForm}
                setExerciseForm={setExerciseForm}
            />
        ));
    } else if (isError) {
        exerciseDisplay = <p>Error</p>;
    }

    return (
        <div className={styles.exerciseListContainer}>
            <Typography component="h4" variant="h4">
                Exercises
            </Typography>

            {/*Header*/}
            <div className={styles.exerciseListHeader}>
                <input
                    placeholder="Search for Exercise..."
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <div className={styles.bodyPartFilterContainer}>
                    <label htmlFor="body-part">Filter body part:</label>
                    <select
                        id="body-part"
                        defaultValue="all-body-parts"
                        onChange={e => {
                            setBodyPart(e.target.value);
                        }}
                    >
                        <option value="all-body-parts">All body parts</option>
                        <option>Arms</option>
                        <option>Shoulders</option>
                        <option>Chest</option>
                        <option>Back</option>
                        <option>Core</option>
                        <option>Legs</option>
                    </select>
                </div>
            </div>

            {/*Exercises*/}
            <div className={styles.exerciseListBody}>{exerciseDisplay}</div>
        </div>
    );
};

export default ExerciseList;
