import React from "react";
import { useDeleteWorkoutMutation } from "redux/features/api/workoutTrackerApi";

const DeleteWorkoutModal = ({
    setShowDeleteWorkout,
    id,
    setDeletedWorkoutId,
    setIsUpdating,
}) => {
    const [deleteWorkout] = useDeleteWorkoutMutation();

    async function handleDeleteWorkout() {
        setShowDeleteWorkout(prev => !prev);

        setDeletedWorkoutId(id);

        setIsUpdating(true);
        await deleteWorkout(id);
        setIsUpdating(false);
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
