import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import "./WorkoutHistoryStyles.css";
import { getWorkouts } from "../../actions/workoutActions.js";
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
        <div className="view-workouts-page">
            <h1 style={{ margin: "20px" }}>Workout History</h1>
            <div className="view-workouts-page__info">
                <div className="view-workout-page__cards">
                    {workouts.map((workout, index) => (
                        <div className="workout-cards" key={index}>
                            <WorkoutCard
                                title={workout.name}
                                date={workout.createdAt}
                                exercises={workout.exercises}
                                id={workout._id}
                                setReload={setReload}
                            />
                        </div>
                    ))}
                </div>
                <Calendar className="react-calendar" />
            </div>
        </div>
    );
};

export default ViewWorkoutsPage;
