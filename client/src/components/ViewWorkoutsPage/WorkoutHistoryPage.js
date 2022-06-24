import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import "./WorkoutHistoryStyles.css";

import {
    selectAllWorkouts,
    getWorkoutsStatus,
    getWorkoutsError,
} from "../../redux/features/workouts/workoutSlice";
import { fetchWorkouts } from "../../redux/features/workouts/workoutActions";
import WorkoutCard from "./WorkoutCard/WorkoutCard";
import LoadingSpinner from "../LoadingSpinner";

//TODO: display loading spinner when submiting an edit
const ViewWorkoutsPage = () => {
    const dispatch = useDispatch();
    const workouts = useSelector(selectAllWorkouts);
    const workoutsStatus = useSelector(getWorkoutsStatus);
    const error = useSelector(getWorkoutsError);

    const isLoading = useSelector(state => state.loadingReducer);
    const [reload, setReload] = React.useState(false);
    const [changedWorkoutId, setChangedWorkoutId] = React.useState(" ");

    React.useEffect(() => {
        dispatch(fetchWorkouts());
    }, [dispatch, reload]);

    let displayContent;
    if (workoutsStatus === "loading") {
        displayContent = (
            <LoadingSpinner className="workout-history__loading-spinner-container" />
        );
    } else if (workoutsStatus === "error") {
        displayContent = <p>{error}</p>;
    } else if (workoutsStatus === "succeeded") {
        displayContent = workouts.map(workout => (
            <WorkoutCard
                key={workout._id}
                workoutInfo={workout}
                setReload={setReload}
                setChangedWorkoutId={setChangedWorkoutId}
            />
        ));
    }

    return (
        <div className="workout-history-page">
            <h1 className="workout-history-page__title">Workout History</h1>
            <div className="workout-history-page__info">
                <div className="workout-history-page__cards">
                    {displayContent}
                </div>
                {/* <Calendar className="react-calendar" /> */}
            </div>
        </div>
    );
};

export default ViewWorkoutsPage;
