import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";

import LoadingSpinner from "../../images/Spinner-1s-200px.gif";
import "react-calendar/dist/Calendar.css";
import "./WorkoutHistoryStyles.css";
import { getWorkouts } from "../../redux/actions/workoutActions.js";
import WorkoutCard from "./WorkoutCard/WorkoutCard";
//TODO: display loading spinner when submiting an edit
const ViewWorkoutsPage = () => {
    const dispatch = useDispatch();
    const workouts = useSelector(state => state.workoutReducer);
    const isLoading = useSelector(state => state.loadingReducer);
    const [reload, setReload] = React.useState(false);
    const [changedWorkoutId, setChangedWorkoutId] = React.useState(" ");

    React.useEffect(() => {
        dispatch(getWorkouts());
        console.log(workouts);
    }, [dispatch]);
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
                        workouts.map((workout, index) =>
                            workout._id === changedWorkoutId && isLoading ? (
                                <div
                                    className="dlt-workout-loading-spinner"
                                    key={index}
                                >
                                    <img
                                        className="loading-spinner"
                                        src={LoadingSpinner}
                                        alt="Loading Spinner"
                                    />
                                </div>
                            ) : (
                                <div className="workout-cards" key={index}>
                                    <WorkoutCard
                                        title={workout.name}
                                        date={workout.createdAt}
                                        exercises={workout.exercises}
                                        id={workout._id}
                                        setReload={setReload}
                                        setChangedWorkoutId={
                                            setChangedWorkoutId
                                        }
                                    />
                                </div>
                            )
                        )
                    )}
                </div>
                <Calendar className="react-calendar" />
            </div>
        </div>
    );
};

export default ViewWorkoutsPage;
