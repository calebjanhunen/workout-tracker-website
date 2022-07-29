import React from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import styles from "./WorkoutHistory.module.css";

import { useGetWorkoutsQuery } from "redux/features/workoutsApiSlice";
import WorkoutCard from "./components/WorkoutCard/WorkoutCard";
import {
    Box,
    CircularProgress,
    Container,
    Card,
    Typography,
} from "@material-ui/core";

//TODO: display loading spinner when submiting an edit
const ViewWorkoutsPage = () => {
    const {
        data: workouts,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetWorkoutsQuery();

    //TODO: - Create modal for editing workouts
    //      - Create workout cards
    //      - Use material UI components for styling
    //      - Add other things on workout history page? (in the future)
    //          - Calendar (Click on dates to show workout from that date)
    //          - Workout history analityics (Personal bests for diff exercises, trends on exercise improvements...)

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
                <Typography variant="h4">Workout History</Typography>
                {displayContent}
            </Box>
        </Container>
    );
};

export default ViewWorkoutsPage;
