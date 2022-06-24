import React from "react";
import { useDispatch } from "react-redux";
import { deleteWorkout } from "../../../../redux/features/workouts/workoutActions";

// import { deleteWorkout } from "../../../redux/actions/workoutActions";

const DeleteWorkoutModal = ({
    setShowDeleteWorkout,
    id,
    setDeletedWorkoutId,
}) => {
    const dispatch = useDispatch();
    const [requestStatus, setRequestStatus] = React.useState("idle");

    function handleDeleteWorkout() {
        setShowDeleteWorkout(prev => !prev);
        setDeletedWorkoutId(id);
        try {
            setRequestStatus("pending");
            dispatch(deleteWorkout(id)).unwrap();
        } catch (err) {
            console.error("Failed to delete post: ", err);
        } finally {
            setRequestStatus("idle");
        }
    }
    console.log(requestStatus);
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
