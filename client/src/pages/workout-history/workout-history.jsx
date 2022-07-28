import React from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import "./WorkoutHistoryStyles.css";

// import { useGetWorkoutsQuery } from "redux/api/workoutTrackerApi";
import { useGetWorkoutsQuery } from "redux/features/workoutsApiSlice";
import WorkoutCard from "./components/WorkoutCard/WorkoutCard";

//TODO: display loading spinner when submiting an edit
const ViewWorkoutsPage = () => {
    const {
        data: workouts,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetWorkoutsQuery();

    // let displayContent;
    // if (isLoading) {
    //     displayContent = <p>Loading...</p>;
    // } else if (isSuccess) {
    //     displayContent = workouts.map(workout => (
    //         <WorkoutCard key={workout._id} workoutInfo={workout} />
    //     ));
    // } else if (isError) {
    //     displayContent = <p>{error}</p>;
    // }
    console.log(workouts);

    return <div>WOrkout History</div>;
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
