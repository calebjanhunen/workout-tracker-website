import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setWorkoutTemplate } from "../../redux/reducer/workoutTemplateSlice";

import "./StartWorkoutPageStyles.css";

const StartWorkoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    // const { data: workoutTemplates } = useGetWorkoutTemplatesQuery();

    let displayContent;
    displayContent = (
        <div className="start-workout-content">
            {isSubmitted && (
                <h1>
                    Workout Submitted, Click the button to start a new workout
                </h1>
            )}
            <div>
                <button
                    className="start-workout-btn"
                    onClick={() => {
                        dispatch(setWorkoutTemplate({}));
                        navigate("/start-workout/create-workout-form");
                    }}
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
