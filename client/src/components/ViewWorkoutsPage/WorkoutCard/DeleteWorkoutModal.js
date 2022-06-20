import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteWorkout } from "../../../redux/actions/workoutActions";

const DeleteWorkoutModal = ({ setShowDeleteWorkout, id }) => {
    const dispatch = useDispatch();
    const workouts = useSelector(state => state.workoutReducer);

    function handleDeleteWorkout() {
        setShowDeleteWorkout(prev => !prev);
        // console.log(workouts.length);
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
