import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";

import LoadingSpinner from "../../images/Spinner-1s-200px.gif";
import "react-calendar/dist/Calendar.css";
import "./WorkoutHistoryStyles.css";
import { getWorkouts } from "../../redux/actions/workoutActions.js";
import WorkoutCard from "./WorkoutCard/WorkoutCard";

const ViewWorkoutsPage = () => {
    const dispatch = useDispatch();
    const workouts = useSelector(state => state.workoutReducer);
    const [reload, setReload] = React.useState(false);

    React.useEffect(() => {
        dispatch(getWorkouts());
    }, [dispatch, reload]);

    //TODO: Add calednar functionality
    return (
        <div className="workout-history-page">
            <h1 style={{ margin: "20px" }}>Workout History</h1>
            <div className="workout-history-page__info">
                <div className="workout-history-page__cards">
                    {workouts.length === 0 ? (
                        <div className="loading-spinner-container">
                            <img
                                className="loading-spinner"
                                src={LoadingSpinner}
                                alt="Loading Spinner"
                            />
                        </div>
                    ) : (
                        workouts.map((workout, index) => (
                            <div className="workout-cards" key={index}>
                                <WorkoutCard
                                    title={workout.name}
                                    date={workout.createdAt}
                                    exercises={workout.exercises}
                                    id={workout._id}
                                    setReload={setReload}
                                />
                            </div>
                        ))
                    )}
                </div>
                <Calendar className="react-calendar" />
            </div>
        </div>
    );
};

export default ViewWorkoutsPage;
