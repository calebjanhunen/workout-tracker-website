import React from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import styles from "./WorkoutHistory.module.css";

import { useGetWorkoutsQuery } from "redux/features/workoutsApiSlice";
import WorkoutCard from "./components/WorkoutCard/WorkoutCard";
import { Box, CircularProgress, Container, Card } from "@material-ui/core";

//TODO: display loading spinner when submiting an edit
const ViewWorkoutsPage = () => {
    const {
        data: workouts,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetWorkoutsQuery();

    let displayContent;
    if (isLoading) {
        displayContent = (
            <Box className={styles.loadingContainer}>
                <CircularProgress />
            </Box>
        );
    } else if (isSuccess) {
        displayContent = workouts.map(workout => (
            <WorkoutCard key={workout._id} workoutInfo={workout} />
        ));
    } else if (isError) {
        displayContent = <p>{error}</p>;
    }

    return (
        <Container maxWidth="xl">
            <Box component="div" className={styles.workoutCards}>
                {displayContent}
            </Box>
        </Container>
    );
    // return (
    //     <div className="workout-history-page">
    //         <h1 className="workout-history-page__title">Workout History</h1>
    //         <div className="workout-history-page__info">
    //             <div className="workout-history-page__cards">
    //                 {displayContent}
    //             </div>
    //             {/* <Calendar className="react-calendar" /> */}
    //         </div>
    //     </div>
    // );
};

export default ViewWorkoutsPage;
