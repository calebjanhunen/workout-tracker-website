import React from "react";
import moment from "moment";

import "./EditWorkoutFormStyles.css";

const EditWorkoutForm = ({ title, date, exercises, id, setShowEditForm }) => {
    const [workoutName, setWorkoutName] = React.useState(title);

    function handleSubmit(e) {
        e.preventDefault();
        setShowEditForm(false);
    }

    function displayWorkoutInfo() {
        return (
            <div className="workout-card__more-info">
                {exercises.map((exercise, index) => (
                    <div key={index} className="exercise">
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <h3
                                className="exercise-name"
                                style={{ marginTop: "10px" }}
                            >
                                {exercise.exerciseName}
                            </h3>
                            <button className="delete-exercise-btn">
                                Delete Exercise
                            </button>
                        </div>
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
                                <button className="delete-set-btn">
                                    Delete Set
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
    console.log(workoutName);
    return (
        <div className="workout-card">
            <form onSubmit={e => handleSubmit(e)}>
                <div className="workout-card__header">
                    <input
                        name="edit-form__workoutName"
                        type="text"
                        defaultValue={title}
                        onChange={e => setWorkoutName(e.target.value)}
                    />
                    <input type="submit" />
                </div>
                <div className="workout-card__time-values">
                    <h2 className="time-values__date">
                        {moment(date).format("MMM DD")}
                    </h2>
                    <h2 className="time-values__workout-length">
                        Workout Length
                    </h2>
                </div>
                <div className="workout-card__workout-info">
                    {displayWorkoutInfo()}
                </div>
            </form>
        </div>
    );
};

export default EditWorkoutForm;
