import React from "react";
import { useSelector } from "react-redux";

import "./StartWorkoutPageStyles.css";
import WorkoutForm from "./WorkoutForm/WorkoutForm";
import LoadingSpinner from "../LoadingSpinner.js";

const StartWorkoutPage = () => {
    const [showWorkoutForm, setShowWorkoutForm] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    let displayContent;
    if (isLoading) {
        displayContent = <p>Loading...</p>;
    } else {
        if (showWorkoutForm) {
            displayContent = (
                <WorkoutForm
                    setShowWorkoutForm={setShowWorkoutForm}
                    setIsSubmitted={setIsSubmitted}
                    setIsLoading={setIsLoading}
                />
            );
        } else {
            displayContent = (
                <div className="start-workout-content">
                    {isSubmitted && (
                        <h1>
                            Workout Submitted, Click the button to start a new
                            workout
                        </h1>
                    )}
                    <button
                        className="start-workout-btn"
                        onClick={() => setShowWorkoutForm(prev => !prev)}
                    >
                        Start Empty Workout
                    </button>
                </div>
            );
        }
    }

    return <div className="start-workout-page">{displayContent}</div>;
};

export default StartWorkoutPage;

/*
{isLoading ? (
                <img
                    className="loading-spinner"
                    src={LoadingSpinner}
                    alt="Loading Spinner"
                />
            ) : showWorkoutForm ? (
                <WorkoutForm
                    setShowWorkoutForm={setShowWorkoutForm}
                    setIsSubmitted={setIsSubmitted}
                />
            ) : (
                <div className="start-workout-content">
                    {isSubmitted && (
                        <h1>
                            Workout Submitted, Click the button to start a new
                            workout
                        </h1>
                    )}
                    <button
                        className="start-workout-btn"
                        onClick={() => setShowWorkoutForm(prev => !prev)}
                    >
                        Start Empty Workout
                    </button>
                </div>
            )}
*/
