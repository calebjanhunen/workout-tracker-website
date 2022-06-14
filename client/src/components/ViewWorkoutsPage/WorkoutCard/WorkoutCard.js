import React from "react";
import moment from "moment";

import "./WorkoutCardStyles.css";

const WorkoutCard = ({ title, date, exercises }) => {
    const [showWorkoutInfo, setShowWorkoutInfo] = React.useState(false);

    function displayWorkoutInfo() {
        console.log(exercises);
        return (
            <div className="workout-card__more-info">
                {exercises.map((exercise, index) => (
                    <div key={index} className="exercise">
                        <h3
                            className="exercise-name"
                            style={{ marginTop: "10px" }}
                        >
                            {exercise.exerciseName}
                        </h3>
                        {exercise.exerciseInfo.map((info, index) => (
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
            onClick={() => setShowWorkoutInfo(prev => !prev)}
            className="workout-card"
        >
            <h1 className="workout-card__title">{title}</h1>
            <div className="workout-card__time-values">
                <h2 className="time-values__date">
                    {moment(date).format("MMM DD")}
                </h2>
                <h2 className="time-values__workout-length">Workout Length</h2>
            </div>
            <div className="workout-card__workout-info">
                {showWorkoutInfo ? (
                    displayWorkoutInfo()
                ) : (
                    <h2 className="exercises__num-exercises">
                        {exercises.length > 1
                            ? `${exercises.length} Exercises`
                            : `${exercises.length} Exercise`}
                    </h2>
                )}
            </div>
        </div>
    );
};

export default WorkoutCard;
