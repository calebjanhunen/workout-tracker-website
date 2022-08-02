import React, { useState } from 'react';

import { Typography } from '@material-ui/core';
import styles from './ExerciseList.module.css';

import { useFetchExercises } from 'hooks/useFetchExercises';
import { useEffect } from 'react';
import { useLazyGetExercisesByQueryQuery } from 'redux/features/exercisesApiSlice';

const ExerciseList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [pageNum, setPageNum] = useState(1);
    const [bodyPart, setBodyPart] = useState('all-body-parts');

    const { exercises, isLoading, isError, hasMore } = useFetchExercises(
        pageNum,
        bodyPart,
        searchQuery
    );
    console.log(exercises);
    return (
        <div className={styles.exerciseListContainer}>
            <Typography variant="h4">Exercises</Typography>

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
            {/* <div className={styles.exerciseListBody}>
                {exercises.map(exercise => (
                    <p key={exercise._id}>{exercise.name}</p>
                ))}
            </div> */}
        </div>
    );
};

export default ExerciseList;
