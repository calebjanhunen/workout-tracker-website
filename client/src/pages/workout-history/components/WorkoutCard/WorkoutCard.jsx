import React from "react";

import EditWorkoutForm from "./EditWorkoutDisplay/EditWorkoutDisplay";
import WorkoutCardInfo from "./WorkoutInfoDisplay";

const WorkoutCard = ({ workoutInfo }) => {
    const [showEditForm, setShowEditForm] = React.useState(false);

    const displayContent = showEditForm ? (
        <EditWorkoutForm
            workoutInfo={workoutInfo}
            setShowEditForm={setShowEditForm}
        />
    ) : (
        <WorkoutCardInfo
            workoutInfo={workoutInfo}
            setShowEditForm={setShowEditForm}
        />
    );

    return <>{displayContent}</>;
};

export default WorkoutCard;
