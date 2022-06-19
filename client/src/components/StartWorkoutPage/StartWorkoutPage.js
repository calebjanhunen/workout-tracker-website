import React from "react";

import "./StartWorkoutPageStyles.css";
import WorkoutForm from "./WorkoutForm/WorkoutForm";

const StartWorkoutPage = () => {
    const [showWorkoutForm, setShowWorkoutForm] = React.useState(false);

    return (
        <div className="start-workout-page">
            {!showWorkoutForm && (
                <button
                    className="start-workout-btn"
                    onClick={() => setShowWorkoutForm(prev => !prev)}
                >
                    Start Empty Workout
                </button>
            )}
            {showWorkoutForm && (
                <WorkoutForm setShowWorkoutForm={setShowWorkoutForm} />
            )}
        </div>
    );
};

export default StartWorkoutPage;
