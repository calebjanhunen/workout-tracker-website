import React from "react";
import { useNavigate } from "react-router-dom";

// import { useGetWorkoutTemplatesQuery } from "../../redux/features/api/workoutTemplatesApi";

import "./StartWorkoutPageStyles.css";
import WorkoutForm from "./StartEmptyWorkoutPage/WorkoutForm/WorkoutForm";
import LoadingSpinner from "../LoadingSpinner.js";

const StartWorkoutPage = () => {
    const navigate = useNavigate();
    const [showWorkoutForm, setShowWorkoutForm] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [showTemplates, setShowTemplates] = React.useState(false);
    // const { data: workoutTemplates } = useGetWorkoutTemplatesQuery();

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
                    <div>
                        <button
                            className="start-workout-btn"
                            onClick={() => setShowWorkoutForm(prev => !prev)}
                        >
                            Start Empty Workout
                        </button>
                        <button
                            className="start-workout-btn"
                            onClick={() =>
                                navigate("/start-workout/start-from-template")
                            }
                        >
                            Start From Template
                        </button>
                    </div>
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
