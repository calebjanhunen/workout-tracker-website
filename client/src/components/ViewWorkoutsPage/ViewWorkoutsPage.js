import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import "./WorkoutHistoryStyles.css";

import WorkoutCard from "./WorkoutCard/WorkoutCard";
import LoadingSpinner from "../LoadingSpinner";
import { selectAllWorkouts } from "../../redux/features/workouts/workoutSlice";

//TODO: display loading spinner when submiting an edit
const ViewWorkoutsPage = () => {
    const dispatch = useDispatch();
    const workouts = useSelector(selectAllWorkouts);
    const isLoading = useSelector(state => state.loadingReducer);
    const [reload, setReload] = React.useState(false);
    const [changedWorkoutId, setChangedWorkoutId] = React.useState(" ");

    React.useEffect(() => {
        dispatch(getWorkouts());
        console.log(workouts);
    }, [dispatch]);

    const renderedWorkouts = workouts.map((workout, index) =>
        workout._id === changedWorkoutId && isLoading ? (
            <LoadingSpinner loadingSpinnerClass="edit-workout-loading-spinner-container" />
        ) : (
            <WorkoutCard
                key={index}
                title={workout.name}
                date={workout.createdAt}
                exercises={workout.exercises}
                id={workout._id}
                setReload={setReload}
                setChangedWorkoutId={setChangedWorkoutId}
            />
        )
    );

    //TODO: Add calednar functionality
    return (
        <div className="workout-history-page">
            <h1 style={{ margin: "20px" }}>Workout History</h1>
            <div className="workout-history-page__info">
                <div className="workout-history-page__cards">
                    {workouts.length === 0 ? (
                        <LoadingSpinner className="workout-history__loading-spinner-container" />
                    ) : (
                        { renderedWorkouts }
                    )}
                </div>
                <Calendar className="react-calendar" />
            </div>
        </div>
    );
};

export default ViewWorkoutsPage;
