import React from "react";
import moment from "moment";
import EditIcon from "../../../../images/edit-btn-icon.png";

import "./WorkoutCardStyles.css";

const WorkoutCardInfo = ({
    workoutInfo,
    setShowEditForm,
    setDeletedWorkoutId,
}) => {
    const [showWorkoutInfo, setShowWorkoutInfo] = React.useState(true);

    function displayWorkoutInfo() {
        return (
            <div className="workout-card__more-info">
                {workoutInfo.exercises.map((exercise, index) => (
                    <div key={index} className="exercise">
                        <h3
                            className="exercise-name"
                            style={{ marginTop: "10px" }}
                        >
                            {exercise.name}
                        </h3>
                        {exercise.sets.map((info, index) => (
                            <div key={index} className="exercise-info">
                                <p
                                    className="exercise-info__set"
                                    style={{ marginRight: "10px" }}
                                >
                                    Set {index + 1}
                                </p>
                                <p
                                    className="exercise-info__weight"
                                    style={{ marginRight: "10px" }}
                                >
                                    {info.weight} lbs
                                </p>
                                <p className="exercise-info__reps">
                                    {info.reps} reps
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div
            onClick={e => {
                if (
                    e.target.parentElement.className !== "delete-btn" &&
                    e.target.parentElement.className !==
                        "delete-workout-confirmation" &&
                    e.target.parentElement.className !== "edit-btn"
                )
                    setShowWorkoutInfo(prev => !prev);
            }}
            className="workout-card"
        >
            <div className="workout-card__header">
                <h1 className="workout-card__title">{workoutInfo.name}</h1>
                <button
                    className="edit-btn"
                    onClick={() => setShowEditForm(prev => !prev)}
                >
                    <img className="edit-icon-img" src={EditIcon} alt="Edit" />
                </button>
            </div>
            <div className="workout-card__time-values">
                <h2 className="time-values__date">
                    {moment(workoutInfo.date).format("MMM DD")}
                </h2>
                <h2 className="time-values__workout-length">Workout Length</h2>
            </div>
            <div className="workout-card__workout-info">
                {showWorkoutInfo ? (
                    displayWorkoutInfo()
                ) : (
                    <h2 className="exercises__num-exercises">
                        {workoutInfo.exercises.length > 1
                            ? `${workoutInfo.exercises.length} Exercises`
                            : `${workoutInfo.exercises.length} Exercise`}
                    </h2>
                )}
            </div>
        </div>
    );
};

export default WorkoutCardInfo;
