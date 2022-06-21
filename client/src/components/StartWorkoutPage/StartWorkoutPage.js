import React from "react";
import { useSelector } from "react-redux";

import LoadingSpinner from "../../images/Spinner-1s-200px.gif";
import "./StartWorkoutPageStyles.css";
import WorkoutForm from "./WorkoutForm/WorkoutForm";

const StartWorkoutPage = () => {
    const isLoading = useSelector(state => state.loadingReducer);
    const [showWorkoutForm, setShowWorkoutForm] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    return (
        <div className="start-workout-page">
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
        </div>
    );
};

export default StartWorkoutPage;
