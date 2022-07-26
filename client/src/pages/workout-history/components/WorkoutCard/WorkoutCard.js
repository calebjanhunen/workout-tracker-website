import React from "react";

import EditWorkoutForm from "./EditWorkoutForm/EditWorkoutForm";
import WorkoutCardInfo from "./WorkoutCardInfo/WorkoutCardInfo";
import { useGetWorkoutsQuery } from "redux/api/workoutTrackerApi";
import "./WorkoutCardInfo/WorkoutCardStyles.css";

const WorkoutCard = ({ workoutInfo }) => {
    const [showEditForm, setShowEditForm] = React.useState(false);
    const [changedWorkoutId, setChangedWorkoutId] = React.useState("");
    const [isUpdating, setIsUpdating] = React.useState(false);
    const { isFetching } = useGetWorkoutsQuery();

    let displayContent;
    if ((isFetching || isUpdating) && changedWorkoutId === workoutInfo._id) {
        displayContent = <div className="workout-card">Loading...</div>;
    } else {
        displayContent = showEditForm ? (
            <EditWorkoutForm
                workoutInfo={workoutInfo}
                setShowEditForm={setShowEditForm}
                setChangedWorkoutId={setChangedWorkoutId}
                setIsUpdating={setIsUpdating}
            />
        ) : (
            <WorkoutCardInfo
                workoutInfo={workoutInfo}
                setShowEditForm={setShowEditForm}
            />
        );
    }

    return <>{displayContent}</>;
};

export default WorkoutCard;
