import React from "react";
import { useDispatch } from "react-redux";

import { deleteWorkout } from "../../../actions/workoutActions";

const DeleteWorkoutModal = ({ setShowDeleteWorkout, id }) => {
    const dispatch = useDispatch();

    function handleDeleteWorkout() {
        setShowDeleteWorkout(prev => !prev);
        console.log(id);
        dispatch(deleteWorkout(id));
    }

    return (
        <div className="delete-workout-confirmation">
            <p className="delete-workout-text">Are you sure?</p>
            <button
                className="confirm-delete-btn"
                onClick={handleDeleteWorkout}
            >
                Yes
            </button>
            <button
                className="reject-delete-btn"
                onClick={() => setShowDeleteWorkout(prev => !prev)}
            >
                No
            </button>
        </div>
    );
};

export default DeleteWorkoutModal;
