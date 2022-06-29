import React from "react";

let Form = ({ showModal }) => {
    return (
        <form
            className={
                showModal
                    ? "workout-template-form blurred"
                    : "workout-template-form"
            }
        >
            <input name="workoutName" placeholder="Enter Workout Name..." />
            {/* <button onClick={() => navigate("/startWorkout")}>
                    Cancel
                </button> */}
        </form>
    );
};

Form = React.memo(Form);
export default Form;
