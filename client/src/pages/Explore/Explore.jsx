import React from 'react';

import styles from './Explore.module.css';

import { useGetWorkoutsQuery } from 'redux/features/workoutsApiSlice';
import WorkoutCard from './components/WorkoutCard/WorkoutCard';

//Explore Page Ideas:
//  - A feed with shared workouts from other users ✓
//  - Ability to save other users workouts as templates
//  - Ability to like user's workouts ✓
//  - Ability to comment? ✓

const Explore = () => {
    const {
        data: sharedWorkouts,
        isLoading,
        isSuccess,
        isError,
    } = useGetWorkoutsQuery(true);

    let workoutFeedDisplay;
    if (isLoading) {
        workoutFeedDisplay = <p>Loading...</p>;
    } else if (isSuccess) {
        workoutFeedDisplay = sharedWorkouts.map(workout => (
            <WorkoutCard key={workout._id} workoutInfo={workout} />
        ));
    } else if (isError) {
        workoutFeedDisplay = <p>Error!</p>;
    }

    return (
        <div className={styles.explorePageContainer}>
            <div className={styles.workoutFeedContainer}>
                {workoutFeedDisplay}
            </div>
        </div>
    );
};

export default Explore;
